Die File System Access API: vereinfachter Zugriff auf lokale Dateien



Mit der File System Access API können Web-Apps Änderungen direkt in Dateien und Ordnern auf dem Gerät des Nutzers lesen oder speichern.


Pete LePage
Pete LePage
Thomas Steiner
Thomas Steiner

Veröffentlicht: 19. August 2024

Mit der File System Access API können Entwickler leistungsstarke Web-Apps erstellen, die mit Dateien auf dem lokalen Gerät des Nutzers interagieren, z. B. IDEs, Foto- und Video-Editoren sowie Texteditoren. Nachdem ein Nutzer einer Web-App Zugriff gewährt hat, kann er mit dieser API Änderungen direkt in Dateien und Ordnern auf dem Gerät des Nutzers lesen oder speichern. Mit der File System Access API können Sie nicht nur Dateien lesen und schreiben, sondern auch ein Verzeichnis öffnen und dessen Inhalt auflisten.

Hinweis:Die File System Access API unterscheidet sich trotz des ähnlichen Namens von der FileSystem-Schnittstelle, die von der File and Directory Entries API bereitgestellt wird. In dieser API werden die Typen und Vorgänge dokumentiert, die Browsern für Skripts zur Verfügung stehen, wenn eine Hierarchie von Dateien und Verzeichnissen per Drag-and-drop auf eine Seite gezogen oder über Formularelemente oder ähnliche Nutzeraktionen ausgewählt wird. Sie unterscheidet sich auch von der eingestellten Spezifikation File API: Directories and System, die eine API zum Navigieren in Dateisystemhierarchien und eine Möglichkeit definiert, mit der Browser Webanwendungen Sandboxed-Abschnitte des lokalen Dateisystems eines Nutzers zur Verfügung stellen können.
Wenn Sie schon einmal Dateien gelesen und geschrieben haben, wird Ihnen vieles, was ich Ihnen jetzt erzähle, vertraut sein. Ich empfehle dir trotzdem, sie dir durchzulesen, da nicht alle Systeme gleich sind.

Hinweis:Wir haben uns bei der Entwicklung und Implementierung der File System Access API viele Gedanken gemacht, um sicherzustellen, dass Nutzer ihr Dateisystem verwalten können. Weitere Informationen finden Sie im Abschnitt Sicherheit und Berechtigungen.
Die File System Access API wird in den meisten Chromium-Browsern unter Windows, macOS, ChromeOS, Linux und Android unterstützt. Eine wichtige Ausnahme ist Brave, wo die Funktion derzeit nur hinter einem Flag verfügbar ist.

File System Access API verwenden
Um die Leistungsfähigkeit und Nützlichkeit der File System Access API zu demonstrieren, habe ich einen Texteditor in einer einzigen Datei geschrieben. Sie können damit eine Textdatei öffnen, bearbeiten und die Änderungen auf der Festplatte speichern oder eine neue Datei erstellen und die Änderungen auf der Festplatte speichern. Es ist nichts Besonderes, aber es reicht aus, um die Konzepte zu verstehen.

Unterstützte Browser

Browser Support

Chrome: 86. 86
Edge: 86. 86
Firefox: not supported. x
Safari: not supported. x
Source

Funktionserkennung
Wenn Sie herausfinden möchten, ob die File System Access API unterstützt wird, prüfen Sie, ob die gewünschte Auswahlmethode vorhanden ist.


if ('showOpenFilePicker' in self) {
  // The `showOpenFilePicker()` method of the File System Access API is supported.
}
Jetzt ausprobieren
Die File System Access API in Aktion sehen Sie in der Texteditor-Demo.

Datei aus dem lokalen Dateisystem lesen
Im ersten Anwendungsfall soll der Nutzer eine Datei auswählen, die dann geöffnet und von der Festplatte gelesen wird.

Nutzer auffordern, eine zu lesende Datei auszuwählen
Der Einstiegspunkt für die File System Access API ist window.showOpenFilePicker(). Wenn diese Funktion aufgerufen wird, wird ein Dialogfeld zur Dateiauswahl angezeigt, in dem der Nutzer aufgefordert wird, eine Datei auszuwählen. Nachdem der Nutzer eine Datei ausgewählt hat, gibt die API ein Array von Dateihandles zurück. Mit dem optionalen Parameter options können Sie das Verhalten der Dateiauswahl beeinflussen, z. B. indem Sie dem Nutzer erlauben, mehrere Dateien, Verzeichnisse oder verschiedene Dateitypen auszuwählen. Ohne angegebene Optionen kann der Nutzer mit der Dateiauswahl eine einzelne Datei auswählen. Das ist ideal für einen Texteditor.

