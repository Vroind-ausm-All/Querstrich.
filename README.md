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
