# querstrich.

> **Quer**verbindung finden. **Strich** ziehen. **Punkt.**

Webauftritt der Einzelagentur **querstrich** — Marke, Website und Technik aus einer Hand.

Kein Build, kein Framework, **keine einzige Verbindung nach außen**. Auf einen Webspace
mit PHP legen, fertig.

**Vorschau:** https://vroind-ausm-all.github.io/Querstrich.media/

```
index.html          Startseite (Stil und Skript inline)
arbeiten.html       Portfolioseite, noch zu füllen
datenschutz.html    Datenschutzerklärung
impressum.html      Gerüst, noch auszufüllen
kontakt.php         Empfänger des Formulars
robots.txt          sitemap.xml
.nojekyll           schaltet Jekyll auf GitHub Pages ab
.github/workflows/  Pages-Veröffentlichung
assets/
  recht.css         Stil der Textseiten
  fonts/*.woff2     8 Dateien, 280 KB
  og-image.png      Vorschaubild für geteilte Links
```

## Veröffentlichung

Die Seite liegt doppelt: als **Vorschau auf GitHub Pages** (zum Herzeigen) und später auf
dem eigenen Webspace (produktiv). Der Unterschied ist bewusst:

| | GitHub Pages | Eigener Webspace |
|---|---|---|
| Kontaktformular | öffnet das Mailprogramm mit fertiger Nachricht | `kontakt.php` verschickt die Mail |
| Suchmaschinen | `noindex` — konkurriert nicht mit der echten Domain | `index, follow` |
| Adressen | `vroind-ausm-all.github.io/Querstrich.media` | `www.querstrich.de` |

`.github/workflows/pages.yml` veröffentlicht bei jedem Push auf `main`. Dafür muss unter
**Settings → Pages → Source** einmalig *GitHub Actions* ausgewählt sein.

**Beim Umzug auf die eigene Domain** die Pages-Adresse in `index.html`,
`datenschutz.html`, `impressum.html`, `arbeiten.html`, `sitemap.xml` und `robots.txt`
ersetzen und `noindex, follow` auf `index, follow` stellen. Ein Kommentarblock im Kopf
von `index.html` benennt alle Stellen.

---

## Datenschutz

Die Seite ruft **nichts** von fremden Servern ab — geprüft über den Netzwerkmitschnitt
des Browsers: null externe Requests.

- **Schriften liegen lokal** unter `assets/fonts/`. Nur die Latin-Schnitte, nach Inhalt
  entdoppelt (die Variable Fonts waren bei Google dreifach referenziert): 12 `@font-face`,
  8 Dateien, 280 KB. SIL Open Font License.
- **Ein Preload**, auf `archivo-latin.woff2`. Die Displayschrift trägt die Überschrift
  und damit das LCP-Element; unter `font-display: optional` hat der Browser nur ein
  kurzes Zeitfenster, sie zu nutzen. Die übrigen Schnitte bleiben ohne Preload — das
  Stylesheet steht inline, der Browser findet `@font-face` schon beim ersten Parsen.
  Beim Öffnen per `file://` greift der Preload wegen der CORS-Regel für Schriften nicht;
  über HTTP, also überall dort, wo die Seite wirklich liegt, schon.
- **Keine Cookies.** Gespeichert wird nur `qs-thema` (helle oder dunkle Ansicht) und
  `qs-hinweis` (Hinweis weggeklickt) im `localStorage` — beides vom Nutzer selbst
  ausgelöst und damit nach § 25 Abs. 2 Nr. 2 TDDDG einwilligungsfrei.
- **Kein Einwilligungsbanner**, weil es nichts einzuwilligen gibt. Stattdessen eine
  Hinweisleiste, die genau das sagt, sich merken lässt und über den Fußzeilen-Link
  „cookies & speicherung" jederzeit wieder aufgeht.
- **Das Formular** sendet an `kontakt.php` auf dem eigenen Server. Kein Formulardienst,
  keine Drittübermittlung. Spamabwehr über Honigtopf-Feld, Mindest-Ausfülldauer und eine
  Ratenbegrenzung, deren Kennung ein SHA-256 über IP und Stunde ist — die IP selbst wird
  nicht gespeichert, der Eintrag verfällt nach zwei Stunden. In der
  Datenschutzerklärung unter „Kontaktformular" benannt.

