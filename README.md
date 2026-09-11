# Portfolio Lilly Schattner

Statische Website ohne Build-Tool: reines HTML, CSS und JavaScript.
Kein Framework, keine Abhängigkeiten, keine Installation.

---

## Lokal ansehen

HTML-Dateien direkt per Doppelklick zu öffnen funktioniert, führt aber zu
Problemen bei Pfaden und beim Laden von Schriften. Besser ein kleiner lokaler
Server:

```bash
# Python (auf fast jedem Rechner vorhanden)
cd public
python3 -m http.server 8000
# danach: http://localhost:8000
```

```bash
# Alternative, falls Node installiert ist
npx serve public
```

---

## Struktur

| Ordner         | Inhalt                                                        |
| -------------- | ------------------------------------------------------------- |
| `public/`      | **Alles, was online geht.** Nur dieser Ordner wird ausgeliefert. |
| `inhalte/`     | Textquellen der Projektseiten als Markdown. Nicht online.      |
| `rohmaterial/` | Screenshots, Figma-Exporte, unbearbeitete Originale. Nicht online. |

Die Trennung ist wichtig: In `inhalte/` und `rohmaterial/` liegen Entwürfe und
Originaldateien. Läge alles im selben Ordner, wären sie über die Domain
abrufbar.

**Nicht nach `public/` legen:** die Bachelorarbeit als PDF (enthält die
Privatanschrift), unveröffentlichte Arbeiten, alles mit fremden Bildrechten.

### CSS

| Datei                     | Zuständig für                                    |
| ------------------------- | ------------------------------------------------ |
| `assets/css/tokens.css`   | Farben, Schriftgrößen, Abstände, Hell/Dunkel     |
| `assets/css/base.css`     | Reset, Grundtypografie, Layout-Container, Fokus  |
| `assets/css/komponenten.css` | Header, Footer, Projektliste, Buttons, Karten |

Reihenfolge der Einbindung ist bindend: `tokens` → `base` → `komponenten`.
Farbwerte und Größen stehen ausschließlich in `tokens.css`. Wer einen Hex-Wert
direkt in eine Komponente schreibt, bricht das System.

### JavaScript

| Datei                       | Zuständig für                                |
| --------------------------- | -------------------------------------------- |
| `assets/js/theme.js`        | Umschalter Hell/Dunkel                       |
| `assets/js/reveal.js`       | Einblenden von Abschnitten beim Scrollen     |
| `assets/js/projektliste.js` | Bildvorschau, die dem Mauszeiger folgt       |

Alle drei sind Zusatz, keine Voraussetzung: Ohne JavaScript bleibt die Seite
vollständig lesbar und bedienbar.

---

## Veröffentlichen

Über **Cloudflare Pages**, verbunden mit diesem Repository.

| Einstellung             | Wert     |
| ----------------------- | -------- |
| Framework preset        | None     |
| Build command           | *(leer)* |
| Build output directory  | `public` |

Das `Build output directory` ist der Punkt, der die Ordnertrennung oben erst
wirksam macht.

> **GitHub Pages funktioniert hier nicht.** Es liefert private Repositories nur
> in bezahlten Tarifen aus. Entweder Cloudflare Pages nutzen oder das
> Repository öffentlich machen.

---

## Arbeitsregeln

- Ein Thema pro Commit, Nachricht sagt *was* sich geändert hat
  („Projektseite Traumkaufhaus ergänzt“ statt „update“).
- Texte werden in `inhalte/` gepflegt und von dort in die HTML-Datei übernommen –
  nicht umgekehrt.
- Bilder vor dem Ablegen in `public/` verkleinern: max. 1600 px Breite, WebP
  oder JPG. Originale nach `rohmaterial/`.
- Jedes `<img>` bekommt `alt`, `width` und `height`.
- Vor jedem Deploy: einmal mit `Tab` durch die geänderte Seite.

## Stand

- [ ] Schritt 1 – Repo und Struktur
- [ ] Schritt 2 – tokens.css
- [ ] Schritt 3 – base.css
- [ ] Schritt 4 – Header und Footer
- [ ] Schritt 5 – Startseite
- [ ] Schritt 6 – Projektliste
- [ ] Schritt 7 – Projektseite Traumkaufhaus
- [ ] Schritt 8 – übrige Projektseiten
- [ ] Schritt 9 – Über mich, Kontakt
- [ ] Schritt 10 – Impressum, Datenschutz, 404
- [ ] Schritt 11 – theme.js, reveal.js
- [ ] Schritt 12 – Meta-Tags, Favicon, Sitemap
- [ ] Schritt 13 – Bilder und Performance
- [ ] Schritt 14 – Prüfen
- [ ] Schritt 15 – Deploy und Domain
