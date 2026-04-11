/**
 * Aufraeum-Skript fuer projektweite Doku-Ordner.
 *
 * Was wird geloescht?
 * - History: alle Dateien, deren Erstellungszeit aelter als X Tage ist.
 * - docs: alle Markdown-Dateien (.md/.mdx), deren Aenderungszeit aelter als Y Tage ist.
 * - Danach werden leere Unterordner entfernt.
 *
 * Aufruf:
 * - npx tsx shared-docs/scripts/cleanup-history-and-docs.ts
 * - npx tsx shared-docs/scripts/cleanup-history-and-docs.ts --dry-run
 */

import fs from 'fs/promises';
import path from 'path';

const HISTORY_MAX_AGE_DAYS = 14;
const DOCS_MAX_AGE_DAYS = 14;

const HISTORY_DIR_NAME = 'History';
const DOCS_DIR_NAME = 'docs';

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
  const cutoff = cutoffTimestamp(HISTORY_MAX_AGE_DAYS);

  for (const filePath of files) {
    result.scannedFiles += 1;

    const stats = await fs.stat(filePath);
    const { timestampMs, usedFallback } = creationTimestampFromStats(stats);

    if (usedFallback) {
      result.usedFallbackCreationTimeCount += 1;
    }

    if (timestampMs <= cutoff) {
      await deleteFileOrLog(filePath, dryRun);
      result.deletedFiles += 1;
      console.log(`[History geloescht] ${path.relative(process.cwd(), filePath)}`);
      continue;
    }

    result.skippedFiles += 1;
  }

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
  console.log(`History-Schwelle: ${HISTORY_MAX_AGE_DAYS} Tage (Erstellungszeit)`);
  console.log(`Docs-Schwelle: ${DOCS_MAX_AGE_DAYS} Tage (Aenderungszeit)`);

  if (await directoryExists(absoluteHistoryDir)) {
    const historyResult = await cleanupHistoryDirectory(absoluteHistoryDir, dryRun);
    printSectionSummary('History', historyResult);
  } else {
    console.log('');
    console.log(`History-Ordner nicht gefunden: ${HISTORY_DIR_NAME}`);
  }

  if (await directoryExists(absoluteDocsDir)) {
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
