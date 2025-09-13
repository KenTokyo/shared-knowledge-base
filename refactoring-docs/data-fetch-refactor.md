Basierend auf dem Video-Transkript sind hier wirklich alle Informationen, die im Video behandelt werden, detailliert aufgeschlüsselt.

Das Video stellt ein neues Daten-Fetching-Muster in Next.js vor, das auf dem React use-Hook basiert. Dieses Muster ermöglicht einen effizienteren clientseitigen Datenabruf, der eine Alternative zu bestehenden Lösungen wie SWR oder React Query bietet.

1. Grundlagen: Serverseitiges Daten-Fetching
Standard-Ansatz: Zunächst wird ein einfacher Next.js-Ansatz gezeigt, bei dem Daten direkt in einer React-Server-Komponente mit async/await abgerufen werden. Dieser Code kann für eine bessere Lesbarkeit in eine separate Funktion ausgelagert werden.

Das Problem des Standard-Ansatzes: Dieser Ansatz ist "blocking". Das bedeutet, dass die gesamte Seite nicht gerendert wird, bis die Daten vollständig geladen sind. Der Sprecher demonstriert dies mit einer künstlichen Verzögerung von 3 Sekunden, um zu zeigen, wie die gesamte Seite blockiert, was zu einer schlechten Nutzererfahrung führt.

2. Verbesserung mit Suspense
Lösung: Um das Blocking-Problem zu lösen, wird die Daten-Fetching-Logik in eine separate Komponente (ToDosList.tsx) verschoben. Diese Komponente wird dann auf der Hauptseite in eine <Suspense>-Boundary eingeschlossen.

Vorteil: Mit Suspense rendern die nicht-datenabhängigen Teile der Seite (z.B. der Header) sofort, während der datenabhängige Abschnitt einen Lade-Fallback anzeigt. Dies verbessert die wahrgenommene Ladezeit für den Benutzer erheblich.

3. Das Problem mit traditionellen Client-Komponenten
Herausforderung: Komponenten, die Interaktivität benötigen (z.B. mit einem onClick-Event), müssen Client-Komponenten sein. In Server-Komponenten sind solche Event-Handler nicht erlaubt.

Traditioneller Ansatz: Der herkömmliche Weg, Daten in einer Client-Komponente abzurufen, ist die Verwendung von useEffect und useState.

Nachteil: Dieser Ansatz ist langsamer, da der Datenabruf erst beginnt, nachdem die Komponente bereits gerendert wurde und der Client-Side-Code geladen ist.

4. Das use-Hook-Daten-Fetching-Muster (Hauptlösung des Videos)
Der use-Hook wird als die Lösung vorgestellt, die die Vorteile von Server- und Client-Rendering kombiniert.

So funktioniert es:

Auf der Server-Komponente wird der Datenabruf als Promise gestartet, ohne ihn mit await aufzulösen. Der Netzwerk-Request beginnt sofort.

Dieses Promise wird dann als Prop an die Client-Komponente weitergegeben.

In der Client-Komponente wird der React use-Hook verwendet, um das Promise zu konsumieren. Der Hook wartet, bis das Promise aufgelöst ist.

Hauptvorteile:

Kein Blocking: Der Datenabruf beginnt sofort auf dem Server, ohne das Rendering der restlichen Seite zu blockieren.

Interaktivität: Die Komponente, die die Daten konsumiert, bleibt eine Client-Komponente, die Hooks und Event-Handler verwenden kann.

Integration mit Suspense: Das Muster arbeitet nahtlos mit <Suspense>-Boundaries zusammen, um einen Lade-Fallback anzuzeigen, während die Daten noch unterwegs sind.

Direkter Datenbankzugriff: Es ermöglicht das Abrufen von Daten direkt aus einer Datenbank (z.B. mit Prisma) auf dem Server, was bei traditionellem clientseitigem Fetching nicht möglich ist.

5. Verteilung von Daten mit der Context API
Anwendungsfall: Wenn mehrere Komponenten auf die gleichen Daten zugreifen müssen, kann das Muster mit der React Context API erweitert werden.

Ablauf: Das Promise vom serverseitigen Datenabruf wird an einen Context Provider übergeben. Jede Client-Komponente kann dann über diesen Context auf das Promise zugreifen und den use-Hook verwenden, um die Daten zu konsumieren. Dies verhindert redundante Datenabrufe.

6. Fazit und Einschränkungen
Das use-Hook-Muster wird als performantere Methode für den Datenabruf in Client-Komponenten im Vergleich zu useEffect hervorgehoben.

Es bietet eine gute "Out-of-the-Box"-Lösung, die von React und Next.js bereitgestellt wird.

Wichtige Einschränkung: Der Sprecher weist darauf hin, dass dieses Muster keine fortgeschrittenen Features wie automatisches Background-Refetching bietet, die in Bibliotheken wie React Query zu finden sind.