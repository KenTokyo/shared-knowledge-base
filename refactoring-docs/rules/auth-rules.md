In dem Video wird erklärt, wie die Authentifizierung in Next.js-Anwendungen die Performance negativ beeinflussen kann, indem sie Seiten von statischem in dynamisches Rendering umwandelt. Es werden zwei gängige Probleme und deren Lösungen vorgestellt:

Problem 1: Authentifizierungsprüfung in der Seitenkomponente

Wenn die Authentifizierungsprüfung direkt in einer Seitenkomponente, wie z.B. /posts, vorgenommen wird, führt dies dazu, dass die Seite dynamisch gerendert wird. Das liegt daran, dass der Authentifizierungs-Token aus Cookies oder Headern gelesen wird, was das statische Rendering deaktiviert [13:05].

Die Folge ist, dass die Seite bei jeder Nutzeranfrage neu gerendert werden muss, anstatt eine statische HTML-Datei zu nutzen, was ineffizient ist [13:36].

Lösung: Um statisches Rendering zu erhalten, sollte die Authentifizierungsprüfung stattdessen in der Middleware durchgeführt werden [14:54]. Dadurch wird die Seite geschützt, ohne dass sie dynamisch gerendert werden muss [15:30].

Problem 2: Anzeigen von Benutzerinformationen in einer App-weiten Komponente

Wenn Benutzerinformationen (wie E-Mail oder Avatar) in einer Komponente wie dem Header angezeigt werden, die auf jeder Seite vorhanden ist, und diese Informationen serverseitig abgerufen werden, kann dies dazu führen, dass die gesamte Anwendung dynamisch gerendert wird [19:29].

Lösung: Statt die Benutzerinformationen serverseitig abzurufen, kann dies auch clientseitig geschehen [20:36]. Es wird empfohlen, die Header-Komponente als Client-Komponente zu kennzeichnen. Dadurch bleibt der Rest der Seite statisch, während die Benutzerinformationen erst im Browser nachgeladen werden [22:04].