Wie bei vielen anderen leistungsstarken APIs muss der Aufruf von showOpenFilePicker() in einem sicheren Kontext erfolgen und durch eine Nutzergeste ausgelöst werden.


let fileHandle;
butOpenFile.addEventListener('click', async () => {
  // Destructure the one-element array.
  [fileHandle] = await window.showOpenFilePicker();
  // Do something with the file handle.
});
Sobald der Nutzer eine Datei ausgewählt hat, gibt showOpenFilePicker() ein Array von Handles zurück, in diesem Fall ein Array mit einem Element mit einem FileSystemFileHandle, das die Eigenschaften und Methoden enthält, die für die Interaktion mit der Datei erforderlich sind.

Es ist hilfreich, einen Verweis auf das Dateihandle zu behalten, damit es später verwendet werden kann. Sie ist erforderlich, um Änderungen an der Datei zu speichern oder andere Dateivorgänge auszuführen.

Datei aus dem Dateisystem lesen
Nachdem Sie ein Handle für eine Datei haben, können Sie die Eigenschaften der Datei abrufen oder auf die Datei selbst zugreifen. Ich lese jetzt erst mal den Inhalt. Beim Aufrufen von handle.getFile() wird ein File-Objekt zurückgegeben, das einen Blob enthält. Rufen Sie zum Abrufen der Daten aus dem Blob eine der Methoden auf (slice(), stream(), text() oder arrayBuffer()).


const file = await fileHandle.getFile();
const contents = await file.text();
Hinweis:In den meisten Anwendungsfällen können Sie Dateien mit den Methoden stream(), text() oder arrayBuffer() in sequenzieller Reihenfolge lesen. Wenn Sie direkten Zugriff auf den Inhalt einer Datei benötigen, verwenden Sie die Methode slice().
Das von FileSystemFileHandle.getFile() zurückgegebene File-Objekt ist nur lesbar, solange sich die zugrunde liegende Datei auf der Festplatte nicht geändert hat. Wenn die Datei auf der Festplatte geändert wird, wird das File-Objekt unlesbar. Sie müssen getFile() noch einmal aufrufen, um ein neues File-Objekt zu erhalten, mit dem Sie die geänderten Daten lesen können.

Zusammenfassung
Wenn Nutzer auf die Schaltfläche Öffnen klicken, wird im Browser eine Dateiauswahl angezeigt. Nachdem der Nutzer eine Datei ausgewählt hat, liest die App den Inhalt und fügt ihn in ein <textarea> ein.


let fileHandle;
butOpenFile.addEventListener('click', async () => {
  [fileHandle] = await window.showOpenFilePicker();
  const file = await fileHandle.getFile();
  const contents = await file.text();
  textArea.value = contents;
});
Datei in das lokale Dateisystem schreiben
Im Texteditor gibt es zwei Möglichkeiten, eine Datei zu speichern: Speichern und Speichern unter. Mit Speichern werden die Änderungen mit dem zuvor abgerufenen Dateihandle in die Originaldatei zurückgeschrieben. Mit Speichern unter wird jedoch eine neue Datei erstellt, für die ein neuer Dateihandle erforderlich ist.

Neue Datei erstellen
Rufen Sie showSaveFilePicker() auf, um eine Datei zu speichern. Dadurch wird die Dateiauswahl im Speichermodus angezeigt, sodass der Nutzer eine neue Datei auswählen kann, die er zum Speichern verwenden möchte. Für den Texteditor wollte ich auch, dass automatisch eine .txt-Erweiterung hinzugefügt wird. Deshalb habe ich einige zusätzliche Parameter angegeben.


async function getNewFileHandle() {
  const options = {
    types: [
      {
        description: 'Text Files',
        accept: {
          'text/plain': ['.txt'],
        },
      },
    ],
  };
  const handle = await window.showSaveFilePicker(options);
  return handle;
}
Wichtiger Hinweis:Manchmal dauert es einige Zeit, bis die zu speichernden Daten verarbeitet werden, nachdem der Nutzer in Ihrer App auf die Schaltfläche Speichern geklickt hat. Ein häufiger Fehler ist, diese Verarbeitung vor dem Ausführen des showSaveFilePicker()-Codes durchzuführen, was zu einem SecurityError Failed to execute 'showSaveFilePicker' on 'Window': Must be handling a user gesture to show a file picker. führt. Rufen Sie stattdessen zuerst das Dateihandle ab und beginnen Sie erst danach mit der Verarbeitung der Daten.
Änderungen auf der Festplatte speichern
Den gesamten Code zum Speichern von Änderungen an einer Datei finden Sie in meiner Texteditor-Demo auf GitHub. Die wichtigsten Dateisysteminteraktionen befinden sich in fs-helpers.js. Im einfachsten Fall sieht der Prozess so aus: Ich gehe jeden Schritt durch und erkläre ihn.


