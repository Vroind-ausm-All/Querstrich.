/* ════════════════════════════════════════════════════════════════════
   Der wandernde Lichtschein
   ────────────────────────────────────────────────────────────────────
   Am Rechner folgt ein weicher warmer Schein dem Mauszeiger, traege
   nachlaufend statt klebend — das wirkt wie Licht, nicht wie ein
   angehefteter Punkt.

   Auf dem Telefon gibt es keinen Zeiger. Dort uebernimmt das Scrollen:
   Der Schein wandert mit dem Fortschritt der Seite quer durchs Bild und
   reagiert zusaetzlich auf das Tempo — schnelles Wischen zieht ihn
   weiter aus, beim Anhalten sinkt er zurueck. So ist der Effekt auch
   ohne Maus sichtbar und beantwortet eine Eingabe.

   Bewegt wird ausschliesslich per transform, also auf der Grafikkarte.
   Kein Layout, kein Neuzeichnen des Textes, damit nichts ruckelt und
   der Layoutsprung bei null bleibt.
   ════════════════════════════════════════════════════════════════════ */
(function(){
'use strict';

var el = document.getElementById('licht');
if(!el) return;

var ruhig = window.matchMedia('(prefers-reduced-motion: reduce)');
var zeiger = window.matchMedia('(pointer: fine)');

/* Ziel- und Istwerte. Die Differenz wird je Bild anteilig abgebaut —
   daraus entsteht das Nachlaufen. */
var zielX, zielY, istX, istY, laeuft = false, ruht = 0;

function start(){
  zielX = istX = window.innerWidth  * 0.5;
  zielY = istY = window.innerHeight * 0.42;
  setzen();
  el.classList.add('da');
}

function setzen(){
  el.style.transform = 'translate3d(' + istX.toFixed(1) + 'px,' + istY.toFixed(1) + 'px,0)';
}

function takt(){
  var dx = zielX - istX, dy = zielY - istY;
  istX += dx * 0.075;
  istY += dy * 0.075;
  setzen();

  /* Anhalten, sobald nichts mehr nachzuholen ist — ein Dauerlauf im
     Leerlauf kostet auf dem Telefon spuerbar Akku. */
  if(Math.abs(dx) < 0.4 && Math.abs(dy) < 0.4){
    if(++ruht > 12){ laeuft = false; return; }
  }else{ ruht = 0; }
  requestAnimationFrame(takt);
}

function anstossen(){
  if(laeuft) return;
  laeuft = true; ruht = 0;
  requestAnimationFrame(takt);
}

/* ── Rechner: dem Zeiger folgen ──────────────────────────────────── */
function zeigerModus(){
  window.addEventListener('pointermove', function(e){
    if(e.pointerType === 'touch') return;      // Finger steuert ueber das Scrollen
    zielX = e.clientX; zielY = e.clientY;
    anstossen();
  }, {passive:true});
}

/* ── Telefon: dem Scrollen folgen ────────────────────────────────── */
function scrollModus(){
  var letztes = window.scrollY, tempo = 0;

  function ausScroll(){
    var y = window.scrollY;
    var hoehe = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    var anteil = Math.min(1, Math.max(0, y / hoehe));

    /* Quer: eine ruhige Welle ueber die gesamte Seitenlaenge, damit der
       Schein nicht stur in der Mitte klebt. */
    zielX = window.innerWidth * (0.5 + 0.34 * Math.sin(anteil * Math.PI * 2.4));

    /* Hoch/runter: das Tempo zieht ihn aus der Ruhelage. Gedaempft,
       sonst springt er bei jedem Wisch ans Bildende. */
    tempo = tempo * 0.8 + (y - letztes) * 0.2;
    letztes = y;
    var ausschlag = Math.max(-0.22, Math.min(0.22, tempo / 90));
    zielY = window.innerHeight * (0.45 + ausschlag);

    anstossen();
  }

  window.addEventListener('scroll', ausScroll, {passive:true});
  ausScroll();
}

function aufbauen(){
  start();
  if(ruhig.matches) return;            // Schein bleibt, Bewegung nicht
  if(zeiger.matches) zeigerModus();
  scrollModus();                       // auch am Rechner: Scrollen bewegt mit
}

window.addEventListener('resize', function(){
  zielX = Math.min(zielX, window.innerWidth);
  zielY = Math.min(zielY, window.innerHeight);
  anstossen();
}, {passive:true});

if(document.readyState === 'loading')
  document.addEventListener('DOMContentLoaded', aufbauen);
else aufbauen();

})();
