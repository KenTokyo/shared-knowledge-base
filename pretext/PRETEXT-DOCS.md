https://www.npmjs.com/package/@chenglou/pretext

@chenglou/pretext
TypeScript icon, indicating that this package has built-in type declarations
0.0.4 • Public • Published a day ago
Pretext
Pure JavaScript/TypeScript library for multiline text measurement & layout. Fast, accurate & supports all the languages you didn't even know about. Allows rendering to DOM, Canvas, SVG and soon, server-side.

Pretext side-steps the need for DOM measurements (e.g. getBoundingClientRect, offsetHeight), which trigger layout reflow, one of the most expensive operations in the browser. It implements its own text measurement logic, using the browsers' own font engine as ground truth (very AI-friendly iteration method).

Installation
npm install @chenglou/pretext
Demos
Clone the repo, run bun install, then bun start, and open the /demos in your browser (no trailing slash. Bun devserver bugs on those) Alternatively, see them live at chenglou.me/pretext. Some more at somnai-dreams.github.io/pretext-demos

API
Pretext serves 2 use cases:

1. Measure a paragraph's height without ever touching DOM
import { prepare, layout } from '@chenglou/pretext'

const prepared = prepare('AGI 春天到了. بدأت الرحلة 🚀‎', '16px Inter')
const { height, lineCount } = layout(prepared, textWidth, 20) // pure arithmetics. No DOM layout & reflow!
prepare() does the one-time work: normalize whitespace, segment the text, apply glue rules, measure the segments with canvas, and return an opaque handle. layout() is the cheap hot path after that: pure arithmetic over cached widths. Do not rerun prepare() for the same text and configs; that'd defeat its precomputation. For example, on resize, only rerun layout().

If you want textarea-like text where ordinary spaces, \t tabs, and \n hard breaks stay visible, pass { whiteSpace: 'pre-wrap' } to prepare():

const prepared = prepare(textareaValue, '16px Inter', { whiteSpace: 'pre-wrap' })
const { height } = layout(prepared, textareaWidth, 20)
On the current checked-in benchmark snapshot:

prepare() is about 19ms for the shared 500-text batch
layout() is about 0.09ms for that same batch
We support all the languages you can imagine, including emojis and mixed-bidi, and caters to specific browser quirks

The returned height is the crucial last piece for unlocking web UI's:

proper virtualization/occlusion without guesstimates & caching
fancy userland layouts: masonry, JS-driven flexbox-like implementations, nudging a few layout values without CSS hacks (imagine that), etc.
development time verification (especially now with AI) that labels on e.g. buttons don't overflow to the next line, browser-free
prevent layout shift when new text loads and you wanna re-anchor the scroll position
2. Lay out the paragraph lines manually yourself
Switch out prepare with prepareWithSegments, then:

layoutWithLines() gives you all the lines at a fixed width:
import { prepareWithSegments, layoutWithLines } from '@chenglou/pretext'

const prepared = prepareWithSegments('AGI 春天到了. بدأت الرحلة 🚀', '18px "Helvetica Neue"')
const { lines } = layoutWithLines(prepared, 320, 26) // 320px max width, 26px line height
for (let i = 0; i < lines.length; i++) ctx.fillText(lines[i].text, 0, i * 26)
walkLineRanges() gives you line widths and cursors without building the text strings:
let maxW = 0
walkLineRanges(prepared, 320, line => { if (line.width > maxW) maxW = line.width })
// maxW is now the widest line — the tightest container width that still fits the text! This multiline "shrink wrap" has been missing from web
layoutNextLine() lets you route text one row at a time when width changes as you go:
let cursor = { segmentIndex: 0, graphemeIndex: 0 }
let y = 0

// Flow text around a floated image: lines beside the image are narrower
while (true) {
  const width = y < image.bottom ? columnWidth - image.width : columnWidth
  const line = layoutNextLine(prepared, cursor, width)
  if (line === null) break
  ctx.fillText(line.text, 0, y)
  cursor = line.end
  y += 26
}
This usage allows rendering to canvas, SVG, WebGL and (eventually) server-side.

API Glossary
Use-case 1 APIs:

prepare(text: string, font: string, options?: { whiteSpace?: 'normal' | 'pre-wrap' }): PreparedText // one-time text analysis + measurement pass, returns an opaque value to pass to `layout()`. Make sure `font` is synced with your css `font` declaration shorthand (e.g. size, weight, style, family) for the text you're measuring. `font` is the same format as what you'd use for `myCanvasContext.font = ...`, e.g. `16px Inter`.
layout(prepared: PreparedText, maxWidth: number, lineHeight: number): { height: number, lineCount: number } // calculates text height given a max width and lineHeight. Make sure `lineHeight` is synced with your css `line-height` declaration for the text you're measuring.
Use-case 2 APIs:

