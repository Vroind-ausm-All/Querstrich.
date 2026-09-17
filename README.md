# querstrich.

> **Quer**verbindung finden. **Strich** ziehen. **Punkt.**

Webauftritt der Einzelagentur **querstrich** — Marke, Website und Technik aus einer Hand.

Kein Build, kein Framework, **keine einzige Verbindung nach außen**. Auf einen Webspace
mit PHP legen, fertig.

**Vorschau:** https://vroind-ausm-all.github.io/Querstrich./

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
  consent.js        Einwilligung, Consent Mode, Werkzeug-Lader
  consent.css       Einwilligungsbanner
  attribution.js    Herkunft der Anfrage, ohne Speicherung
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
| Adressen | `vroind-ausm-all.github.io/Querstrich.` | `www.querstrich.de` |

`.github/workflows/pages.yml` veröffentlicht bei jedem Push auf `main`. Dafür muss unter
**Settings → Pages → Source** einmalig *GitHub Actions* ausgewählt sein.

**Wenn das Repository umbenannt wird**, ändert sich die Pages-Adresse mit — sie besteht
aus Kontoname und Repositoryname. Dieselben Stellen wie beim Domainumzug sind dann
anzupassen; ein `sed -i 's|Querstrich\.|NeuerName|g'` über die unten genannten Dateien
erledigt es in einem Zug.

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
  „cookies & speicherung" jederzeit wieder aufgeht. Sobald in `assets/consent.js` ein
  Werkzeug eingeschaltet wird, das eine Einwilligung braucht, tritt die Hinweisleiste
  zurück und das Banner übernimmt — siehe „Einwilligung, Messung und Werbung".
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

## Typografie

Das System stand vorher nicht — es war gewachsen. Gemessen im Stylesheet:

| | vorher | nachher |
| --- | --- | --- |
| Feste Schriftgrößen in der Oberfläche | 24 | **6** |
| Laufweiten (`letter-spacing`) | 19 | **6** |
| Zeilenabstände | 19 | **7** |
| Schriftbreiten (`font-stretch`) | 12 | **2** |
| Deklarationen in Monospace | 40 | **8** |
| Deklarationen in der Textschrift | 4 | **36** |

Vier Befunde, vier Eingriffe:

**1. Es gab keine Skala.** Zehn verschiedene Größen lagen zwischen 0,58 rem und 0,75 rem —
Unterschiede von einem halben Pixel, die niemand als Absicht liest, aber jeder als Unruhe
sieht. Jetzt eine Stufenleiter von acht Werten (11 px bis 22 px) als Token `--t-3xs` bis
`--t-xl`. Die sechs verbliebenen Festwerte sind Displaygrade: Wortmarke, Paketname,
Preiszahlen.

**2. Die Monospace trug die halbe Oberfläche.** Navigation, Knöpfe, Formularbeschriftungen,
Filter, Preislisten, Fußzeile — alles stand in gesperrter Versal-Schreibmaschine bei 10 px.
Als Akzent gedacht, als Grundton verwendet. Jetzt trägt sie noch acht Stellen, und alle
haben einen Grund: die Abschnittsmarke und Ziffern (Schrittnummern, Fragennummern,
Projektnummern, die Beträge im Baukasten, wo die feste Dickte die Spalte ausrichtet).
Alles, was gelesen und bedient wird, steht in der Textschrift.

**3. Jede Überschriftenebene hatte eine eigene Breite.** Archivo ist eine Variable Font mit
Breitenachse; `.d1` stand auf 84 %, `.d2` auf 86 %, `.d3` auf 90 %, dazu neun weitere Werte
im Rest. Zu wenig Unterschied, um als Absicht zu wirken, zu viel, um wie dieselbe Schrift
auszusehen — der Grund, warum die Überschriften nicht wie Geschwister wirkten. Jetzt ein
Wert: `--breite: 86%`.

**4. Sperrung war Dekor statt Funktion.** Laufweite ist eine Funktion der Schriftgröße:
große Grade brauchen ein Minus, gesperrte Versalien ein Plus. Vorher lagen sieben Varianten
derselben Absicht nebeneinander (.14/.15/.16/.18/.2/.22/.24 em). Jetzt vier Token, an die
Größe gebunden. Zwei Stellen waren schlicht falsch herum — Versalien mit negativer Laufweite;
Großbuchstaben haben keine Unterlängen, die den Abstand optisch füllen.