// fileHandle is an instance of FileSystemFileHandle..
async function writeFile(fileHandle, contents) {
  // Create a FileSystemWritableFileStream to write to.
  const writable = await fileHandle.createWritable();
  // Write the contents of the file to the stream.
  await writable.write(contents);
  // Close the file and write the contents to disk.
  await writable.close();
}
Zum Schreiben von Daten auf die Festplatte wird ein FileSystemWritableFileStream-Objekt verwendet, eine Unterklasse von WritableStream. Erstellen Sie den Stream, indem Sie createWritable() für das Dateihandle-Objekt aufrufen. Wenn createWritable() aufgerufen wird, prüft der Browser zuerst, ob der Nutzer die Schreibberechtigung für die Datei erteilt hat. Wenn die Schreibberechtigung nicht erteilt wurde, fordert der Browser den Nutzer auf, die Berechtigung zu erteilen. Wenn die Berechtigung nicht erteilt wird, löst createWritable() eine DOMException aus und die App kann nicht in die Datei schreiben. Im Texteditor werden die DOMException-Objekte in der Methode saveFile() verarbeitet.

Die Methode write() verwendet einen String, der für einen Texteditor erforderlich ist. Sie kann aber auch eine BufferSource oder einen Blob entgegennehmen. Sie können beispielsweise einen Stream direkt an das Tool weiterleiten:


async function writeURLToFile(fileHandle, url) {
  // Create a FileSystemWritableFileStream to write to.
  const writable = await fileHandle.createWritable();
  // Make an HTTP request for the contents.
  const response = await fetch(url);
  // Stream the response into the file.
  await response.body.pipeTo(writable);
  // pipeTo() closes the destination pipe by default, no need to close it.
}
Sie können auch seek() oder truncate() im Stream verwenden, um die Datei an einer bestimmten Position zu aktualisieren oder die Größe der Datei zu ändern.

Achtung:Änderungen werden erst auf die Festplatte geschrieben, wenn der Stream geschlossen wird, entweder durch Aufrufen von close() oder wenn der Stream automatisch durch die Pipe geschlossen wird.
Vorgeschlagenen Dateinamen und Startverzeichnis angeben
In vielen Fällen soll Ihre App einen Standarddateinamen oder ‑speicherort vorschlagen. Ein Texteditor könnte beispielsweise den Standarddateinamen Untitled Text.txt anstelle von Untitled vorschlagen. Dazu übergeben Sie ein suggestedName-Attribut als Teil der showSaveFilePicker-Optionen.


const fileHandle = await self.showSaveFilePicker({
  suggestedName: 'Untitled Text.txt',
  types: [{
    description: 'Text documents',
    accept: {
      'text/plain': ['.txt'],
    },
  }],
});
Dasselbe gilt für das Standard-Startverzeichnis. Wenn Sie einen Texteditor entwickeln, möchten Sie vielleicht, dass der Dialog zum Speichern oder Öffnen von Dateien im Standardordner documents gestartet wird. Bei einem Bildeditor soll er vielleicht im Standardordner pictures gestartet werden. Sie können ein Standard-Startverzeichnis vorschlagen, indem Sie eine startIn-Eigenschaft an die Methoden showSaveFilePicker, showDirectoryPicker() oder showOpenFilePicker übergeben.


const fileHandle = await self.showOpenFilePicker({
  startIn: 'pictures'
});
Die Liste der bekannten Systemverzeichnisse lautet:

desktop: Das Desktopverzeichnis des Nutzers, sofern vorhanden.
documents: Verzeichnis, in dem vom Nutzer erstellte Dokumente normalerweise gespeichert werden.
downloads: Verzeichnis, in dem heruntergeladene Dateien normalerweise gespeichert werden.
music: Verzeichnis, in dem Audiodateien normalerweise gespeichert werden.
pictures: Verzeichnis, in dem Fotos und andere Standbilder normalerweise gespeichert werden.
videos: Verzeichnis, in dem Videos oder Filme normalerweise gespeichert werden.
Abgesehen von bekannten Systemverzeichnissen können Sie auch ein vorhandenes Datei- oder Verzeichnishandle als Wert für startIn übergeben. Das Dialogfeld würde dann im selben Verzeichnis geöffnet.


