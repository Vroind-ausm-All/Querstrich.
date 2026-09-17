/* ════════════════════════════════════════════════════════════════════
   E-Mail-Adressen gegen automatisches Absammeln
   ────────────────────────────────────────────────────────────────────
   Harvester durchsuchen den ausgelieferten Quelltext nach dem Muster
   "etwas@etwas.tld" und nach href="mailto:…". Beides steht hier nicht
   drin: Die Adresse liegt in zwei Attributen und wird erst im Browser
   zusammengesetzt.

   Was dabei NICHT passiert — und das ist die Bedingung, unter der das
   ueberhaupt zulaessig ist: Die Adresse verschwindet nicht. Im HTML
   steht sie als "hallo(at)querstrich.de" sichtbar da. Wer kein
   JavaScript hat, liest sie und kann sie abtippen; ein Screenreader
   liest sie vor. § 5 DDG verlangt, dass die Angaben "unmittelbar
   erreichbar und staendig verfuegbar" sind — eine Adresse, die ohne
   JavaScript ganz fehlt, waere das nicht. Diese hier ist es.

   Die Wirkung ist Abschreckung, keine Sicherheit: Ein Harvester, der
   die Seite in einem echten Browser rendert, sieht die Adresse. Gegen
   die grosse Mehrheit der Sammler, die nur den Quelltext durchsuchen,
   wirkt es.
   ════════════════════════════════════════════════════════════════════ */
(function(){
'use strict';

function aufloesen(){
  var stellen = document.querySelectorAll('.mailto[data-b][data-h]');
  for(var i=0; i<stellen.length; i++){
    var el = stellen[i];
    var adresse = el.getAttribute('data-b') + String.fromCharCode(64) + el.getAttribute('data-h');

    var a = document.createElement('a');
    a.href = 'mailto:' + adresse + (el.getAttribute('data-q') || '');
    a.textContent = el.getAttribute('data-text') || adresse;
    a.className = el.className.replace(/\bmailto\b/, '').trim();

    el.parentNode.replaceChild(a, el);
  }
}

if(document.readyState === 'loading')
  document.addEventListener('DOMContentLoaded', aufloesen);
else aufloesen();

})();
