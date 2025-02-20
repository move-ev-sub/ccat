# `@ccat/tailwind-config`

Enthält die geteilten Tailwind-Konfigurationen für alle Projekte.

## `src/colors.css`

Enthält die Farbdefinitionen für das Projekt.

## `src/dark-mode.css`

Tailwindcss bringt eine eingebaute Dark-Mode-Funktionalität mit. Dieser wird standardmäßig über die css-Funktion `prefers-color-scheme` aktiviert. In diesem Projekt wird der Dark-Mode über eine Klasse `dark` aktiviert (dafür nutzen wir [`next-themes`](https://github.com/pacocoursey/next-themes)). Diese Datei enthält die Definitionen für den Dark-Mode.