// Assume `directoryHandle` is a handle to a previously opened directory.
const fileHandle = await self.showOpenFilePicker({
  startIn: directoryHandle
});
Zweck verschiedener Dateiauswahlen angeben
Manchmal haben Anwendungen unterschiedliche Auswahlmöglichkeiten für unterschiedliche Zwecke. In einem Rich-Text-Editor kann der Nutzer beispielsweise Textdateien öffnen, aber auch Bilder importieren. Standardmäßig wurde jede Dateiauswahl am zuletzt gespeicherten Speicherort geöffnet. Sie können das Problem umgehen, indem Sie id-Werte für jede Art von Auswahl speichern. Wenn ein id angegeben ist, merkt sich die Dateiauswahl ein separates zuletzt verwendetes Verzeichnis für dieses id.


const fileHandle1 = await self.showSaveFilePicker({
  id: 'openText',
});

const fileHandle2 = await self.showSaveFilePicker({
  id: 'importImage',
});
Dateihandles oder Verzeichnishandles in IndexedDB speichern
Dateihandles und Verzeichnishandles sind serialisierbar. Das bedeutet, dass Sie ein Datei- oder Verzeichnishandle in IndexedDB speichern oder postMessage() aufrufen können, um sie zwischen demselben Ursprung der obersten Ebene zu senden.

Wenn Sie Datei- oder Verzeichnishandles in IndexedDB speichern, können Sie den Status speichern oder sich merken, an welchen Dateien oder Verzeichnissen ein Nutzer gearbeitet hat. So kann eine Liste der zuletzt geöffneten oder bearbeiteten Dateien geführt werden, die letzte Datei beim Öffnen der App wieder geöffnet werden, das vorherige Arbeitsverzeichnis wiederhergestellt werden usw. Im Texteditor speichere ich eine Liste der fünf zuletzt geöffneten Dateien des Nutzers, damit er wieder auf diese Dateien zugreifen kann.

Das folgende Codebeispiel zeigt, wie ein Dateihandle und ein Verzeichnishandle gespeichert und abgerufen werden. Hier kannst du dir ein Beispiel ansehen. (Aus Gründen der Übersichtlichkeit verwende ich die idb-keyval-Bibliothek.)


import { get, set } from 'https://unpkg.com/idb-keyval@5.0.2/dist/esm/index.js';

const pre1 = document.querySelector('pre.file');
const pre2 = document.querySelector('pre.directory');
const button1 = document.querySelector('button.file');
const button2 = document.querySelector('button.directory');

// File handle
button1.addEventListener('click', async () => {
  try {
    const fileHandleOrUndefined = await get('file');
    if (fileHandleOrUndefined) {
      pre1.textContent = `Retrieved file handle "${fileHandleOrUndefined.name}" from IndexedDB.`;
      return;
    }
    const [fileHandle] = await window.showOpenFilePicker();
    await set('file', fileHandle);
    pre1.textContent = `Stored file handle for "${fileHandle.name}" in IndexedDB.`;
  } catch (error) {
    alert(error.name, error.message);
  }
});

// Directory handle
button2.addEventListener('click', async () => {
  try {
    const directoryHandleOrUndefined = await get('directory');
    if (directoryHandleOrUndefined) {
      pre2.textContent = `Retrieved directroy handle "${directoryHandleOrUndefined.name}" from IndexedDB.`;
      return;
    }
    const directoryHandle = await window.showDirectoryPicker();
    await set('directory', directoryHandle);
    pre2.textContent = `Stored directory handle for "${directoryHandle.name}" in IndexedDB.`;
  } catch (error) {
    alert(error.name, error.message);
  }
});
Gespeicherte Datei- oder Verzeichnishandles und Berechtigungen
Da Berechtigungen nicht immer zwischen Sitzungen beibehalten werden, sollten Sie mit queryPermission() prüfen, ob der Nutzer die Berechtigung für die Datei oder das Verzeichnis erteilt hat. Falls nicht, rufen Sie requestPermission() an, um sie (noch einmal) anzufordern. Das funktioniert bei Datei- und Verzeichnishandles gleich. Sie müssen fileOrDirectoryHandle.requestPermission(descriptor) oder fileOrDirectoryHandle.queryPermission(descriptor) ausführen.

