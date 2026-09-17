<?php
/**
 * Empfänger für das Kontaktformular auf querstrich.de
 *
 * Die Anfrage bleibt auf dem eigenen Server: keine Formulardienste, keine
 * Weitergabe an Dritte, keine Speicherung über den Mailversand hinaus.
 *
 * VOR DEM LIVEGANG ANPASSEN — die vier Werte darunter.
 */

declare(strict_types=1);

// ─── Einstellungen ────────────────────────────────────────────────────
$empfaenger   = 'hallo@querstrich.de';          // wohin die Anfrage geht
$absender     = 'website@querstrich.de';        // Postfach auf DERSELBEN Domain,
                                                //  sonst wirft SPF/DMARC die Mail weg
$seite        = 'https://www.querstrich.de/';   // für die Rückleitung
$mindestdauer = 3;                              // Sekunden; darunter war es ein Bot
$sperrzeit    = 60;                             // Sekunden zwischen zwei Anfragen je Absender
$maxProStunde = 5;                              // Anfragen je Absender und Stunde

// ─── Nur POST ─────────────────────────────────────────────────────────
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Location: ' . $seite . '#kontakt', true, 303);
    exit;
}

function feld(string $name, int $max = 500): string {
    $wert = trim((string)($_POST[$name] ?? ''));
    $wert = str_replace(["\r\n", "\r"], "\n", $wert);
    return mb_substr($wert, 0, $max);
}

function zurueck(string $seite, string $stand): never {
    header('Location: ' . $seite . '?gesendet=' . $stand . '#kontakt', true, 303);
    exit;
}

// ─── Spamabwehr ───────────────────────────────────────────────────────
// 1) Honigtopf: das Feld ist für Menschen unsichtbar und bleibt leer.
if (feld('website') !== '') {
    zurueck($seite, 'ja');   // Bots bekommen Erfolg gemeldet, nichts wird gesendet
}
// 2) Tempo: wer in unter drei Sekunden absendet, hat nicht getippt.
$gestartet = (int)(feld('gestartet') ?: 0);
if ($gestartet > 0 && (microtime(true) * 1000 - $gestartet) < $mindestdauer * 1000) {
    zurueck($seite, 'ja');
}

// ─── Ratenbegrenzung ──────────────────────────────────────────────────
// Ohne Bremse taugt das Skript als Spam-Schleuder gegen das eigene Postfach.
// Gespeichert wird nur ein Zeitstempel je anonymisiertem Absender, keine IP.
$ordner = sys_get_temp_dir() . '/qs-anfragen';
if (!is_dir($ordner)) { @mkdir($ordner, 0700, true); }
if (is_dir($ordner)) {
    // IP wird nur gehasht abgelegt und ist nicht rueckrechenbar
    $kennung = hash('sha256', ($_SERVER['REMOTE_ADDR'] ?? '') . '|' . date('Y-m-d-H'));
    $spur    = $ordner . '/' . $kennung;

    // Alte Spuren aufraeumen, damit der Ordner nicht waechst
    foreach (glob($ordner . '/*') ?: [] as $alt) {
        if (is_file($alt) && filemtime($alt) < time() - 7200) { @unlink($alt); }
    }

    $zeiten = is_file($spur) ? array_filter(explode(',', (string)file_get_contents($spur))) : [];
    $zeiten = array_values(array_filter($zeiten, fn($t) => (int)$t > time() - 3600));

    if ($zeiten && (time() - (int)end($zeiten)) < $sperrzeit) { zurueck($seite, 'zuschnell'); }
    if (count($zeiten) >= $maxProStunde)                      { zurueck($seite, 'zuviele'); }

    $zeiten[] = time();
    @file_put_contents($spur, implode(',', $zeiten), LOCK_EX);
}

// ─── Pflichtfelder ────────────────────────────────────────────────────
$name      = feld('name', 120);
$email     = feld('email', 160);
$nachricht = feld('nachricht', 4000);
$einwilligung = feld('einwilligung', 10) === 'ja';

if ($name === '' || $nachricht === '' || !$einwilligung
    || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    zurueck($seite, 'fehler');
}

// ─── Kopfzeilen-Einschleusung verhindern ──────────────────────────────
// Zeilenumbrüche in Name oder Adresse könnten sonst eigene Header erzeugen.
if (preg_match('/[\r\n]/', $name . $email)) {
    zurueck($seite, 'fehler');
}

$betrieb    = feld('betrieb', 120);
$telefon    = feld('telefon', 40);
$wunschzeit = feld('wunschzeit', 60);
$thema      = feld('thema', 60);

// Herkunft der Anfrage (UTM-Parameter, Klick-IDs, verweisende Seite).
// Kommt aus attribution.js, wird dort schon gefiltert — hier ein
// zweites Mal, weil Eingaben aus dem Browser nie vertrauenswuerdig sind.
$herkunft = preg_replace('/[^\w.\-|=:+% ]/u', '', feld('herkunft', 500));

// ─── Nachricht bauen ──────────────────────────────────────────────────
$zeilen = [
    'Neue Anfrage über querstrich.de',
    str_repeat('=', 40),
    '',
    'Name:        ' . $name,
    'Betrieb:     ' . ($betrieb ?: '—'),
    'E-Mail:      ' . $email,
    'Telefon:     ' . ($telefon ?: '—'),
    'Wunschzeit:  ' . ($wunschzeit ?: '—'),
    'Thema:       ' . ($thema ?: '—'),
    '',
    'Nachricht:',
    str_repeat('-', 40),
    $nachricht,
    str_repeat('-', 40),
    '',
    'Eingegangen: ' . date('d.m.Y, H:i') . ' Uhr',
    'Einwilligung zur Verarbeitung: erteilt',
    'Herkunft:    ' . ($herkunft ?: 'direkt / unbekannt'),
];
$text = implode("\n", $zeilen);

$betreff = '[querstrich] Anfrage von ' . $name . ($thema ? ' — ' . $thema : '');

$header = [
    'From: querstrich Website <' . $absender . '>',
    'Reply-To: ' . $name . ' <' . $email . '>',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
    'X-Mailer: querstrich',
];

$ok = mail(
    $empfaenger,
    '=?UTF-8?B?' . base64_encode($betreff) . '?=',
    $text,
    implode("\r\n", $header),
    '-f' . $absender
);

zurueck($seite, $ok ? 'ja' : 'fehler');