Nebenbei: Nichts steht mehr unter 11 px (vorher bis 6,4 px), und der Domainname unter den
Projekten steht nicht länger in Versalien — eine umbrechende URL wird dort mit ihrem
Bindestrich zum Lesefehler. Die Mock-ups sind bewusst ausgenommen: Das sind verkleinerte
Bildschirmabbilder, in denen winzige Schrift die Verkleinerung darstellt.

Nachgemessen: axe-core weiterhin **0 Verstöße** auf allen vier Seiten in beiden Ansichten,
CLS **0,0025** (Grenzwert für „gut" ist 0,1), LCP 344 ms.

---

## Schriften lokal einbinden

Die Schriften dieser Seite liegen **bereits lokal** unter `assets/fonts/`. Nachgewiesen
über den Netzwerkmitschnitt des Browsers: 19 Anfragen über alle vier Seiten, davon
**null an fremde Server**. Wer es selbst prüfen will — Entwicklertools, Reiter *Netzwerk*,
Seite neu laden: Es darf dort kein `fonts.googleapis.com` und kein `fonts.gstatic.com`
auftauchen.

### Warum das nötig ist

Bindet man Google Fonts über `<link href="fonts.googleapis.com/…">` ein, baut der **Browser
des Besuchers** eine Verbindung zu Google auf und überträgt dabei dessen IP-Adresse in die
USA. Das LG München I hat das am 20.01.2022 (Az. 3 O 17493/20) als Verstoß gegen das
Persönlichkeitsrecht gewertet und 100 € Schadensersatz zugesprochen. Danach folgte eine
Abmahnwelle. Eine Einwilligung würde das heilen — nur müsste sie vor dem ersten
Seitenaufbau eingeholt werden, was ein Banner erzwingt. Lokal eingebunden entsteht die
Frage gar nicht: Es gibt nichts einzuwilligen.

### So sind sie eingebunden

```
assets/fonts/
  archivo-latin.woff2           Displayschrift, Variable Font
  archivo-latin-ext.woff2
  instrument-sans-latin.woff2   Textschrift
  instrument-sans-latin-ext.woff2
  dm-mono-latin.woff2           Monospace
  dm-mono-latin-ext.woff2
  …                             8 Dateien, 280 KB
```

Im Stylesheet steht je Schnitt ein `@font-face`, das auf die lokale Datei zeigt:

```css
@font-face{
  font-family:'Instrument Sans';
  font-style:normal;
  font-weight:400 600;            /* Variable Font: Bereich statt Einzelwert */
  font-display:swap;
  src:url(assets/fonts/instrument-sans-latin.woff2) format('woff2');
  unicode-range:U+0000-00FF,…;    /* nur Latin — der Rest wird nie geladen */
}
```

### Eine weitere Schrift ergänzen — in fünf Schritten

1. **Lizenz prüfen.** Nur Schriften, deren Lizenz das Hosting auf dem eigenen Server
   erlaubt. Die drei hier verwendeten stehen unter der **SIL Open Font License 1.1** — die
   erlaubt es ausdrücklich. Bei gekauften Schriften steht es in der Webfont-Lizenz; manche
   Foundries verkaufen Desktop- und Webfont-Rechte getrennt.
2. **Als woff2 besorgen.** Bei Google Fonts über *Download family* und anschließend
   konvertieren, oder bequemer über den *google-webfonts-helper*
   (`gwfh.mranftl.com`) — dort Schrift, Schnitte und Zeichensatz wählen und die fertigen
   woff2 mit passendem CSS herunterladen. woff2 reicht; jeder Browser der letzten zehn
   Jahre versteht es, ältere Formate sind nur Ballast.
3. **Nach `assets/fonts/` legen** und das `@font-face` nach obigem Muster ergänzen. Den
   `unicode-range`-Block mitnehmen: Er sorgt dafür, dass der osteuropäische Zeichensatz
   nur geladen wird, wenn er tatsächlich vorkommt.
4. **Prüfen, dass nichts nach außen geht.** Entwicklertools → Netzwerk → Filter `fonts.` —
   die Liste muss leer bleiben. Dieser Schritt fällt am häufigsten aus: Oft bleibt der alte
   `<link>` auf Google stehen, während die lokale Datei schon daneben liegt. Dann lädt die
   Seite beides, und rechtlich hat sich nichts geändert.
5. **Datenschutzerklärung nachziehen.** Abschnitt 7 nennt die Schriften namentlich. Eine
   neue Schrift gehört dort ergänzt.

### Was sonst noch dranhängt

- **`font-display`** steuert, was der Browser zeigt, solange die Schrift lädt. Hier trägt
  die Displayschrift `optional` (sie erscheint entweder sofort oder gar nicht — das
  verhindert den Layoutsprung), die Lesetexte `swap` (Ersatzschrift zuerst, dann Austausch —
  der Text ist nie unsichtbar).
- **Ein `preload`** auf `archivo-latin.woff2`, weil `optional` nur ein kurzes Zeitfenster
  lässt. Wichtig dabei: Schrift-Preloads brauchen zwingend das Attribut `crossorigin`,
  sonst lädt der Browser die Datei ein zweites Mal.
- **Kein CDN.** Auch ein Schrift-CDN ist eine Drittübermittlung. Die Dateien liegen auf
  demselben Server wie die Seite — das ist der ganze Punkt.
- **Cache.** Die `.htaccess` setzt ein Jahr Cache-Dauer auf `assets/fonts/`. Schriftdateien
  ändern sich nicht; ein neuer Dateiname erzwingt bei Bedarf das Neuladen.

---

## Einwilligung, Messung und Werbung

Die Seite ist für Messung vorbereitet, aber **im Auslieferungszustand ist nichts
eingeschaltet**. In `assets/consent.js` steht eine Liste von Werkzeugen mit leeren
Kennungsfeldern. Leer heißt aus. Solange dort nichts steht, setzt die Seite weiterhin keine
Cookies, zeigt kein Banner und lädt nichts von fremden Servern — nachgemessen: null externe
Anfragen. Sobald die erste Kennung eingetragen ist, schaltet die Seite von allein auf das
Einwilligungsbanner um.

### Was eine Einwilligung tatsächlich ändert

Sie hebelt keine Regel aus. Einwilligung ist eine von sechs Rechtsgrundlagen des Art. 6
DSGVO und bringt eigene Bedingungen mit: freiwillig, informiert, vorher, so leicht
widerruflich wie erteilt. Was sie freischaltet, sind **Einbettungen** — und die kosten
dafür an anderer Stelle:

| Bisher nicht möglich | Mit Einwilligung möglich | Preis |
| --- | --- | --- |
| Video im Layout | YouTube/Vimeo direkt eingebettet | Banner vor dem ersten Bild |
| Karte zum Standort | Google Maps interaktiv | dito |
| Terminbuchung auf der Seite | Calendly, Cal.com eingebettet | dito |
| Instagram-Feed | Feed-Widget | dito |
| Live-Chat | Chat-Widget | dito |

Alle fünf gehen **auch ohne** Einwilligung, nur anders gebaut: Vorschaubild mit
Klick-zum-Laden (die sogenannte Zwei-Klick-Lösung), statische Karte mit Link, Link statt
Einbettung. Das ist ein bis zwei Klicks unbequemer und gestalterisch kein Verlust.

Und der Punkt, der in der Frage steckt: **Ein Einwilligungsbanner macht das Design nicht
schöner, sondern schlechter.** Es ist das Erste, was jeder Besucher sieht, es verdeckt den
Einstieg, und es kostet erfahrungsgemäß einen guten Teil der Besucher, bevor sie die erste
Zeile gelesen haben. Gewonnen wird nicht Gestaltung, sondern **Daten**. Das ist ein
legitimer Tausch — aber er läuft in die andere Richtung als die Frage vermutet.

### Dunkle Muster sind nicht eingebaut, und das ist eine Entscheidung

Im Banner stehen „Nur notwendige" und „Alle annehmen" gleich groß, gleich kontrastreich und
nebeneinander. Das ist kein Übereifer. Eine Einwilligung, die durch Gestaltung erschlichen
wurde, ist nach Art. 4 Nr. 11 und Art. 7 DSGVO keine wirksame Einwilligung — und damit ist
auch die Verarbeitung rechtswidrig, die darauf aufbaut. Die EDSA-Leitlinien 03/2022 zu
irreführenden Gestaltungsmustern beschreiben genau die Variante mit dem blassen
Ablehnen-Link. Praktisch heißt das: Wer sich die Zustimmungsquote hochgestaltet, baut seine
Auswertung auf Daten, die im Streitfall nicht tragen. Für eine Agenturseite, die
Handwerkskunst verkauft, wäre das zudem die falsche Visitenkarte.

### Aufbau

```
assets/consent.js       Einwilligung, Consent Mode, Werkzeug-Lader
assets/consent.css      Banner (nutzt die Token der Seite)
assets/attribution.js   Herkunft der Anfrage, ohne Speicherung
```

Der Ablauf bei jedem Seitenaufruf:

1. `consent.js` setzt **Google Consent Mode v2** auf „alles verweigert" — vor allem
   anderen. Seit März 2024 Pflicht für Ads und GA4 im EWR; ohne diese Vorgabe wertet Google
   den ersten Aufruf als fehlende Einwilligung und modelliert nicht nach.
2. Es prüft, ob überhaupt eine Kennung eingetragen ist, die eine Einwilligung braucht.
   Wenn nein: kein Banner, der bisherige ehrliche Hinweis bleibt stehen.
3. Wenn ja: Banner. Vorher lädt **nichts**.
4. Nach der Entscheidung wird der Consent Mode aktualisiert, die freigegebenen Werkzeuge
   werden nachgeladen, und die Wahl wird mit Zeitpunkt und Fassungsnummer abgelegt
   (Nachweispflicht, Art. 7 Abs. 1 DSGVO).
5. Widerruf über „cookies & speicherung" in der Fußzeile — derselbe Knopf wie bisher.

Wer ein Werkzeug ergänzt oder entfernt, zählt `FASSUNG` in `consent.js` hoch. Dann wird
jeder Besucher neu gefragt, statt auf einer Einwilligung zu sitzen, die etwas anderes meinte.

### Ein Werkzeug einschalten — drei Schritte

1. **Kennung eintragen** in `assets/consent.js`, Abschnitt 1.
2. **CSP erweitern.** Die Richtlinie erlaubt nichts von außen. Über dem
   `Content-Security-Policy`-Block in `index.html` steht die vollständige Liste, welche
   Zeile welches Werkzeug braucht; dieselbe Änderung gehört in die `.htaccess` und die drei
   anderen HTML-Seiten. **Das ist der Schritt, der übersehen wird:** Der Browser blockiert
   sonst lautlos. In der Konsole steht es, im Analytics-Konto kommen einfach keine Daten an
   — und man sucht die Ursache tagelang beim Tag.
3. **Datenschutzerklärung aktivieren.** Abschnitt 5 ist vorbereitet, aber mit einem
   Warnkasten versehen. Absatz prüfen, nicht genutzte Dienste streichen, Kasten entfernen.

Nachgemessen mit Testkennungen für GTM, GA4, Meta und Plausible:

| Zustand | Fremde Anfragen | Consent Mode |
| --- | --- | --- |
| vor der Entscheidung | keine (alles von der CSP blockiert) | `default`: alles `denied` |
| „Nur notwendige" | keine | `update`: alles `denied` |
| „Alle annehmen" | GTM, GA4, Meta angefordert | `update`: alles `granted` |

### Zur Liste der Werkzeuge

**Plausible oder Matomo — die eigentliche Empfehlung.** Beide setzen richtig konfiguriert
keine Cookies und lesen nichts vom Gerät. Damit greift § 25 TDDDG nicht, und sie dürfen
**ohne** Einwilligung laufen. Das ist der Grund, sie zu wählen: Sie messen *alle* Besucher,
während GA4 nur die misst, die zugestimmt haben — je nach Seite ein Drittel bis die Hälfte.
Für die Frage „welche Inhalte werden gelesen, woher kommen die Leute" sind sie damit
**genauer** als GA4, nicht ungenauer. In `consent.js` steht bei beiden
`ohneEinwilligung: true`; wer strenger fahren will, setzt es auf `false`.

**GA4** lohnt sich, wenn Google-Ads-Kampagnen laufen — dort ist die Verzahnung der Grund,
nicht die Analyse. Ohne Anzeigen bringt GA4 gegenüber Plausible vor allem Komplexität.

**Microsoft Clarity** zeichnet Sitzungen auf, inklusive Mausbewegung und Scrollverhalten.
Das ist die datenintensivste Position der ganzen Liste. Im Clarity-Konto muss die Maskierung
zusätzlich auf **„Mask all"** stehen — die Voreinstellung maskiert weniger, und dann landen
Formulareingaben in der Aufzeichnung. Empfehlung: befristet einschalten, Frage beantworten,
wieder ausschalten. Ein dauerhaft mitlaufender Session-Recorder auf einer Seite mit fünf
Unterseiten steht in keinem Verhältnis.

**Meta Conversions API, HubSpot, Pipedrive, Brevo-Automationen** sind **keine Website-Skripte**,
sondern serverseitige Anbindungen. Sie brauchen einen Server, der Ereignisse
entgegennimmt, Zugangsdaten verwahrt und weiterleitet — auf einer statischen Seite gibt es
den nicht. Der Pixel und der Brevo-Tracker sind eingebaut; die API-Hälfte ist ein eigenes
Projekt. Wichtig dabei: Die Conversions API darf die Einwilligung **nicht umgehen**. Wer
serverseitig sendet, was der Besucher im Banner abgelehnt hat, verstößt genauso — das
Einwilligungssignal muss mitgereicht werden.

**Google Search Console und Bing Webmaster Tools** brauchen gar nichts davon. Sie messen
nichts auf der Seite, sondern lesen aus dem Index. Der Nachweis läuft über einen
DNS-Eintrag oder eine Datei — kein Skript, kein Cookie, keine Einwilligung. **Das sind die
beiden, die sofort und ohne jede Nebenwirkung eingerichtet gehören.** Die `sitemap.xml`
liegt bereit.

**A/B-Tests (GrowthBook, VWO, Optimizely)** sind für eine Seite mit dieser Besucherzahl
verfrüht. Ein belastbarer Test braucht je Variante einige hundert Conversions; bei einer
Handvoll Anfragen im Monat dauert das Jahre, und was vorher herauskommt, ist Rauschen. Die
ehrlichere Reihenfolge: erst messen, was überhaupt passiert, dann testen.

### Consent-Werkzeug: eigenes oder Usercentrics?

Eingebaut ist ein eigenes, weil es für diese Seite schlicht besser passt:

| | eingebaut | Usercentrics |
| --- | --- | --- |
| Kosten | keine | ab rund 50 €/Monat für die brauchbaren Stufen |
| Externe Verbindung vor der Einwilligung | keine | lädt vom eigenen CDN |
| Gestaltung | die Token der Seite | Baukasten, nur teilweise anpassbar |
| Ladezeit | rund 12 KB | deutlich mehr |
| Nachweisprotokoll | lokal im Browser | serverseitig, revisionssicher |
| Pflege der Dienstebeschreibungen | von Hand | automatisch gepflegt |

Die letzten beiden Zeilen sind das Argument für Usercentrics, und sie zählen ab dem Moment,
in dem viele Dienste laufen oder jemand einen Nachweis verlangt. Für eine Seite mit
Plausible und vielleicht Google Ads ist das eingebaute die richtige Wahl. Der Tausch ist
später eine überschaubare Sache: Die Ereignisschnittstelle (`qs:consent`, `window.qsConsent`)
bleibt, nur die Oberfläche wird ersetzt.

### Herkunft einer Anfrage — ohne Einwilligung

`attribution.js` liest UTM-Parameter und Klick-Kennungen (`gclid`, `fbclid`, `msclkid` …)
aus der Adresszeile, dazu die verweisende Seite, und legt sie in ein verborgenes Feld des
Kontaktformulars. In der Anfrage-Mail steht damit, welche Kampagne sie gebracht hat.

Der entscheidende Punkt ist, was dabei **nicht** passiert: Es wird nichts auf dem Gerät
abgelegt — kein Cookie, kein `localStorage`, kein `sessionStorage`. § 25 TDDDG regelt den
Zugriff auf das Endgerät; findet keiner statt, ist auch keine Einwilligung nötig. Die
Angaben leben im Seitenspeicher und reisen mit dem Formular mit.

Der Preis: Die Herkunft überlebt keinen Seitenwechsel. Wer über eine Anzeige kommt, zur
Datenschutzerklärung abbiegt und erst danach absendet, erscheint als Direktzugriff. Auf
einer einseitigen Website ist das der seltene Fall — und ihn zu schließen kostet
`sessionStorage` und damit genau die Einwilligung, die man gerade vermieden hat.

### Empfohlene Reihenfolge

1. **Sofort, ohne Nebenwirkung:** Search Console, Bing Webmaster Tools, Plausible oder
   Matomo. Damit läuft die Messung ab Tag eins und über alle Besucher.
2. **Wenn Anzeigen starten:** GTM, Google Ads Conversion Tracking, GA4. Ab hier braucht es
   das Banner — vorher nicht.
3. **Wenn genug Verkehr da ist:** Clarity befristet für eine konkrete Frage.
4. **Zuletzt, wenn Volumen da ist:** CRM-Anbindung, Conversions API, A/B-Tests.

Der Fehler, den die meisten machen, ist Stufe 2 vor Stufe 1 — Banner und Datenverlust
einkaufen, bevor überhaupt etwas zu messen ist.

---

## Anbieterkennzeichnung und Schutz vor Absammlern

Eingetragen sind Vasco Rieker, Mönchstraße 5, 70191 Stuttgart — im Impressum (§ 5 DDG) und
als Verantwortlicher in der Datenschutzerklärung. Daraus ergibt sich die zuständige
Aufsichtsbehörde: der Landesbeauftragte für den Datenschutz und die Informationsfreiheit
Baden-Württemberg, Lautenschlagerstraße 20, 70173 Stuttgart.

### Wo Verschleierung wirkt — und wo sie schadet

Die beiden Angaben sind unterschiedlich zu behandeln, weil sie unterschiedlich bedroht und
unterschiedlich geschützt sind.

**Die E-Mail-Adresse ist verschleiert.** Im ausgelieferten Quelltext steht kein einziges
`hallo@querstrich.de` und kein einziges `href="mailto:"` — nachgemessen über alle vier
Seiten. Die Adresse liegt in zwei Attributen und wird erst im Browser zusammengesetzt.
Sichtbar steht im HTML `hallo(at)querstrich.de`: Ohne JavaScript liest ein Mensch sie und
kann sie abtippen, ein Screenreader liest sie vor, und § 5 DDG ist gewahrt — die Angabe ist
ständig verfügbar. Mit JavaScript entsteht ein normaler klickbarer Link, samt der
vorausgefüllten Mails aus Baukasten und Bilanz.

**Die Anschrift steht im Klartext, und das ist Absicht.** Sie zu verstecken wäre der Fehler,
den die Frage nahelegt:

- **JavaScript-only oder als Bild** — dann fehlt sie ohne JavaScript ganz. Genau das
  verlangt § 5 DDG aber: leicht erkennbar, unmittelbar erreichbar, ständig verfügbar. Eine
  Anbieterkennzeichnung, die an einer Browsereinstellung hängt, erfüllt das nicht, und ein
  unvollständiges Impressum ist eine Ordnungswidrigkeit und abmahnfähig.
- **CSS-Tricks** (Zeichen umdrehen, in Fragmente zerlegen) — der Text steht trotzdem im
  DOM. Wer ihn absammeln will, liest ihn. Das kostet Barrierefreiheit und bringt nichts.

Dazu kommt: Das reale Absammeln zielt auf E-Mail-Adressen, nicht auf Postanschriften. Der
Aufwand, sich für die Anschrift ein rechtliches Risiko einzuhandeln, steht in keinem
Verhältnis zum Gewinn.

### Was stattdessen wirkt

Drei Maßnahmen, die die Anschrift aus den Datenbanken halten, ohne die Pflicht zu verletzen:

1. **Kein Suchindex.** `impressum.html` trägt `noindex, follow` im Kopf und zusätzlich
   `X-Robots-Tag: noindex, follow, noarchive, nosnippet` aus der `.htaccess`. Die Seite ist
   auf der Website erreichbar, taucht aber nicht in Suchergebnissen auf — und über
   Suchmaschinen laufen die meisten Adress-Aggregatoren.
   Wichtig dabei: Das Impressum ist **nicht** per `robots.txt` gesperrt, obwohl das
   naheliegt. Wer es sperrt, verhindert, dass der Crawler das `noindex` überhaupt liest;
   die URL landet dann nackt im Index und geht nicht mehr heraus. Crawlen erlaubt,
   indexieren verboten — in dieser Reihenfolge.
   Aus demselben Grund steht das Impressum nicht mehr in der `sitemap.xml`: Eine Seite
   anzumelden und gleichzeitig auf `noindex` zu setzen, sind widersprüchliche Signale.
2. **Keine strukturierten Daten zur Person.** Aus dem JSON-LD sind `address`, `telephone`
   und `email` entfernt. Das war die maschinenlesbarste Form der Angaben überhaupt — ein
   `PostalAddress`-Block ist für einen Aggregator geschenkt.
3. **Absammler abgewiesen.** Die `.htaccess` weist bekannte Harvester und Datenbank-Crawler
   ab (EmailCollector, ExtractorPro, HTTrack, MJ12bot, AhrefsBot, SemrushBot, DataForSeoBot
   …); die `robots.txt` sperrt zusätzlich die KI-Crawler (GPTBot, CCBot, ClaudeBot,
   Google-Extended, PerplexityBot, Bytespider …). Suchmaschinen sind bewusst **nicht**
   dabei — die Seite soll gefunden werden.

### Der Preis, den Punkt 2 kostet

Ein gefüllter `PostalAddress`-Block im JSON-LD ist eines der stärksten Signale für lokale
Suchergebnisse — „Webdesign Stuttgart" und Ähnliches. Den gibt die Seite jetzt bewusst nicht
mehr ab. Als Ausgleich steht im JSON-LD `areaServed: Stuttgart`, was ortsbezogen wirkt, ohne
eine Anschrift zu veröffentlichen.

Der saubere Weg, beides zu bekommen: **ein Google-Unternehmensprofil**. Dort hinterlegt man
die Anschrift zur Verifizierung und stellt das Profil als *Dienstleistung vor Ort* ein —
dann prüft Google die Adresse, zeigt sie aber öffentlich nicht an. Lokale Sichtbarkeit ohne
veröffentlichte Anschrift, und die Website bleibt außen vor. Für ein Einzelunternehmen im
Homeoffice ist das ohnehin die richtige Einstellung.

Wer die Local-SEO-Wirkung doch auf der Seite haben will, sagt Bescheid — der JSON-LD-Block
ist in zwei Minuten wieder drin.

### Nachgemessen

| | Ergebnis |
| --- | --- |
| `hallo@querstrich.de` im Quelltext, alle vier Seiten | **0×** |
| `href="mailto:"` im Quelltext | **0×** |
| Adresse ohne JavaScript lesbar | **ja** (`hallo(at)querstrich.de`) |
| Klickbare `mailto:`-Links mit JavaScript | ja, inklusive der vorausgefüllten Mails |
| Anschrift ohne JavaScript im Impressum | **ja** |
| Kontaktfelder im JSON-LD | keine |
| axe-core | weiterhin 0 Verstöße auf allen vier Seiten |

Zur Ehrlichkeit gehört die Grenze: Ein Absammler, der die Seite in einem echten Browser
rendert, sieht die E-Mail-Adresse. Das lässt sich nicht verhindern, solange ein Mensch sie
auch sehen soll. Gegen die große Mehrheit, die nur den Quelltext durchsucht, wirkt es.

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
5. **Verbliebene Platzhalter ersetzen.** Name, Anschrift und Aufsichtsbehörde stehen;
   offen sind noch Telefonnummer, Umsatzsteuer-Angabe beziehungsweise Kleinunternehmer-Hinweis,
   Hoster mit Anschrift und Serverstandort, die Löschfristen (Server-Protokolle, Anfragen),
   das Stand-Datum, `[Vorname]` und das Porträtfoto.
6. **Portfolioseite füllen.** `arbeiten.html` ist bislang ein Gerüst, damit der Link
   unter dem Portfolio nicht ins Leere führt.
7. Die Ergebniszeilen der Projekte beschreiben, **was gebaut wurde** — keine erfundenen
   Kennzahlen. Sobald echte Zahlen vorliegen, gehören sie an diese Stelle.
8. **Preise prüfen.** Baukasten, Pakete und die 9.500-€-Schwelle sind aufeinander
   abgestimmt — wer eine Zahl ändert, sollte die anderen mitziehen.
