Hallo! In dem von dir geteilten Video werden verschiedene Lösungsansätze zur Behebung von Leistungsproblemen bei Next.js-Websites vorgestellt. Hier sind die wichtigsten Punkte zusammengefasst:

1. Bildoptimierung [04:07]:

Problem: Große Bilddateien verlangsamen die Ladezeiten erheblich [03:35].

Lösung: Nutze die next/image-Komponente, die Bilder optimiert, in effizientere Formate wie WebP konvertiert und die Dateigröße stark reduziert [04:15, 06:29]. Wichtige Bilder können mit der priority-Eigenschaft schneller geladen werden [07:17]. Für externe Bilder musst du die Domains in der next.config.js freigeben, um Hotlinking zu vermeiden [05:18].

2. Langsame Datenabfragen und Streaming [08:08]:

Problem: Langsame Server-Datenabfragen können die Navigation verlangsamen [08:00].

Lösung: Implementiere Streaming mit React Suspense Boundaries [09:40]. Dadurch werden Teile der Seite gestreamt, sobald sie fertig sind, während ein Lade-Fallback angezeigt wird, was die Benutzererfahrung verbessert [11:50].

3. Authentifizierung und serverseitiges Rendering (SSR) [13:33]:

Problem: Das Abrufen von Benutzersitzungsdaten auf dem Server für Komponenten wie die Navbar kann dazu führen, dass die gesamte Anwendung dynamisch gerendert wird, was die Leistung von eigentlich statischen Seiten beeinträchtigt [19:03, 18:24].

Lösung: Rufe die Benutzersitzung auf der Client-Seite ab, indem du einen Client-Side-Hook wie useKindBrowserClient verwendest und die Komponente mit use client kennzeichnest [20:08, 20:15]. Ein Ladezustand kann einen "Flash" beim Laden verhindern [21:12].

4. Schutz von Routen mit Middleware [21:50]:

Problem: Die Überprüfung der Benutzersitzung direkt auf einer geschützten Seite kann zu unnötigem dynamischem Rendering führen [23:17].

Lösung: Verwende Middleware, um Routen zu schützen. Middleware läuft auf dem Server, bevor eine Anfrage abgeschlossen ist, und kann Benutzer umleiten, ohne das Rendering der Seite zu beeinflussen, wodurch statisches Rendering erhalten bleibt [23:45, 24:03].