Im Texteditor habe ich eine verifyPermission()-Methode erstellt, die prüft, ob der Nutzer die Berechtigung bereits erteilt hat, und die Anfrage bei Bedarf stellt.


async function verifyPermission(fileHandle, readWrite) {
  const options = {};
  if (readWrite) {
    options.mode = 'readwrite';
  }
  // Check if permission was already granted. If so, return true.
  if ((await fileHandle.queryPermission(options)) === 'granted') {
    return true;
  }
  // Request permission. If the user grants permission, return true.
  if ((await fileHandle.requestPermission(options)) === 'granted') {
    return true;
  }
  // The user didn't grant permission, so return false.
  return false;
}
Indem ich mit der Leseanfrage die Schreibberechtigung angefordert habe, habe ich die Anzahl der Berechtigungsaufforderungen reduziert. Der Nutzer sieht eine Aufforderung beim Öffnen der Datei und erteilt die Berechtigung, die Datei sowohl zu lesen als auch zu schreiben.

Verzeichnis öffnen und Inhalt auflisten
Rufen Sie showDirectoryPicker() auf, um alle Dateien in einem Verzeichnis aufzulisten. Der Nutzer wählt in einer Auswahl ein Verzeichnis aus. Daraufhin wird ein FileSystemDirectoryHandle zurückgegeben, mit dem Sie die Dateien des Verzeichnisses auflisten und darauf zugreifen können. Standardmäßig haben Sie Lesezugriff auf die Dateien im Verzeichnis. Wenn Sie Schreibzugriff benötigen, können Sie { mode: 'readwrite' } an die Methode übergeben.


butDir.addEventListener('click', async () => {
  const dirHandle = await window.showDirectoryPicker();
  for await (const entry of dirHandle.values()) {
    console.log(entry.kind, entry.name);
  }
});
Wenn Sie zusätzlich mit getFile() auf jede Datei zugreifen müssen, um beispielsweise die einzelnen Dateigrößen abzurufen, verwenden Sie nicht await für jedes Ergebnis nacheinander, sondern verarbeiten Sie alle Dateien parallel, z. B. mit Promise.all().


butDir.addEventListener('click', async () => {
  const dirHandle = await window.showDirectoryPicker();
  const promises = [];
  for await (const entry of dirHandle.values()) {
    if (entry.kind !== 'file') {
      continue;
    }
    promises.push(entry.getFile().then((file) => `${file.name} (${file.size})`));
  }
  console.log(await Promise.all(promises));
});
Dateien und Ordner in einem Verzeichnis erstellen oder darauf zugreifen
In einem Verzeichnis können Sie mit der Methode getFileHandle() bzw. getDirectoryHandle() Dateien und Ordner erstellen oder darauf zugreifen. Wenn Sie ein optionales options-Objekt mit dem Schlüssel create und dem booleschen Wert true oder false übergeben, können Sie festlegen, ob eine neue Datei oder ein neuer Ordner erstellt werden soll, wenn er nicht vorhanden ist.


// In an existing directory, create a new directory named "My Documents".
const newDirectoryHandle = await existingDirectoryHandle.getDirectoryHandle('My Documents', {
  create: true,
});
// In this new directory, create a file named "My Notes.txt".
const newFileHandle = await newDirectoryHandle.getFileHandle('My Notes.txt', { create: true });
Pfad eines Elements in einem Verzeichnis auflösen
Wenn Sie mit Dateien oder Ordnern in einem Verzeichnis arbeiten, kann es hilfreich sein, den Pfad des betreffenden Elements aufzulösen. Dazu können Sie die Methode resolve() verwenden. Zum Auflösen kann das Element ein direktes oder indirektes untergeordnetes Element des Verzeichnisses sein.


// Resolve the path of the previously created file called "My Notes.txt".
const path = await newDirectoryHandle.resolve(newFileHandle);
// `path` is now ["My Documents", "My Notes.txt"]
Dateien und Ordner in einem Verzeichnis löschen
Wenn Sie Zugriff auf ein Verzeichnis haben, können Sie die darin enthaltenen Dateien und Ordner mit der Methode removeEntry() löschen. Bei Ordnern kann das Löschen optional rekursiv erfolgen und alle Unterordner und die darin enthaltenen Dateien umfassen.


// Delete a file.
await directoryHandle.removeEntry('Abandoned Projects.txt');
// Recursively delete a folder.
await directoryHandle.removeEntry('Old Stuff', { recursive: true });
Dateien oder Ordner direkt löschen
Wenn Sie Zugriff auf ein Datei- oder Verzeichnishandle haben, rufen Sie remove() für ein FileSystemFileHandle oder FileSystemDirectoryHandle auf, um es zu entfernen.