## Zwei Ansichten

Die Seite startet **hell** und lässt sich oben rechts auf **dunkel** umschalten. Die Wahl
merkt sich der Browser (`localStorage`), die Systemvorgabe wird bewusst nicht übernommen —
hell ist der Standard.

Technisch hängt alles an einem Satz semantischer Tokens (`--papier`, `--tinte`, `--akzent`
…), die unter `[data-thema="dunkel"]` umkippen. Ein Abschnitt kann sich über die Klasse
`.getoent` hervorheben, ohne die Ansicht umzudrehen: Der Grund wird in beiden Fassungen
mit dem Akzent getönt — hell auf hell, dunkel auf dunkel.

## Aufbau

| Abschnitt | Inhalt |
|---|---|
| Hero | „Querverbindung finden. Strich ziehen. Punkt." mit Wörterbuch-Glossar |
| Kopf | Schwebende Milchglasleiste mit Abstand zum Rand |
| Manifest | Positionierung, Wort-für-Wort-Aufbau |
| Arbeiten | Drei Projekte, überlappende Ebenen, aufklappbare Fallakte |
| Handwerk | Fünf Werkzeuge aus den Projekten + Brücke zur Unterseite |
| **Fragen** | **Interaktiv: was ein Generator daraus macht — und was ich daraus mache** |
| Ablauf | Fünf Schritte mit mitlaufender Schiene |
| Preise | Baukasten mit Live-Aufstellung, drei Pakete |
| Person | Porträt und Textkarte überlappend |
| Kontakt | Abschluss |
| Fuß | FAQ als Fenster, nur über Klick erreichbar |

## Anschluss ans Portfolio

Unter den drei Projekten steht **„Drei Projekte, fünf Werkzeuge."** — fünf knappe
Kompetenzen, die in allen drei stecken (Gestaltungssystem, Bewegung mit Absicht,
interaktive Module, Struktur & Text, Technik & Zugang). Sie belegen den technischen
Aufwand und die gestalterische Haltung mit dem, was tatsächlich gebaut wurde.

Darunter führt die **Brücke** auf `arbeiten.html` — eine Gerüstseite, die benennt, was
dort entstehen wird. Der Pfad ist bewusst relativ: ein führender Schrägstrich hätte unter
dem Pages-Unterpfad ins Leere geführt.

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

## Umfang

Die Landingpage trägt acht Abschnitte. Bewusst **nicht** enthalten:

- Ein eigener Leistungs-Abschnitt. Die Baukasten-Gruppen benennen jede Leistung mit
  Preis, „Drei Projekte, fünf Werkzeuge" belegt sie mit Arbeit — eine dritte Aufzählung
  war Wiederholung.
- Eine separate Betreuungs-Zeile bei den Preisen; Betreuung ist Gruppe 05 im Baukasten.

## Bewegung und Überlappung

Ein einziger `requestAnimationFrame`-Takt für alle Scroll-Effekte:

- **`data-par`** — feste Ebenen im Hero, gebunden an `scrollY`
- **`data-drift`** — Elemente im Fluss, gebunden an ihren Abstand zur Bildschirmmitte.
  Der Bezugspunkt ist immer das **Elternelement**; misst ein Element seine eigene,
  bereits verschobene Position, schaukelt sich die Rechnung auf.
- Die Werte sind bewusst kräftig (Bild ±9, Textkarte ∓7, Geisterwörter ±15): bei ±3
  liegt der Versatz unter 20 px und ist auf einer 500 px hohen Karte nicht zu sehen.
- **Nicht** im Bild selbst parallaxen. Die Mock-Ups sind randvoll komponiert; jede
  Skalierung schneidet Kopfleiste und Produktkarten ab. Der Versatz zwischen Bild und
  Textkarte reicht.
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

## Der Kopf

Eine schwebende Leiste mit Abstand zu allen Rändern, Milchglas (`backdrop-filter`),
feiner Kante und weichem Schatten. Auf Mobilgeräten liegt sie frei über dem Inhalt und
überlappt nichts — das Menü beginnt unterhalb.

