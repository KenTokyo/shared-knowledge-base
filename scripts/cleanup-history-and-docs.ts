/**
 * Aufraeum-Skript fuer projektweite Doku-Ordner.
 *
 * Was wird geloescht?
 * - History: Behaelt nur die 7 neuesten Dateien, der Rest wird geloescht.
 * - docs/tasks: alle Dateien in Task-Ordnern, deren Aenderungszeit aelter als 7 Tage ist.
 * - docs: alle Markdown-Dateien (.md/.mdx), deren Aenderungszeit aelter als 30 Tage ist.
 * - Leere Ordner werden automatisch entfernt.
 *
 * Aufruf:
 * - npx tsx shared-docs/scripts/cleanup-history-and-docs.ts
 * - npx tsx shared-docs/scripts/cleanup-history-and-docs.ts --dry-run
 */

import fs from 'fs/promises';
import path from 'path';

const HISTORY_MAX_COUNT = 7;
const TASKS_MAX_AGE_DAYS = 7;
const DOCS_MAX_AGE_DAYS = 30;

const HISTORY_DIR_NAME = 'History';
const DOCS_DIR_NAME = 'docs';
const TASKS_DIR_NAME = 'tasks';

const DAY_IN_MS = 24 * 60 * 60 * 1000;

interface CleanupResult {
  scannedFiles: number;
  deletedFiles: number;
  deletedDirectories: number;
  skippedFiles: number;
  usedFallbackCreationTimeCount: number;
}

function toNumberTimestamp(value: number | bigint): number {
  return typeof value === 'bigint' ? Number(value) : value;
}

function hasDryRunFlag(args: string[]): boolean {
  return args.includes('--dry-run');
}

function toAbsoluteFromProjectRoot(relativeDir: string): string {
  return path.resolve(process.cwd(), relativeDir);
}

function cutoffTimestamp(days: number): number {
  return Date.now() - days * DAY_IN_MS;
}

function isMarkdownFile(filePath: string): boolean {
  const extension = path.extname(filePath).toLowerCase();
  return extension === '.md' || extension === '.mdx';
}

async function directoryExists(absoluteDir: string): Promise<boolean> {
  try {
    const stats = await fs.stat(absoluteDir);
    return stats.isDirectory();
  } catch {
    return false;
  }
}

async function listFilesRecursively(absoluteDir: string): Promise<string[]> {
  const entries = await fs.readdir(absoluteDir, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const absolutePath = path.join(absoluteDir, entry.name);

    if (entry.isSymbolicLink()) {
      continue;
    }

    if (entry.isDirectory()) {
      const nestedFiles = await listFilesRecursively(absolutePath);
      files.push(...nestedFiles);
      continue;
    }

    if (entry.isFile()) {
      files.push(absolutePath);
    }
  }

  return files;
}

function creationTimestampFromStats(stats: Awaited<ReturnType<typeof fs.stat>>): {
  timestampMs: number;
  usedFallback: boolean;
} {
  const birthtimeMs = toNumberTimestamp(stats.birthtimeMs);
  if (Number.isFinite(birthtimeMs) && birthtimeMs > 0) {
    return {
      timestampMs: birthtimeMs,
      usedFallback: false,
    };
  }

  return {
    timestampMs: toNumberTimestamp(stats.ctimeMs),
    usedFallback: true,
  };
}

async function deleteFileOrLog(absoluteFilePath: string, dryRun: boolean): Promise<void> {
  if (dryRun) {
    return;
  }
  await fs.unlink(absoluteFilePath);
}

async function removeEmptyDirectories(
  absoluteRootDir: string,
  dryRun: boolean,
): Promise<number> {
  let removedCount = 0;

  async function walk(absoluteDir: string): Promise<void> {
    const entries = await fs.readdir(absoluteDir, { withFileTypes: true });

    for (const entry of entries) {
      if (!entry.isDirectory() || entry.isSymbolicLink()) {
        continue;
      }
      await walk(path.join(absoluteDir, entry.name));
    }

    if (absoluteDir === absoluteRootDir) {
      return;
    }

    const remainingEntries = await fs.readdir(absoluteDir);
    if (remainingEntries.length === 0) {
      if (!dryRun) {
        await fs.rmdir(absoluteDir);
      }
      removedCount += 1;
      console.log(
        `[Ordner geloescht] ${path.relative(process.cwd(), absoluteDir) || absoluteDir}`,
      );
    }
  }

  await walk(absoluteRootDir);
  return removedCount;
}

