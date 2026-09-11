# Portfolio Lilly Schattner

Statische Website: reines HTML, CSS und JavaScript. Kein Framework, kein
Build-Tool, keine Installation. Was im Repository liegt, ist genau das, was im
Browser ankommt.

---

## Lokal ansehen

```bash
python3 -m http.server 8000
# danach http://localhost:8000
```

Dateien per Doppelklick zu öffnen funktioniert auch, weicht aber bei Pfaden und
Schriften vom Livebetrieb ab.

---

## Struktur

```
index.html              Startseite
projekte/index.html     Übersicht
projekte/*.html         eine Seite je Projekt
ueber-mich.html
kontakt.html
impressum.html
datenschutz.html
404.html
css/style.css           das gesamte Design, in 11 nummerierte Abschnitte geteilt
js/script.js            Theme-Umschalter, Scroll-Effekt, Bildvorschau
bilder/                 Projektbilder und das Vorschaubild für Link-Previews
fonts/                  Inter und Bricolage Grotesque, lokal ausgeliefert
favicon.svg  robots.txt  sitemap.xml  .nojekyll
```

Alle Pfade sind **relativ**. Dadurch läuft die Seite sowohl unter einer eigenen
Domain als auch unter `username.github.io/repo-name/`, ohne dass du etwas
umstellen musst.

`.nojekyll` schaltet die Jekyll-Verarbeitung von GitHub Pages ab. Ohne die
Datei ignoriert GitHub Ordner, die mit einem Unterstrich beginnen, und der
Deploy dauert länger.

---

## Vor dem Livegang ersetzen

**1. Adresse und Domain** – `deine-domain.de` kommt **51-mal** vor, verteilt auf
alle HTML-Dateien plus `robots.txt` und `sitemap.xml`. Am schnellsten mit
Suchen-und-Ersetzen über den ganzen Ordner:

```bash
grep -rl "deine-domain.de" . | xargs sed -i 's|deine-domain\.de|lilly-schattner.de|g'
```

Dasselbe für die E-Mail-Adresse `hallo@deine-domain.de`.

**2. Großgeschriebene Platzhalter** – bewusst so auffällig, dass sie nicht
durchrutschen:

| Platzhalter | Wo | Was hinein muss |
| --- | --- | --- |
| `DEIN-PROFIL` | Fußzeile aller Seiten | LinkedIn-URL, oder den Eintrag löschen |
| `STRASSE UND HAUSNUMMER`, `PLZ ORT` | impressum.html | ladungsfähige Anschrift |
| `ANSCHRIFT WIE IM IMPRESSUM` | datenschutz.html | dieselbe Anschrift |
| `ORT EINTRAGEN` | ueber-mich.html | Wohnort oder Wunschregion |
| `DEINE STATION` | ueber-mich.html | dritte Station im Lebenslauf |

**3. Texte von Lilly gegenlesen lassen.** Die Projekttexte sind Entwürfe. Auf
`ueber-mich.html` stehen zwei HTML-Kommentare an den Stellen, die nur sie
schreiben kann.

**4. Den Hinweiskasten am Ende von `datenschutz.html` löschen.**

**5. Impressum prüfen.** § 5 DDG verlangt eine ladungsfähige Anschrift, sobald
die Seite geschäftsmäßig ist – ein Postfach genügt nicht.

---

## Veröffentlichen über GitHub Pages

1. Repository auf GitHub anlegen (öffentlich) und den Ordnerinhalt pushen.
2. *Settings → Pages → Source: Deploy from a branch → `main` / `/ (root)`*
3. Eigene Domain unter *Custom domain* eintragen, danach **Enforce HTTPS**
   anhaken. Das Zertifikat wird automatisch ausgestellt.

Der Deploy dauert ein bis zwei Minuten. Danach ist jeder `git push` ein neuer
Livegang.

> Voraussetzung ist ein **öffentliches** Repository. Private Repositories
> veröffentlicht GitHub Pages nur in bezahlten Tarifen.

---

## Was hier nicht hineingehört

Alles im Repository ist über die Domain abrufbar – auch Dateien, die auf keiner
Seite verlinkt sind. Und Gelöschtes bleibt in der Git-Historie lesbar.

- die Bachelorarbeit als PDF (Deckblatt enthält die Privatanschrift)
- Entwurfstexte und interne Notizen
- Arbeitsdateien aus InDesign, Affinity, Figma
- Bilder, deren Rechte nicht geklärt sind

Vor dem ersten öffentlichen Push außerdem *Settings → Emails → Keep my email
address private* aktivieren. Sonst steht die private E-Mail-Adresse in jedem
Commit.

---

## Wie das Design aufgebaut ist

`css/style.css` beginnt mit einem Inhaltsverzeichnis. Abschnitt 2 enthält alle
Design-Tokens: Farben, Schriftgrößen, Abstände. Wer dort `--accent` ändert,
ändert Chips, Buttons, Fokusring und Textmarkierung gleichzeitig.

Weiter unten stehen keine Hex-Werte mehr – das ist die einzige Regel, an der
das System hängt.

Die Schriftgrößen (`--step--1` bis `--step-7`) sind fluid: Sie skalieren
stufenlos mit der Fensterbreite. Deshalb braucht die Seite fast keine Media
Queries.

## Bewusste Entscheidungen

- **Kein Kontaktformular.** Eine E-Mail-Adresse leistet dasselbe und spart
  Serverlogik, Spamschutz und einen Datenschutzabsatz.
- **Kein Cookie-Banner**, weil keine Cookies gesetzt werden.
- **Schriften lokal**, nicht über das Google-Fonts-CDN. Dort werden IP-Adressen
  in die USA übertragen – dafür gab es Abmahnungen.
- **Kaum JavaScript.** Ohne JS bleibt die Seite vollständig lesbar und
  bedienbar.
- **`prefers-reduced-motion` wird respektiert.**

## Geprüft

- axe-core: keine Verstöße auf 11 Seiten in Hell und Dunkel
- kein seitliches Scrollen bei 320, 375, 414, 768 und 1440 px
- alle internen Links und Dateien laden

## Arbeitsregeln

- Ein Thema pro Commit, Nachricht sagt, was sich geändert hat.
- Bilder vor dem Einchecken verkleinern: max. 1600 px Breite.
- Jedes `<img>` bekommt `alt`, `width` und `height`.
- Vor jedem Push einmal mit `Tab` durch die geänderte Seite.
