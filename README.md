# querstrich.

Webauftritt der Einzelagentur **querstrich** — Gestaltung und Entwicklung aus einer Hand.

Eine einzelne Datei: [`index.html`](index.html). Kein Build, kein Framework, keine
Abhängigkeit außer den Schriften. Einfach im Browser öffnen oder auf einen beliebigen
Webspace legen.

---

## Aufbau

| Abschnitt | Inhalt |
|---|---|
| Hero | Scroll-gesteuerte Typografie, mehrschichtige Parallaxe |
| Manifest | Positionierung, Wort-für-Wort-Aufbau |
| Arbeiten | Drei Projekte mit aufklappbarer Fallakte |
| Leistungen | Vier Bereiche als Akkordeon |
| Ablauf | Fünf Schritte mit mitlaufender Schiene |
| Preise | Richtwert-Rechner, drei Pakete, Betreuung |
| Vergleich | Generator gegen Zusammenarbeit |
| Person, FAQ, Kontakt | |

## Portfolio

Die drei Projekte werden nicht als Screenshot gezeigt, sondern als **Mock-Up in reinem
CSS** — jedes in der eigenen Farb- und Schriftwelt des Projekts. Kein Bildmaterial, keine
Ladezeit, scharf auf jedem Display.

- **Coaching with Maria** — ADHS- und Karrierecoaching, Amsterdam & Stuttgart
  (`--akz:#E4503C`, coaching-withmaria.com)
- **Sharemics** — Keramiklabel mit Shop und Kursbuchung, Sunrise Edition (`--akz:#CD714E`)
- **33ter Sonnenstrahl** — Einladungs-Website zu einem Outdoor-Geburtstag (`--akz:#B8BC3A`)

Beim Überfahren nimmt die Hintergrundglut der Seite die Akzentfarbe des jeweiligen
Projekts an.

## Bewegung

Alles handgeschrieben, ein einziger `requestAnimationFrame`-Takt für sämtliche
Scroll-Effekte:

- Hero mit `position:sticky` — Zeile 1 füllt sich beim Eintritt, Zeile 2 und 3 beim
  Scrollen (`clip-path`), der orangene Querstrich wächst mit
- Parallaxe über `data-par` (feste Ebenen) und `data-par-innen` (Elemente im Fluss)
- Glitch-Geister auf den Hero-Zeilen und der Wortmarke, Filmkorn als SVG-Rauschen
- Eigener Cursor mit „ansehen"-Zustand über den Projekten, magnetische Knöpfe
- Laufbänder, Reveal-Staffelung, hochzählende Kennzahlen

**`prefers-reduced-motion: reduce`** schaltet alles ab: kein Vorhang, keine Parallaxe,
kein Glitch, keine Laufbänder. Die Seite bleibt vollständig lesbar und der Hero wird zu
einem normalen Abschnitt.

## Bedienbarkeit

- Sprungmarke zum Inhalt, sichtbarer Fokusrahmen auf allem Bedienbaren
- Fallakten und Akkordeons mit `aria-expanded`, per Tastatur bedienbar
- Dekoration durchgehend `aria-hidden`
- Ohne JavaScript bleibt die Seite vollständig lesbar (`<noscript>`-Rückfall)

---

## Vor dem Livegang

1. **Schriften lokal einbinden** statt von Google laden (DSGVO). Archivo, Instrument Sans
   und DM Mono stehen unter der SIL Open Font License.
2. **Platzhalter ersetzen:** `[Vorname Nachname]`, `[Straße]`, `[PLZ Stadt]`, `[Stadt]`,
   `[telefonnummer]`, das Porträtfoto und die Mailadresse `hallo@querstrich.de`.
3. **Impressum und Datenschutzerklärung** anlegen (`/impressum`, `/datenschutz` sind
   bereits verlinkt).
4. **`og:image` und Favicon** ergänzen.
5. Die Ergebniszeilen der Projekte beschreiben, **was gebaut wurde** — keine erfundenen
   Kennzahlen. Sobald echte Zahlen vorliegen, gehören sie an diese Stelle.