// Delete a file.
await fileHandle.remove();
// Delete a directory.
await directoryHandle.remove();
Dateien und Ordner umbenennen und verschieben
Dateien und Ordner können umbenannt oder an einen neuen Speicherort verschoben werden, indem Sie move() in der FileSystemHandle-Schnittstelle aufrufen. FileSystemHandle hat die untergeordneten Schnittstellen FileSystemFileHandle und FileSystemDirectoryHandle. Die Methode move() hat einen oder zwei Parameter. Der erste kann entweder ein String mit dem neuen Namen oder ein FileSystemDirectoryHandle zum Zielordner sein. Im letzteren Fall ist der optionale zweite Parameter ein String mit dem neuen Namen, sodass das Verschieben und Umbenennen in einem Schritt erfolgen kann.


// Rename the file.
await file.move('new_name');
// Move the file to a new directory.
await file.move(directory);
// Move the file to a new directory and rename it.
await file.move(directory, 'newer_name');
Hinweis:Die FileSystemHandle.move()-Methode wurde für Dateien im privaten Dateisystem des Ursprungs (Origin Private File System, OPFS) ausgeliefert, ist für Dateien, wenn sich Quelle oder Ziel außerhalb des OPFS befinden, hinter einem Flag und wird noch nicht für Verzeichnisse unterstützt.
Drag-and-drop-Integration
Die HTML-Drag-and-drop-Schnittstellen ermöglichen es Webanwendungen, per Drag-and-drop auf eine Webseite gezogene Dateien zu akzeptieren. Beim Drag-and-drop werden gezogene Datei- und Verzeichniselemente jeweils mit Dateieinträgen und Verzeichniseinträgen verknüpft. Die Methode DataTransferItem.getAsFileSystemHandle() gibt ein Promise mit einem FileSystemFileHandle-Objekt zurück, wenn das gezogene Element eine Datei ist, und ein Promise mit einem FileSystemDirectoryHandle-Objekt, wenn das gezogene Element ein Verzeichnis ist. Das folgende Beispiel zeigt, wie das in der Praxis aussieht. Die Drag-and-drop-Oberfläche verwendet DataTransferItem.kind als "file" für Dateien und Verzeichnisse, während FileSystemHandle.kind der File System Access API "file" für Dateien und "directory" für Verzeichnisse verwendet.


elem.addEventListener('dragover', (e) => {
  // Prevent navigation.
  e.preventDefault();
});

elem.addEventListener('drop', async (e) => {
  e.preventDefault();

  const fileHandlesPromises = [...e.dataTransfer.items]
    .filter((item) => item.kind === 'file')
    .map((item) => item.getAsFileSystemHandle());

  for await (const handle of fileHandlesPromises) {
    if (handle.kind === 'directory') {
      console.log(`Directory: ${handle.name}`);
    } else {
      console.log(`File: ${handle.name}`);
    }
  }
});
Auf das ursprungsbezogene private Dateisystem zugreifen
Das private Dateisystem des Ursprungs ist ein Speicherendpunkt, der, wie der Name schon sagt, nur für den Ursprung der Seite zugänglich ist. Browser implementieren dies in der Regel, indem sie den Inhalt dieses ursprungsbezogenen privaten Dateisystems irgendwo auf der Festplatte speichern. Es ist jedoch nicht vorgesehen, dass der Inhalt für Nutzer zugänglich ist. Ebenso gibt es keine Erwartung, dass Dateien oder Verzeichnisse mit Namen, die mit den Namen von untergeordneten Elementen des privaten Dateisystems des Ursprungs übereinstimmen, vorhanden sind. Obwohl der Browser möglicherweise den Eindruck erweckt, dass es Dateien gibt, speichert er diese „Dateien“ intern in einer Datenbank oder einer anderen Datenstruktur, da es sich um ein ursprungsbezogenes privates Dateisystem handelt. Wenn Sie diese API verwenden, sollten Sie nicht davon ausgehen, dass die erstellten Dateien eins zu eins auf der Festplatte zu finden sind. Sie können wie gewohnt im privaten Dateisystem des Ursprungs arbeiten, sobald Sie Zugriff auf das Root-FileSystemDirectoryHandle haben.


