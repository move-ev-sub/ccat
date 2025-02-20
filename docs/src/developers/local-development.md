# Lokale Entwicklung

Bevor du mit der Entwicklung beginnst, stelle sicher, dass du ein grundlegendes Verständnis von JavaScript und React hast. Besonders wichtig ist außerdem, dass du ein allgemeines Verständnis der Repository-Struktur hast. Mehr dazu findest du im Abschnitt [Repository](/developers/repository).

> [!warning] Warnung
> Wenn du Veränderungen an der Repository-Struktur vornimmst, stelle sicher, dass du die Auswirkungen auf alle Anwendungen und Pakete berücksichtigst. Änderungen an der Repository-Struktur können sich auf die gesamte Codebasis auswirken und sollten sorgfältig geplant und getestet werden.

## Voraussetzungen

Um mit der Entwicklung zu beginnen, benötigst du die folgenden Tools und Technologien:

- [Node.js](https://nodejs.org/en/) (Version 20 oder höher)
- [pnpm](https://pnpm.io/) (Version 9 oder höher)
- [Git](https://git-scm.com/)
- [Visual Studio Code](https://code.visualstudio.com/) (oder ein anderer Code-Editor deiner Wahl)
- [Docker](https://www.docker.com/) (Wird nur benötigt, wenn du am Front- oder Backend arbeitest)

## Installation

1. **Klonen des Repositories**: Klone das Repository auf deinen lokalen Computer.

   ```bash
   git clone https://github.com/move-ev-sub/ccat.git
   ```

2. Stelle sicher, dass du die richtige pnpm und node Version installiert hast.

   ```bash
   node -v      # Sollte 20 oder höher sein
   pnpm -v      # Sollte 9 oder höher sein
   ```

   Wir empfehlen die Verwendung von [nvm](https://github/creationix/nvm) um die Node Version zu verwalten.

3. **Installieren der Abhängigkeiten**: Navigiere in das Verzeichnis des Repositories und installiere die Abhängigkeiten.

   ```bash
    cd ccat
    pnpm install
   ```

4. **Starten der Entwicklungsumgebung**: Starte die Entwicklungsumgebung, um die Anwendungen lokal auszuführen.

   1. Starte das Backend:

   ```bash
   pnpm sever:dev
   ```

   2. Starte das Frontend:

   ```bash
   pnpm web:dev
   ```

   3. Solltest du an der Dokumentation arbeiten wollen, starte diese mit:

   ```bash
   pnpm docs:dev
   ```