prepareWithSegments(text: string, font: string, options?: { whiteSpace?: 'normal' | 'pre-wrap' }): PreparedTextWithSegments // same as `prepare()`, but returns a richer structure for manual line layouts needs
layoutWithLines(prepared: PreparedTextWithSegments, maxWidth: number, lineHeight: number): { height: number, lineCount: number, lines: LayoutLine[] } // high-level api for manual layout needs. Accepts a fixed max width for all lines. Similar to `layout()`'s return, but additionally returns the lines info
walkLineRanges(prepared: PreparedTextWithSegments, maxWidth: number, onLine: (line: LayoutLineRange) => void): number // low-level api for manual layout needs. Accepts a fixed max width for all lines. Calls `onLine` once per line with its actual calculated line width and start/end cursors, without building line text strings. Very useful for certain cases where you wanna speculatively test a few width and height boundaries (e.g. binary search a nice width value by repeatedly calling walkLineRanges and checking the line count, and therefore height, is "nice" too. You can have text messages shrinkwrap and balanced text layout this way). After walkLineRanges calls, you'd call layoutWithLines once, with your satisfying max width, to get the actual lines info.
layoutNextLine(prepared: PreparedTextWithSegments, start: LayoutCursor, maxWidth: number): LayoutLine | null // iterator-like api for laying out each line with a different width! Returns the LayoutLine starting from `start`, or `null` when the paragraph's exhausted. Pass the previous line's `end` cursor as the next `start`.
type LayoutLine = {
  text: string // Full text content of this line, e.g. 'hello world'
  width: number // Measured width of this line, e.g. 87.5
  start: LayoutCursor // Inclusive start cursor in prepared segments/graphemes
  end: LayoutCursor // Exclusive end cursor in prepared segments/graphemes
}
type LayoutLineRange = {
  width: number // Measured width of this line, e.g. 87.5
  start: LayoutCursor // Inclusive start cursor in prepared segments/graphemes
  end: LayoutCursor // Exclusive end cursor in prepared segments/graphemes
}
type LayoutCursor = {
  segmentIndex: number // Segment index in prepareWithSegments' prepared rich segment stream
  graphemeIndex: number // Grapheme index within that segment; `0` at segment boundaries
}
Other helpers:

clearCache(): void // clears Pretext's shared internal caches used by prepare() and prepareWithSegments(). Useful if your app cycles through many different fonts or text variants and you want to release the accumulated cache
setLocale(locale?: string): void // optional (by default we use the current locale). Sets locale for future prepare() and prepareWithSegments(). Internally, it also calls clearCache(). Setting a new locale doesn't affect existing prepare() and prepareWithSegments() states (no mutations to them)
Caveats
Pretext doesn't try to be a full font rendering engine (yet?). It currently targets the common text setup:

white-space: normal
word-break: normal
overflow-wrap: break-word
line-break: auto
If you pass { whiteSpace: 'pre-wrap' }, ordinary spaces, \t tabs, and \n hard breaks are preserved instead of collapsed. Tabs follow the default browser-style tab-size: 8. The other wrapping defaults stay the same: word-break: normal, overflow-wrap: break-word, and line-break: auto.
system-ui is unsafe for layout() accuracy on macOS. Use a named font.
Because the default target includes overflow-wrap: break-word, very narrow widths can still break inside words, but only at grapheme boundaries.
Develop
See DEVELOPMENT.md for the dev setup and commands.

Credits
Sebastian Markbage first planted the seed with text-layout last decade. His design — canvas measureText for shaping, bidi from pdf.js, streaming line breaking — informed the architecture we kept pushing forward here.

Readme
Keywords


Klar — hier ist der bereinigte Extrakt nur zu „pretext“, auf Deutsch und ohne Informationsverlust, aber ohne die Sponsor-Passage und sonstige Abschweifungen:

Pretext wird als eine schnelle, sichere, präzise und umfassende Text-Messbibliothek beschrieben, die in reinem TypeScript geschrieben ist. Sie stammt von Changlu, einem ehemaligen Mitglied des React-Core-Teams und Engineer bei Midjourney. Laut Darstellung könnte pretext ein grundlegender Baustein für UI-Engineering werden.

Die zentrale Idee hinter pretext ist, ein altes Problem der Webentwicklung zu lösen: dynamischen Text zu rendern und zu vermessen, ohne teure Layout-Reflows im Browser auszulösen. Immer wenn der Browser herausfinden muss, wie hoch ein Absatz ist oder an welcher Stelle eine Zeile umbricht, muss er ein Layout-Reflow durchführen. Dabei werden oft Position und Geometrie vieler oder aller Elemente auf der Seite neu berechnet. Das gehört zu den teuersten Operationen, die ein Browser ausführen kann. Gleichzeitig ist genau das nötig, sobald man die Höhe eines Textelements abfragt.

