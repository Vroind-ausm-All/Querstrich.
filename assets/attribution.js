/* ════════════════════════════════════════════════════════════════════
   Herkunft einer Anfrage — ohne Speicherung, ohne Einwilligung
   ────────────────────────────────────────────────────────────────────
   Wer über eine Anzeige kommt, trägt die Kampagne in der Adresszeile
   mit sich: ?utm_source=google&utm_campaign=… Dieses Skript liest sie
   dort aus und legt sie in verborgene Felder des Kontaktformulars.
   Damit steht in jeder Anfrage-Mail, woher sie kam.

   Entscheidend ist, was hier NICHT passiert: Es wird nichts im Gerät
   abgelegt — kein Cookie, kein localStorage, kein sessionStorage.
   § 25 TDDDG regelt den Zugriff auf das Endgerät; findet kein Zugriff
   statt, greift die Vorschrift nicht und es ist keine Einwilligung
   nötig. Die Angaben entstehen im Seitenspeicher, reisen mit dem
   abgeschickten Formular mit und sind danach weg.

   Der Preis dieser Bauweise: Die Herkunft überlebt keinen Seiten-
   wechsel. Wer über eine Anzeige kommt, zur Datenschutzerklärung
   abbiegt und erst danach das Formular abschickt, erscheint als
   Direktzugriff. Auf einer einseitigen Website ist das der seltene
   Fall. Wer ihn schließen will, braucht sessionStorage — und damit
   die Einwilligung, die er gerade vermeiden wollte.
   ════════════════════════════════════════════════════════════════════ */
(function(){
'use strict';

var FORMULAR = 'kontaktFormular';
var FELDER = ['utm_source','utm_medium','utm_campaign','utm_term','utm_content',
              'gclid','wbraid','gbraid','fbclid','msclkid','li_fat_id'];

function saeubern(wert){
  // Nur was eine Kampagnenkennung sein kann. Alles andere fliegt raus,
  // damit ueber die Adresszeile nichts in die Mail geschleust wird.
  return String(wert || '').replace(/[^\w.\-|:+% ]/g, '').slice(0, 120);
}

function herkunft(){
  var p = new URLSearchParams(location.search);
  var daten = {};
  FELDER.forEach(function(f){
    var v = p.get(f);
    if(v) daten[f] = saeubern(v);
  });

  // Verweisende Seite, sofern sie von aussen kommt.
  try{
    if(document.referrer){
      var r = new URL(document.referrer);
      if(r.hostname !== location.hostname) daten.verweis = saeubern(r.hostname + r.pathname);
    }
  }catch(e){}

  // Einstiegsseite — sagt, welcher Inhalt die Anfrage getragen hat.
  daten.einstieg = saeubern(location.pathname + location.hash);

  return daten;
}

function eintragen(){
  var form = document.getElementById(FORMULAR);
  if(!form) return;

  var daten = herkunft();
  var zeilen = [];
  Object.keys(daten).forEach(function(k){
    if(!daten[k]) return;
    zeilen.push(k + '=' + daten[k]);
  });
  if(!zeilen.length) return;

  // Ein Feld statt zwölf: die Mail bleibt lesbar, kontakt.php muss
  // nur einen Wert kennen.
  var feld = document.createElement('input');
  feld.type = 'hidden';
  feld.name = 'herkunft';
  feld.value = zeilen.join(' | ').slice(0, 500);
  form.appendChild(feld);
}

if(document.readyState === 'loading')
  document.addEventListener('DOMContentLoaded', eintragen);
else eintragen();

})();