Das Glas liegt auf einer **eigenen Ebene** (`.kopf-glas`), nicht auf `.kopf-inner`:
`backdrop-filter` macht sein Element zum Bezugsrahmen für `position: fixed`. Läge der
Filter auf der Leiste selbst, klappte das Vollbildmenü in die Kopfleiste zusammen.

## Icons

**Favicon:** Sprechblase mit zwei Querstrichen, als SVG-Data-URI direkt in der Datei —
funktioniert damit auch über `file://`. Eine eingebettete `prefers-color-scheme`-Regel
dreht die Farben, damit das Symbol auf dunklen Browser-Tabs sichtbar bleibt.

**Abschnittsmarken:** zehn Piktogramme als `<symbol>`-Sprite am Anfang des `<body>`,
per `<use href="#ic-…">` eingesetzt. Monoline, 24×24, 1,5 px Kontur, eckige Enden — und
jedes trägt **ein Element in Akzentfarbe**, meist einen Querstrich. Damit ersetzt das
Piktogramm den orangen Strich vor dem Abschnittslabel, ohne das Markenmotiv aufzugeben.

Die Akzentteile stehen als `stroke="var(--akzent)"` direkt im `<symbol>`: Klassen von
außen greifen nicht in den Shadow-DOM eines `<use>`, vererbbare Eigenschaften und Custom
Properties dagegen schon.

## Suchmaschinen

`canonical`, `robots`, Open Graph mit echtem `og-image.png` (1200 × 630, aus der Seite
selbst gerendert), Twitter-Card, `sitemap.xml`, `robots.txt`.

Dazu **JSON-LD** — `ProfessionalService` mit Angebotskatalog (check / business /
individuell), `Person` und `WebSite`. Das schließt die Lücke zwischen Anspruch und Beleg:
„strukturierte Daten" steht als Kompetenz auf der Seite, jetzt hat sie selbst welche.

## Bedienbarkeit

- Sprungmarke zum Inhalt, sichtbarer Fokusrahmen auf allem Bedienbaren
- Fallakten, Akkordeons, Fragen und Filter mit `aria-expanded` / `aria-pressed`,
  vollständig per Tastatur bedienbar
- FAQ als echtes `<dialog>` — Escape schließt, Fokus wandert hinein
- Dekoration durchgehend `aria-hidden`
- Auf Orangeflächen steht **dunkle** Schrift (`--auf-akzent`). Weiß auf `#FF4A0F` ergibt
  nur 3,4:1 — zu wenig für Fließtext; dunkel sind es 5,7:1.
- Ohne JavaScript bleibt die Seite lesbar (`<noscript>`-Rückfall)

---

---

## Geprüft, nicht behauptet

Die folgenden Zahlen stammen aus Messläufen gegen einen lokalen Server, der die Seite
unter demselben Unterpfad ausliefert wie GitHub Pages. Reproduzierbar mit Chromium und
axe-core; die Werte gelten unkomprimiert und ohne CDN, über HTTPS mit Brotli fallen die
Übertragungsgrößen deutlich kleiner aus.

**Barrierefreiheit — axe-core 4.13.0, WCAG 2.0/2.1 A + AA**

| Seite | vorher | nachher |
| --- | --- | --- |
| Startseite hell | 29 Verstöße (`color-contrast`, serious) | **0** |
| Startseite dunkel | 8 Verstöße (`color-contrast`, serious) | **0** |
| Datenschutz | 0 | **0** |
| Arbeiten | 0 | **0** |

Zwei Ursachen, zwei verschiedene Korrekturen:

- `--tinte-3` war mit 3,84:1 (hell) und 4,37:1 (dunkel) unter der Schwelle von 4,5:1.
  Jetzt `#6F6E65` (4,63:1) und `#7C7B73` (4,62:1) — rechnerisch bestimmt, nicht geschätzt.