const root = await navigator.storage.getDirectory();
// Create a new file handle.
const fileHandle = await root.getFileHandle('Untitled.txt', { create: true });
// Create a new directory handle.
const dirHandle = await root.getDirectoryHandle('New Folder', { create: true });
// Recursively remove a directory.
await root.removeEntry('Old Stuff', { recursive: true });

Browser Support

Chrome: 86. 86
Edge: 86. 86
Firefox: 111. 111
Safari: 15.2. 15.2
Source

Auf leistungsoptimierte Dateien aus dem privaten Dateisystem des Ursprungs zugreifen
Das private Dateisystem des Ursprungs bietet optionalen Zugriff auf eine spezielle Art von Datei, die in hohem Maße auf Leistung optimiert ist, z. B. durch In-Place- und exklusiven Schreibzugriff auf den Inhalt einer Datei. In Chromium 102 und höher gibt es eine zusätzliche Methode für das ursprungsbezogene private Dateisystem, um den Dateizugriff zu vereinfachen: createSyncAccessHandle() (für synchrone Lese- und Schreibvorgänge). Sie ist unter FileSystemFileHandle verfügbar, aber ausschließlich in Web Workers.


// (Read and write operations are synchronous,
// but obtaining the handle is asynchronous.)
// Synchronous access exclusively in Worker contexts.
const accessHandle = await fileHandle.createSyncAccessHandle();
const writtenBytes = accessHandle.write(buffer);
const readBytes = accessHandle.read(buffer, { at: 1 });
Hinweis:Nutzer, die sich für die createAccessHandle()-Methode interessieren (d. h. die asynchrone Variante, die im Hauptthread und in Webworkern verfügbar ist), sollten crbug.com/1323922 im Blick behalten.
Polyfilling
Es ist nicht möglich, die File System Access API-Methoden vollständig zu polyfillen.

Die Methode showOpenFilePicker() kann mit einem <input type="file">-Element angenähert werden.
Die Methode showSaveFilePicker() kann mit einem <a download="file_name">-Element simuliert werden. Dadurch wird jedoch ein programmatischer Download ausgelöst und vorhandene Dateien können nicht überschrieben werden.
Die Methode showDirectoryPicker() kann mit dem nicht standardmäßigen Element <input type="file" webkitdirectory> etwas emuliert werden.
Wir haben eine Bibliothek namens browser-fs-access entwickelt, die nach Möglichkeit die File System Access API verwendet und in allen anderen Fällen auf diese nächstbesten Optionen zurückgreift.

Sicherheit und Berechtigungen
Das Chrome-Team hat die File System Access API unter Berücksichtigung der in Controlling Access to Powerful Web Platform Features definierten Grundprinzipien entwickelt und implementiert, darunter Nutzerkontrolle und Transparenz sowie Nutzerfreundlichkeit.

Datei öffnen oder neue Datei speichern
Dateiauswahl zum Öffnen einer Datei zum Lesen
Eine Dateiauswahl, mit der eine vorhandene Datei zum Lesen geöffnet wird.
Beim Öffnen einer Datei erteilt der Nutzer die Berechtigung, eine Datei oder ein Verzeichnis über die Dateiauswahl zu lesen. Die Dateiauswahl kann nur über eine Nutzeraktion angezeigt werden, wenn sie aus einem sicheren Kontext bereitgestellt wird. Wenn Nutzer ihre Meinung ändern, können sie die Auswahl in der Dateiauswahl aufheben. Die Website erhält dann keinen Zugriff auf die Datei. Das Verhalten ist dasselbe wie beim <input type="file">-Element.

Dateiauswahl zum Speichern einer Datei auf der Festplatte.
Eine Dateiauswahl, mit der eine Datei auf der Festplatte gespeichert wird.
Wenn eine Web-App eine neue Datei speichern möchte, zeigt der Browser ebenfalls die Dateiauswahl zum Speichern an, sodass der Nutzer den Namen und den Speicherort der neuen Datei angeben kann. Da sie eine neue Datei auf dem Gerät speichern (und nicht eine vorhandene Datei überschreiben), gewährt die Dateiauswahl der App die Berechtigung, in die Datei zu schreiben.

Eingeschränkte Ordner
Zum Schutz von Nutzern und ihren Daten kann der Browser die Möglichkeit des Nutzers einschränken, in bestimmten Ordnern zu speichern, z. B. in wichtigen Betriebssystemordnern wie Windows oder den macOS-Bibliotheksordnern. In diesem Fall wird im Browser eine Aufforderung angezeigt, in der der Nutzer aufgefordert wird, einen anderen Ordner auszuwählen.

