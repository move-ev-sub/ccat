# Repository

Der gesamte Sourcecode des Projekts ist in einem großem Monorepo gespeichert. Das Repository ist in verschiedene Ordner unterteilt, die jeweils eine andere Funktion haben. Hier ist eine Übersicht der Struktur des Repositories:

```plaintext
ccat/
├─ apps/
│  ├─ docs/
│  ├─ server/
│  ├─ web/
├─ packages/
│  ├─ ui/
│  ├─ utils/
├─ package.json
```

> Dies ist eine vereinfachte Darstellung der Struktur des Repositories. Es gibt noch weitere Ordner und Dateien, die hier nicht aufgeführt sind.

## Monorepo Architektur

Monorepos sind Repositories, die mehrere Projekte oder Anwendungen enthalten. Dies ermöglicht es, den gesamten Sourcecode an einem Ort zu speichern und zu verwalten. In diesem Projekt wird ein Monorepo verwendet, um die verschiedenen Anwendungen und Pakete zu organisieren. Monorepos haben viele Vorteile, wie z.B. die Möglichkeit, Code zwischen verschiedenen Anwendungen zu teilen und zu wiederverwenden. Anderseits kann ein Monorepo ein Projekt auch komplexer machen, da es mehrere Anwendungen und Pakete enthält.

In diesem Fall haben wir uns für ein Monorepo entschieden, um die verschiedenen Anwendungen und Pakete des Projekts zu organisieren. Dies ermöglicht es uns, den gesamten Sourcecode an einem Ort zu speichern und zu verwalten. Es erleichtert auch die Zusammenarbeit zwischen den Entwicklern, da sie den gesamten Code im selben Repository finden.

### Turborepo

Wir haben uns für Turborepo entschieden, um das Monorepo zu verwalten. Turborepo ist ein Tool, das die Verwaltung von Monorepos erleichtert. Eine genaue Beschreibung von Turborepo kann [hier](https://turbo.build/repo/docs) gefunden werden.

## `apps/`

Der `apps/`-Ordner enthält alle Anwendungen, die im Projekt verwendet werden. Jede Anwendung ist in einem eigenen Unterordner gespeichert. Die Hauptanwendungen sind `docs/`, `server/` und `web/`. Jede Anwendung hat ihre eigene `package.json`-Datei und kann unabhängig von den anderen Anwendungen entwickelt und getestet werden.

## `packages/`

Der `packages/`-Ordner enthält alle wiederverwendbaren Pakete, die im Projekt verwendet werden. Jedes Paket ist in einem eigenen Unterordner gespeichert. Diese Pakete können von anderen Anwendungen im Repository importiert werden. Sie umfassen Funktionen, Komponenten und andere wiederverwendbare Teile des Codes, wie beispielsweise Konfigurationen.