- Die Ablaufschritte wurden per `opacity` abgedunkelt. Bei 0,4 bleiben von 11,9:1 noch
  2,02:1 übrig; selbst 0,7 reicht mit 3,92:1 nicht. Statt zu dimmen hebt der aktive
  Schritt sich jetzt **positiv** hervor: inaktive Schritte tragen `--tinte-2`/`--tinte-3`,
  der aktive `--tinte` und eine akzentfarbene Ziffer. Gleiche Wirkung, lesbarer Ruhezustand.

**Ladeverhalten — Chromium, 1440×900**

| Messwert | vorher | nachher |
| --- | --- | --- |
| LCP | 316 ms | 320 ms |
| CLS | 0,0867 | **0,0000** |
| Ressourcen | 4 | 4 |
| Summe | 289 KB | 291 KB |

Zum CLS gehört ein Irrweg, der hier stehen bleibt, weil er die Regel zeigt: geratene
`ascent-override`/`descent-override`-Werte für die Ersatzschrift haben den Sprung von
0,0867 auf 0,0907 **vergrößert**. Der Messbericht wies einen vertikalen Versatz von 6 px
aus — also stimmten die Höhen, nicht die Breiten. Geblieben ist deshalb nur ein gegen
Arial gemessener `size-adjust: 84.1%`; den Sprung selbst schließt `font-display: optional`
auf der Displayschrift aus, flankiert von einem `preload` auf `archivo-latin.woff2`, damit
das kurze Zeitfenster von `optional` auch auf langsamen Verbindungen reicht.

**Sicherheit**

- **CSP** in allen vier Seiten: `default-src 'self'`, `connect-src 'none'`,
  `object-src 'none'`, `base-uri 'none'`. Die Seite kann per Bauart nichts nachladen —
  die Richtlinie macht das für den Browser überprüfbar.
- **`.htaccess`** für den PHP-Webspace: dieselbe CSP als echter Header, dazu HSTS,
  `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, HTTPS-Umleitung,
  ein Jahr Cache auf Schriften, kein Cache auf HTML, `Options -Indexes`.
  Auf GitHub Pages greift die Datei nicht — dort trägt das `<meta>`-Pendant.
- **`kontakt.php`** hatte Honigtopf und Zeitprüfung, aber keine Bremse. Jetzt: 60 s
  zwischen zwei Anfragen, höchstens 5 pro Stunde je Absender. Die Kennung ist ein
  SHA-256 über IP und Stunde — die IP selbst wird nie geschrieben, Spuren älter als
  zwei Stunden werden beim nächsten Aufruf gelöscht.

---

## Vor dem Livegang

1. **Domain eintragen.** `https://www.querstrich.de` steht als Platzhalter in
   `canonical`, Open Graph, JSON-LD, `robots.txt`, `sitemap.xml` und `kontakt.php`.
2. **`kontakt.php` einstellen:** Empfänger, Absender (Postfach auf *derselben* Domain,
   sonst verwirft SPF/DMARC die Mail) und Seiten-URL. Braucht PHP 8.1 oder neuer.
3. **Impressum ausfüllen** (`impressum.html`) und dort `robots` von `noindex` auf
   `index, follow` stellen. Eine unfertige Pflichtseite gehört nicht in den Index.
4. **Datenschutzerklärung prüfen lassen** und die Hinweiskästen in beiden Rechtsseiten
   entfernen. Die Vorlage beschreibt den tatsächlichen technischen Stand, ersetzt aber
   keine Rechtsberatung.
5. **Platzhalter ersetzen:** `[Vorname Nachname]`, `[Vorname]`, `[Straße]`, `[PLZ Stadt]`,
   `[Stadt]`, `[telefonnummer]`, `[Porträt]`, das Porträtfoto und die Mailadresse
   `hallo@querstrich.de`.
6. **Portfolioseite füllen.** `arbeiten.html` ist bislang ein Gerüst, damit der Link
   unter dem Portfolio nicht ins Leere führt.
7. Die Ergebniszeilen der Projekte beschreiben, **was gebaut wurde** — keine erfundenen
   Kennzahlen. Sobald echte Zahlen vorliegen, gehören sie an diese Stelle.
8. **Preise prüfen.** Baukasten, Pakete und die 9.500-€-Schwelle sind aufeinander
   abgestimmt — wer eine Zahl ändert, sollte die anderen mitziehen.