async function cleanupHistoryDirectory(
  absoluteHistoryDir: string,
  dryRun: boolean,
): Promise<CleanupResult> {
  const result: CleanupResult = {
    scannedFiles: 0,
    deletedFiles: 0,
    deletedDirectories: 0,
    skippedFiles: 0,
    usedFallbackCreationTimeCount: 0,
  };

  const files = await listFilesRecursively(absoluteHistoryDir);

  // Sort by creation time (newest first)
  const filesWithStats = await Promise.all(
    files.map(async (filePath) => {
      const stats = await fs.stat(filePath);
      const { timestampMs } = creationTimestampFromStats(stats);
      return { path: filePath, timestamp: timestampMs };
    })
  );

  filesWithStats.sort((a, b) => b.timestamp - a.timestamp);

  // Keep the newest N files, delete the rest
  const filesToKeep = filesWithStats.slice(0, HISTORY_MAX_COUNT);
  const filesToDelete = filesWithStats.slice(HISTORY_MAX_COUNT);

  console.log('');
  console.log(`[History] Behalte ${Math.min(filesToKeep.length, HISTORY_MAX_COUNT)} neueste Dateien:`);
  for (const file of filesToKeep) {
    const relativePath = path.relative(process.cwd(), file.path);
    const ageDays = Math.round((Date.now() - file.timestamp) / DAY_IN_MS);
    console.log(`  [Behalten] ${relativePath} (${ageDays} Tage alt)`);
  }

  for (const file of filesToDelete) {
    result.scannedFiles += 1;
    await deleteFileOrLog(file.path, dryRun);
    result.deletedFiles += 1;
    console.log(`[History geloescht] ${path.relative(process.cwd(), file.path)}`);
  }

  // Count kept files as skipped
  result.skippedFiles = filesToKeep.length;

  result.deletedDirectories = await removeEmptyDirectories(absoluteHistoryDir, dryRun);

  return result;
}

async function cleanupDocsDirectory(
  absoluteDocsDir: string,
  dryRun: boolean,
): Promise<CleanupResult> {
  const result: CleanupResult = {
    scannedFiles: 0,
    deletedFiles: 0,
    deletedDirectories: 0,
    skippedFiles: 0,
    usedFallbackCreationTimeCount: 0,
  };

  const files = await listFilesRecursively(absoluteDocsDir);
  const markdownFiles = files.filter(isMarkdownFile);
  const cutoff = cutoffTimestamp(DOCS_MAX_AGE_DAYS);

  for (const filePath of markdownFiles) {
    result.scannedFiles += 1;

    const stats = await fs.stat(filePath);
    const modifiedAtMs = toNumberTimestamp(stats.mtimeMs);

    if (modifiedAtMs <= cutoff) {
      await deleteFileOrLog(filePath, dryRun);
      result.deletedFiles += 1;
      console.log(`[Docs geloescht] ${path.relative(process.cwd(), filePath)}`);
      continue;
    }

    result.skippedFiles += 1;
  }

  result.deletedDirectories = await removeEmptyDirectories(absoluteDocsDir, dryRun);
  return result;
}

