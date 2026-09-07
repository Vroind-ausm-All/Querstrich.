# querstrich.

> **Quer**verbindung finden. **Strich** ziehen. **Punkt.**

Webauftritt der Einzelagentur **querstrich** — Marke, Website und Technik aus einer Hand.

Eine einzelne Datei: [`index.html`](index.html). Kein Build, kein Framework, keine
Abhängigkeit außer den Schriften. Im Browser öffnen oder auf einen beliebigen Webspace
legen.

---

## Zwei Ansichten

Die Seite startet **hell** und lässt sich oben rechts auf **dunkel** umschalten. Die Wahl
merkt sich der Browser (`localStorage`), die Systemvorgabe wird bewusst nicht übernommen —
hell ist der Standard.

Technisch hängt alles an einem Satz semantischer Tokens (`--papier`, `--tinte`, `--akzent`
…), die unter `[data-thema="dunkel"]` umkippen. Ein einzelner Abschnitt kann sich über die
Klasse `.invers` gegen die aktuelle Ansicht stellen — das Fragen-Modul nutzt das und ist
dadurch immer der dunkle Block auf der hellen Seite (und umgekehrt).

## Aufbau

| Abschnitt | Inhalt |
|---|---|
| Hero | „Querverbindung finden. Strich ziehen. Punkt." mit Wörterbuch-Glossar |
| Manifest | Positionierung, Wort-für-Wort-Aufbau |
| Arbeiten | Drei Projekte, überlappende Ebenen, aufklappbare Fallakte |
| **Fragen** | **Interaktiv: was ein Generator daraus macht — und was ich daraus mache** |
| Leistungen | Vier Bereiche als Akkordeon |
| Ablauf | Fünf Schritte mit mitlaufender Schiene |
| Preise | Baukasten mit Live-Aufstellung, drei Pakete |
| Person | Porträt und Textkarte überlappend |
| Kontakt | Abschluss |
| Fuß | FAQ als Fenster, nur über Klick erreichbar |

## Das Fragen-Modul

Der wichtigste Abschnitt — und der einzige, der farblich hervorgehoben ist: ein warm
getönter Grund, in der hellen Ansicht hell, in der dunklen dunkel. Kein umgedrehter
schwarzer Kasten.

Der Besucher wählt seine Branche (Handwerk, Praxis, Gastronomie, Handel, Beratung,
Verein) und öffnet eine der vier Fragen. Jede Frage zeigt beim Aufklappen zwei Antworten
nebeneinander:

- **Was ein Generator daraus macht** — gedämpft, konkret, fair
- **Was ich daraus mache** — mit Akzentbalken, als benannte Entscheidung samt Folge

Damit steht der Mehrwert **vor** dem Angebot, nicht darin: Wer eine Frage öffnet, bekommt
die Antwort sofort geschenkt. Rechts läuft eine klebende Bilanz mit, die zählt und
kommentiert; der Anfrage-Knopf trägt die geöffneten Fragen in die Mail.

Darunter beantworten vier Karten die Frage direkt: **Anwesenheit** (jemand, der zu Ihnen
kommt), **Auswahl** (jemand, der Nein sagt), **Haftung** (jemand, der geradesteht),
**Dauer** (jemand, der nächstes Jahr noch da ist).

## Der Baukasten

Fünf Gruppen — Umfang, Gestaltung, Texte, Bausteine, Betreuung. Rechts läuft eine
Aufstellung mit, die jede Position einzeln ausweist; die Betreuung wird als Monatsbetrag
getrennt geführt. Ab **9.500 €** springt der Hinweis an, dass es ein *individuell*-Projekt
mit eigener Konzeptphase wird — dieselbe Schwelle wie beim Paketpreis. Die Vorauswahl
ergibt exakt die 4.900 € des *business*-Pakets. Auch hier trägt der Anfrage-Knopf die
komplette Konfiguration in die Mail.

## Bewegung und Überlappung

Ein einziger `requestAnimationFrame`-Takt für alle Scroll-Effekte:

- **`data-par`** — feste Ebenen im Hero, gebunden an `scrollY`
- **`data-drift`** — Elemente im Fluss, gebunden an ihren Abstand zur Bildschirmmitte.
  Der Bezugspunkt ist immer das **Elternelement**; misst ein Element seine eigene,
  bereits verschobene Position, schaukelt sich die Rechnung auf.
- Überlappende Ebenen in Arbeiten (Textkarte über dem Mock-Up), Person (Porträt und Text),
  Baukasten, Fragenliste und Bilanz — jeweils mit unterschiedlichen Geschwindigkeiten
- Der Hero blendet beim Scrollen **nicht** aus. Auf dunklem Grund verschwindet fadender
  Text unauffällig, auf Papier bleibt ein milchiger, unlesbarer Schleier stehen.
- Geisterwörter hinter den Abschnittsköpfen, angeschnitten per `overflow-x: clip`
  (nicht `hidden` — das würde `position: sticky` lahmlegen)

**`prefers-reduced-motion: reduce`** schaltet alles ab: kein Vorhang, keine Parallaxe,
kein Glitch. Die Seite bleibt vollständig lesbar, der Hero wird ein normaler Abschnitt.

## Portfolio

Die drei Projekte werden nicht als Screenshot gezeigt, sondern als **Mock-Up in reinem
CSS** — jedes in der eigenen Farb- und Schriftwelt des Projekts:

- **Coaching with Maria** — ADHS- und Karrierecoaching (`#E4503C`, coaching-withmaria.com)
- **Sharemics** — Keramiklabel mit Shop und Kursbuchung (`#CD714E`)
- **33ter Sonnenstrahl** — Einladungs-Website zu einem Outdoor-Geburtstag (`#8E9122`)

Beim Überfahren nimmt die Hintergrundglut der Seite die Akzentfarbe des Projekts an.

## Bedienbarkeit

- Sprungmarke zum Inhalt, sichtbarer Fokusrahmen auf allem Bedienbaren
- Fallakten, Akkordeons, Fragen und Filter mit `aria-expanded` / `aria-pressed`,
  vollständig per Tastatur bedienbar
- FAQ als echtes `<dialog>` — Escape schließt, Fokus wandert hinein
- Dekoration durchgehend `aria-hidden`
- Ohne JavaScript bleibt die Seite lesbar (`<noscript>`-Rückfall)

---

## Vor dem Livegang

1. **Schriften lokal einbinden** statt von Google laden (DSGVO). Archivo, Instrument Sans
   und DM Mono stehen unter der SIL Open Font License.
2. **Platzhalter ersetzen:** `[Vorname Nachname]`, `[Vorname]`, `[Straße]`, `[PLZ Stadt]`,
   `[Stadt]`, `[telefonnummer]`, `[Porträt]`, das Porträtfoto und die Mailadresse
   `hallo@querstrich.de`.
3. **Impressum und Datenschutzerklärung** anlegen (`/impressum`, `/datenschutz` sind
   bereits verlinkt).
4. **`og:image` und Favicon** ergänzen.
5. Die Ergebniszeilen der Projekte beschreiben, **was gebaut wurde** — keine erfundenen
   Kennzahlen. Sobald echte Zahlen vorliegen, gehören sie an diese Stelle.
6. **Preise prüfen.** Baukasten, Pakete und die 9.500-€-Schwelle sind aufeinander
   abgestimmt — wer eine Zahl ändert, sollte die anderen mitziehen.
