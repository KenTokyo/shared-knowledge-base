# Automatische Enhanced-Prompts als Standard

## Source

- Datum: 2026-08-14
- Ziel: `shared-docs/CODING-RULES.md`
- Quelle: aktueller Chat

## Unchanged original

D:\CODING\React Projects\test-projects\shared\shared-docs\CODING-RULES.md

Was user sagt:
das sieht echt nicht gut aus, das sieht einfach billig aus, mach das besser  D:\CODING\React Projects\test-projects\shared\shared-docs\CODING-RULES.md Okay, kannst du sowas, das Problem ist, manchmal fallen mir die Wörter nicht ein. Können wir sowas in den Coding Rules reinschreiben, dass wenn der User sagt, mach das besser oder das sieht billig aus, mach das besser oder kannst du das schöner machen? Wenn solche Wörter reinkommen und verbessere meinen Prompt. Wenn ich zum Beispiel sage, verbessere meinen Prompt, heißt das nicht, dass der Prompt nur verbessert werden soll, sondern das heißt, die Aufgabe soll gleichzeitig bearbeitet werden. Können wir so ein Keywording immer machen? Weil, damit ich nicht diese Adjektive machen muss. Meinst du, das kriegen wir hin irgendwie in den Coding Rules? Oder ist das schon drin? Wir haben ja dieses Enhanced Prompt System. Aber woher weiß die KI, wann dieses Enhanced Prompt System aktiviert werden soll? Das ist das, was ich meine. Woher weiß die KI das? Ich muss ich da irgendein Keyword sagen? Oder macht die das automatisch? Wir können das ja machen, dass es erstmal automatisch gemacht werden soll, weil ich ja eh automatisch sollen Adjektive eingebaut werden, so wie, du gibst einfach diesen Beispiel ein, so wie ich, du baust quasi einen Satz von mir rein. Ich sage immer sowas zum Beispiel, was ich immer sage, was User sagt. Das sieht echt nicht gut aus. Das sieht einfach billig aus. Mach das besser. Also solche generischen Sätze sage ich immer. Und dann soll das eigentlich schon automatisch verbessert werden, also der Prompt. Und zusätzlich könnte der User auch sagen, Prompt verbessern als Keyword. Am Ende irgendwie, Prompt verbessern. Und dann soll automatisch auch währenddessen der Prompt verbessert werden, aber auch implementiert werden. Oder sollen wir ein Keyword machen? Prompt verbessern und implementieren, keine Ahnung. Überleg, was am sinnvollsten ist, dass ich das nicht, ich mag, weil ich möchte dieses, ich möchte nicht vorher den Prompt verbessern. Während es implementiert wird, soll das verbessert werden. Verstehst du, was ich meine? Ist das mit den jetzigen Coding Rules schon möglich? Wenn nicht, dann passt die Coding Rules bitte an, damit mein Prompt immer automatisch verbessert wird, quasi in dieser Enhanced Prompt Datei. Wir können das als Default sogar machen, ja. Ich entferne sogar dieses Prompt MD. Das soll immer enhanced werden, ja. Eigentlich soll das immer enhanced werden, weil die Prompts kommen meistens nicht gut an. Oder was ist, wenn ich einen guten Prompt aber eingebe? Dann ist das Problem wie, ne? Vielleicht muss ich das vielleicht noch angeben als Keyword eventuell. Was würdest du vorschlagen hier? Weil manchmal habe ich schon ziemlich gute Prompts. Überleg mal, was für ein System wir hier machen könnten. Überleg mal verschiedene Varianten und baue das ein, was die KI jetzt nicht komplett kaputt macht, also das Workflow. Genau.

## Improved prompt

- Stelle projektändernde Aufgaben standardmäßig auf genau eine `…-enhanced-prompt.md` plus Task-Datei um; neue plain `…-prompt.md` entfallen.
- Dieselbe KI bewahrt das Original, erstellt eine verlustfreie verbesserte Arbeitsfassung und implementiert sie ohne Zwischenstopp.
- Gute, bereits vollständige Prompts nur ordnen und entwirren; keine Fakten, Features, Grenzen oder Qualitätsrichtungen erfinden.
- Vage Kritik wie „billig“, „gefällt nicht“, „mach besser“ oder „mach schöner“ automatisch anhand Domäne und Projektzustand in konkrete Qualitätsdimensionen, passende Adjektive und prüfbare Abnahme übersetzen.
- `Prompt verbessern` bedeutet verbessern und implementieren. Nur `Nur Prompt verbessern` stoppt nach der Promptdatei; `Prompt unverändert` setzt das Original ohne inhaltliche Verbesserung um.
- Fragen und reine Leseaufträge bleiben ohne Prompt-/Task-Paar. Verneinungen, Zitate, Platzhalter, Secrets und feste Fakten schützen.
- Aktualisiere alle aktiven Pfad-, Übergabe-, Workflow- und Schnellcheck-Verweise in `CODING-RULES.md`; historische Taskdateien nicht massenhaft umbenennen.