Das macht es schwierig, textlastige Benutzeroberflächen effizient zu bauen, zum Beispiel:

virtualisierte Listen
Masonry-Layouts
andere Interfaces, in denen die exakte Textgröße bekannt sein muss, bevor gerendert wird

Als Beispiel wird eine Chat-App mit 10.000 Nachrichten beschrieben. Um so eine App performant zu halten, rendert man üblicherweise nicht alle Nachrichten in den DOM, sondern verwendet eine virtuelle Liste, in der nur die sichtbaren Elemente gerendert werden. Damit das funktioniert, muss man aber vorher die Höhe jeder Nachricht kennen, um die gesamte Scroll-Höhe berechnen und daraus ableiten zu können, welche Nachrichten sichtbar sein sollen.

Das Problem dabei:
Man könnte jede Nachricht rendern und messen — das wäre langsam.
Man könnte die Höhe schätzen — das wäre ungenau.
Genau hier soll pretext helfen.

Changlu hat laut dem Text einen Weg gefunden, die typische Browser-Text-Rendering-Pipeline zu umgehen. Statt den Browser direkt nach den Textdimensionen zu fragen, nutzt pretext für die Breite die Canvas-API. Diese läuft außerhalb des DOM und kann die Pixelbreite eines beliebigen Strings in einer beliebigen Schriftart bestimmen, ohne Reflows oder Layout-Berechnungen auszulösen.

Für die Höhe war das schwieriger. Dafür musste Changlu einen eigenen Algorithmus entwickeln, der berücksichtigt, wie Browser in verschiedenen Sprachen Zeilenumbrüche behandeln. Die Line-Break-Logik über verschiedene Browser und Sprachen hinweg korrekt nachzubilden, wird als extrem schwierig dargestellt. Im Text heißt es, dass diese Regeln mithilfe iterativer Tests gegen tatsächliches Textverhalten in echten Browsern entwickelt wurden:
Die Logik wurde geschrieben, mit realem Text in realen Browsern getestet, die Ergebnisse wurden verglichen, und dieser Prozess wurde über mehrere Wochen wiederholt, bis der Algorithmus stabil war.

Das Ergebnis ist laut Beschreibung eine überraschend einfache API:

Zuerst wird der Text mit prepare vorbereitet.
Dabei wird der Text in Segmente zerlegt, und die Breite jedes Segments wird gecacht.
Danach ruft man layout auf.
Das liefert die Gesamthöhe und die Anzahl der Zeilen des Texts — ohne jemals den DOM anzufassen oder einen Reflow auszulösen.

Der Text betont, dass diese Fähigkeit weitreichende Möglichkeiten eröffnet: Wenn man Textmaße ohne die üblichen Rendering-Kosten berechnen kann, lassen sich sehr komplexe Anwendungen bauen.

Als Demo wird eine Anwendung beschrieben, die Videobilder mit Textzeichen kombiniert. Dafür wird zunächst das Skript des Videos mit einer Funktion wie pretext prepare with segments verarbeitet. Diese Funktion zerlegt den Text und cached die Pixelbreite jedes Segments. Danach wird layout next line in einer Schleife aufgerufen — einmal pro Zeile auf jedem Bildschirm —, um exakt zu bestimmen, welche Zeichen in welcher Spalte landen.

Das Ergebnis ist ein Raster, in dem jede Zelle weiß, welches Zeichen sie enthält. Anschließend wird das Video auf ein kleines Offscreen-Canvas gezeichnet, das genau so breit und hoch ist wie dieses Zeichenraster. Die rohen Pixeldaten werden ausgelesen, und für jedes Pixel wird die Helligkeit berechnet — ein Pixel pro Zeichenzelle. Danach werden beide Informationen zusammengeführt:

Ist das zugehörige Videopixel hell, wird das Zeichen hell gezeichnet.
Ist es dunkel, wird das Zeichen ausgelassen.

So formt sich das Videobild aus Buchstaben, wobei die Helligkeit bestimmt, was sichtbar wird. Pretext übernimmt dabei den schwierigen Teil, nämlich exakt zu wissen, wo jedes Zeichen hingehört, während das Canvas den Rest erledigt.

Zum Schluss wird pretext als Beweis dafür dargestellt, dass der Browser die Textmessung nicht länger allein „besitzen“ muss. Selbst wenn pretext nicht zu dem grundlegenden Fundament wird, das Changlu darin sieht, zeige das Projekt zumindest, dass Textmessung auch außerhalb der klassischen Browser-Layout-Pipeline möglich ist.

Wenn du willst, formatiere ich dir das als saubere Notizen, technische Zusammenfassung oder 1:1 Extrakt in besserem Deutsch für ein Skript/Artikel.