async function cleanupTasksDirectory(
  absoluteDocsDir: string,
  dryRun: boolean,
): Promise<CleanupResult> {
  const result: CleanupResult = {
    scannedFiles: 0,
    deletedFiles: 0,
    deletedDirectories: 0,
    skippedFiles: 0,
    usedFallbackCreationTimeCount: 0,
  };

  // Find all tasks directories (docs/*/tasks/*)
  const tasksPattern = path.join(absoluteDocsDir, '**', TASKS_DIR_NAME);
  const allFiles = await listFilesRecursively(absoluteDocsDir);
  
  // Find task directories by looking for directories containing 'tasks' in the path
  const taskDirs = new Set<string>();
  for (const file of allFiles) {
    const relativePath = path.relative(absoluteDocsDir, file);
    const parts = relativePath.split(path.sep);
    const taskIndex = parts.indexOf(TASKS_DIR_NAME);
    if (taskIndex !== -1 && parts.length > taskIndex + 1) {
      // Reconstruct the path up to the task folder
      const taskDirPath = path.join(absoluteDocsDir, ...parts.slice(0, taskIndex + 2));
      taskDirs.add(taskDirPath);
    }
  }

  const cutoff = cutoffTimestamp(TASKS_MAX_AGE_DAYS);

  for (const taskDir of taskDirs) {
    try {
      const stats = await fs.stat(taskDir);
      const modifiedAtMs = toNumberTimestamp(stats.mtimeMs);

      if (modifiedAtMs <= cutoff) {
        // Delete entire task directory
        const filesInDir = await listFilesRecursively(taskDir);
        for (const file of filesInDir) {
          result.scannedFiles += 1;
          await deleteFileOrLog(file, dryRun);
          result.deletedFiles += 1;
        }
        if (!dryRun) {
          await fs.rmdir(taskDir);
        }
        result.deletedDirectories += 1;
        console.log(`[Tasks geloescht] ${path.relative(process.cwd(), taskDir)}`);
      } else {
        // Count files in kept directories
        const filesInDir = await listFilesRecursively(taskDir);
        result.scannedFiles += filesInDir.length;
        result.skippedFiles += filesInDir.length;
      }
    } catch (error) {
      // Directory might not exist anymore, skip
      continue;
    }
  }

  return result;
}

function printSectionSummary(title: string, result: CleanupResult): void {
  console.log('');
  console.log(`=== ${title} ===`);
  console.log(`Gescannte Dateien: ${result.scannedFiles}`);
  console.log(`Geloeschte Dateien: ${result.deletedFiles}`);
  console.log(`Uebersprungene Dateien: ${result.skippedFiles}`);
  console.log(`Geloeschte Ordner: ${result.deletedDirectories}`);

  if (title === 'History') {
    console.log(
      `Fallback auf ctime genutzt: ${result.usedFallbackCreationTimeCount} Datei(en)`,
    );
  }
}

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const dryRun = hasDryRunFlag(args);

  const absoluteHistoryDir = toAbsoluteFromProjectRoot(HISTORY_DIR_NAME);
  const absoluteDocsDir = toAbsoluteFromProjectRoot(DOCS_DIR_NAME);

  console.log(`Projektpfad: ${process.cwd()}`);
  console.log(`Modus: ${dryRun ? 'DRY RUN (nur anzeigen)' : 'LIVE (wirklich loeschen)'}`);
  console.log(`History: Behaelt nur die ${HISTORY_MAX_COUNT} neuesten Dateien`);
  console.log(`Tasks-Schwelle: ${TASKS_MAX_AGE_DAYS} Tage (Aenderungszeit)`);
  console.log(`Docs-Schwelle: ${DOCS_MAX_AGE_DAYS} Tage (Aenderungszeit)`);

  if (await directoryExists(absoluteHistoryDir)) {
    const historyResult = await cleanupHistoryDirectory(absoluteHistoryDir, dryRun);
    printSectionSummary('History', historyResult);
  } else {
    console.log('');
    console.log(`History-Ordner nicht gefunden: ${HISTORY_DIR_NAME}`);
  }

  if (await directoryExists(absoluteDocsDir)) {
    const tasksResult = await cleanupTasksDirectory(absoluteDocsDir, dryRun);
    printSectionSummary('Tasks', tasksResult);

    const docsResult = await cleanupDocsDirectory(absoluteDocsDir, dryRun);
    printSectionSummary('Docs', docsResult);
  } else {
    console.log('');
    console.log(`Docs-Ordner nicht gefunden: ${DOCS_DIR_NAME}`);
  }
}

main().catch((error: unknown) => {
  console.error('');
  console.error('Fehler beim Aufraeumen.');
  console.error(error);
  process.exit(1);
});