Vorhandene Datei oder vorhandenes Verzeichnis ändern
Eine Web-App kann eine Datei auf der Festplatte nur ändern, wenn sie die ausdrückliche Erlaubnis des Nutzers hat.

Berechtigungsaufforderung
Wenn eine Person Änderungen an einer Datei speichern möchte, für die sie zuvor Lesezugriff gewährt hat, wird im Browser eine Berechtigungsaufforderung angezeigt, in der die Berechtigung für die Website angefordert wird, Änderungen auf die Festplatte zu schreiben. Die Berechtigungsanfrage kann nur durch eine Nutzeraktion ausgelöst werden, z. B. durch Klicken auf eine Schaltfläche „Speichern“.

Berechtigungsaufforderung vor dem Speichern einer Datei
Aufforderung, die Nutzern angezeigt wird, bevor dem Browser die Schreibberechtigung für eine vorhandene Datei erteilt wird.
Alternativ kann eine Web-App, die mehrere Dateien bearbeitet, z. B. eine IDE, auch beim Öffnen um die Berechtigung zum Speichern von Änderungen bitten.

Wenn der Nutzer „Abbrechen“ auswählt und keinen Schreibzugriff gewährt, kann die Web-App keine Änderungen an der lokalen Datei speichern. Es sollte eine alternative Methode für den Nutzer geben, seine Daten zu speichern, z. B. durch die Möglichkeit, die Datei herunterzuladen oder Daten in der Cloud zu speichern.

Transparenz
Omnibox-Symbol
Symbol in der Adressleiste, das angibt, dass der Nutzer der Website die Berechtigung zum Speichern in einer lokalen Datei erteilt hat.
Wenn ein Nutzer einer Web-App die Berechtigung zum Speichern einer lokalen Datei erteilt hat, wird im Browser ein Symbol in der Adressleiste angezeigt. Wenn Sie auf das Symbol klicken, wird ein Pop-over mit der Liste der Dateien geöffnet, auf die der Nutzer Zugriff gewährt hat. Der Nutzer kann diesen Zugriff jederzeit widerrufen.

Beibehalten von Berechtigungen
Die Web-App kann weiterhin Änderungen an der Datei speichern, ohne dass Sie dazu aufgefordert werden, bis alle Tabs für ihren Ursprung geschlossen werden. Sobald ein Tab geschlossen wird, verliert die Website den gesamten Zugriff. Wenn der Nutzer die Web-App das nächste Mal verwendet, wird er noch einmal um Zugriff auf die Dateien gebeten.

Feedback
Wir möchten mehr über Ihre Erfahrungen mit der File System Access API erfahren.

Informationen zum API-Design
Funktioniert etwas an der API nicht wie erwartet? Oder fehlen Methoden oder Eigenschaften, die Sie für die Umsetzung Ihrer Idee benötigen? Haben Sie Fragen oder Anmerkungen zum Sicherheitsmodell?

Reichen Sie ein Spezifikationsproblem im WICG File System Access GitHub-Repository ein oder fügen Sie Ihre Gedanken zu einem bestehenden Problem hinzu.
Probleme bei der Implementierung?
Haben Sie einen Fehler in der Chrome-Implementierung gefunden? Oder weicht die Implementierung von der Spezifikation ab?

Melden Sie einen Fehler unter https://new.crbug.com. Geben Sie so viele Details wie möglich an, fügen Sie eine Anleitung zur Reproduktion hinzu und legen Sie Components auf Blink>Storage>FileSystem fest.
Planen Sie, die API zu verwenden?
Planen Sie, die File System Access API auf Ihrer Website zu verwenden? Ihre öffentliche Unterstützung hilft uns, Funktionen zu priorisieren, und zeigt anderen Browseranbietern, wie wichtig es ist, sie zu unterstützen.

Teilen Sie im WICG-Discourse-Thread mit, wie Sie die API verwenden möchten.
Senden Sie einen Tweet an @ChromiumDev mit dem Hashtag #FileSystemAccess und teilen Sie uns mit, wo und wie Sie die Funktion verwenden.
Nützliche Links
Öffentliche Erklärung
Spezifikation für den Dateisystemzugriff und Dateispezifikation
Tracking-Fehler
ChromeStatus.com-Eintrag
TypeScript-Definitionen
File System Access API – Chromium-Sicherheitsmodell
Blink-Komponente: Blink>Storage>FileSystem
Danksagungen
Die Spezifikation der File System Access API wurde von Marijn Kruisselbrink geschrieben.