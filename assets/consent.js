/* ════════════════════════════════════════════════════════════════════
   Einwilligungsverwaltung für querstrich
   ────────────────────────────────────────────────────────────────────
   Eine Regel bestimmt alles hier: Vor der Einwilligung passiert nichts.
   Kein Script eines Dritten, kein Cookie, keine Verbindung nach außen.
   Erst die Entscheidung des Besuchers schaltet frei, was er freigibt.

   Der Datenspeicher unten ist ABSICHTLICH LEER. Solange dort keine
   Kennung steht, ist kein Werkzeug aktiv — und dann setzt die Seite
   weiterhin keine Cookies. In diesem Zustand zeigt sie den bisherigen
   Hinweis statt eines Einwilligungsbanners, weil es nichts einzuwilligen
   gibt. Sobald die erste Kennung eingetragen ist, schaltet sie von
   allein auf das Banner um.

   Aufbau:
     1  WERKZEUGE      — die Kennungen, hier einzutragen
     2  KATEGORIEN     — was wozu gehört
     3  CONSENT MODE   — Googles Signalisierung, vor allem anderen
     4  SPEICHER       — Entscheidung merken und nachweisen
     5  LADEN          — Werkzeuge nach Freigabe starten
     6  OBERFLÄCHE     — Banner und Einstellungen
     7  START
   ════════════════════════════════════════════════════════════════════ */
(function(){
'use strict';

/* ═══ 1 — WERKZEUGE ═══════════════════════════════════════════════════
   Kennung eintragen = Werkzeug aktiv. Feld leer lassen = Werkzeug aus.
   Nichts hier ist voreingestellt; jede Zeile ist eine bewusste
   Entscheidung mit Folgen für die Datenschutzerklärung.            */
var WERKZEUGE = {

  /* ── Messung ohne Zugriff auf das Gerät ──────────────────────────
     Plausible und ein richtig konfiguriertes Matomo setzen keine
     Cookies und lesen nichts vom Gerät. Damit greift § 25 TDDDG
     nicht — die Einwilligungspflicht für Gerätezugriff entfällt.
     Die Verarbeitung der (gekürzten) IP braucht trotzdem eine
     Rechtsgrundlage; hier Art. 6 Abs. 1 lit. f DSGVO, berechtigtes
     Interesse an Reichweitenmessung. Genau dafür wählt man diese
     Werkzeuge. Wer ganz sicher gehen will, setzt unten
     ohneEinwilligung auf false — dann laufen auch sie erst nach
     Zustimmung, und die Daten werden entsprechend lückenhaft.      */
  plausible: { domain:'',  quelle:'https://plausible.io/js/script.js', ohneEinwilligung:true },
  matomo:    { url:'',     seitenId:'',                               ohneEinwilligung:true },

  /* ── Nur nach Einwilligung ───────────────────────────────────────
     Ist eine GTM-Kennung gesetzt, übernimmt der Tag Manager das
     Ausspielen. Die Einzelkennungen darunter bleiben dann leer —
     sonst laden die Tags doppelt.                                  */
  gtm:       { id:'' },   // GTM-XXXXXXX
  ga4:       { id:'' },   // G-XXXXXXXXXX   (nur ohne GTM eintragen)
  ads:       { id:'' },   // AW-XXXXXXXXX
  clarity:   { id:'' },   // Microsoft Clarity
  metaPixel: { id:'' },   // Meta/Facebook
  linkedin:  { id:'' },   // LinkedIn Insight Tag
  brevo:     { id:'' },   // Brevo Conversations/Tracker
  hubspot:   { id:'' }    // HubSpot Portal-ID
};

/* ═══ 2 — KATEGORIEN ═════════════════════════════════════════════════ */
var KATEGORIEN = {
  notwendig: {
    name:'Notwendig',
    text:'Hält die gewählte Ansicht fest und schützt das Kontaktformular vor Missbrauch. Ohne diese Funktionen arbeitet die Seite nicht richtig. Sie sind nach § 25 Abs. 2 Nr. 2 TDDDG einwilligungsfrei.',
    pflicht:true
  },
  statistik: {
    name:'Statistik',
    text:'Zeigt mir, welche Seiten gelesen werden und worüber Besucher kommen. Daraus verbessere ich die Seite — keine Werbung, keine Weitergabe an Werbenetzwerke.',
    werkzeuge:['ga4','clarity']
  },
  marketing: {
    name:'Marketing',
    text:'Misst, welche Anzeige zu einer Anfrage geführt hat, und erlaubt es, Ihnen später Anzeigen zu zeigen. Diese Daten gehen an Google, Meta und LinkedIn — auch in die USA.',
    werkzeuge:['ads','metaPixel','linkedin']
  }
};
/* GTM steuert je nach eingehängten Tags beides und wird deshalb erst
   freigegeben, wenn mindestens eine der beiden Kategorien steht. */

var FASSUNG = 1;                 // hochzählen, wenn sich Werkzeuge ändern
var SCHLUESSEL = 'qs-consent';

/* ═══ 3 — GOOGLE CONSENT MODE v2 ═════════════════════════════════════
   Muss stehen, BEVOR irgendein Google-Tag lädt, sonst wertet Google
   den ersten Aufruf als fehlende Einwilligung und die Modellierung
   greift nicht. Seit März 2024 Pflicht für Ads und GA4 im EWR.      */
window.dataLayer = window.dataLayer || [];
function gtag(){ window.dataLayer.push(arguments); }
window.gtag = window.gtag || gtag;

gtag('consent','default',{
  ad_storage:'denied', ad_user_data:'denied', ad_personalization:'denied',
  analytics_storage:'denied', functionality_storage:'denied',
  personalization_storage:'denied', security_storage:'granted',
  wait_for_update: 500
});

function consentModeMelden(stand){
  gtag('consent','update',{
    ad_storage:            stand.marketing ? 'granted':'denied',
    ad_user_data:          stand.marketing ? 'granted':'denied',
    ad_personalization:    stand.marketing ? 'granted':'denied',
    analytics_storage:     stand.statistik ? 'granted':'denied',
    functionality_storage: 'granted',
    personalization_storage: stand.statistik ? 'granted':'denied'
  });
}

/* ═══ 4 — SPEICHER ═══════════════════════════════════════════════════
   Art. 7 Abs. 1 DSGVO verlangt, die Einwilligung nachweisen zu können.
   Gespeichert werden deshalb Zeitpunkt, Fassung und die genaue Wahl.
   Das liegt im Browser des Besuchers — ein serverseitiges Protokoll
   wäre belastbarer, verlangt aber wiederum eine Speicherung bei mir.
   Für eine Seite dieser Größe ist die lokale Ablage der übliche Weg;
   wer es strenger braucht, nimmt ein zertifiziertes CMP (siehe
   README, Abschnitt "Einwilligung").                                */
function lesen(){
  try{
    var roh = localStorage.getItem(SCHLUESSEL);
    if(!roh) return null;
    var d = JSON.parse(roh);
    if(d.fassung !== FASSUNG) return null;   // neue Werkzeuge: neu fragen
    return d;
  }catch(e){ return null; }
}
function schreiben(stand){
  var d = {
    fassung: FASSUNG,
    zeitpunkt: new Date().toISOString(),
    statistik: !!stand.statistik,
    marketing: !!stand.marketing
  };
  try{ localStorage.setItem(SCHLUESSEL, JSON.stringify(d)); }catch(e){}
  return d;
}

/* ═══ 5 — LADEN ══════════════════════════════════════════════════════ */
function script(quelle, attribute){
  var s = document.createElement('script');
  s.src = quelle; s.async = true;
  if(attribute) for(var k in attribute) s.setAttribute(k, attribute[k]);
  document.head.appendChild(s);
  return s;
}
function gesetzt(w){ return !!(w && (w.id || w.domain || w.url)); }

var geladen = {};
function einmal(name, fn){ if(geladen[name]) return; geladen[name] = true; fn(); }

function werkzeugeStarten(stand){
  var W = WERKZEUGE;

  /* Messung ohne Gerätezugriff — unabhängig von der Einwilligung,
     sofern oben so eingestellt. */
  if(gesetzt(W.plausible) && (W.plausible.ohneEinwilligung || stand.statistik))
    einmal('plausible', function(){
      script(W.plausible.quelle, {'data-domain': W.plausible.domain, defer:''});
    });

  if(gesetzt(W.matomo) && (W.matomo.ohneEinwilligung || stand.statistik))
    einmal('matomo', function(){
      window._paq = window._paq || [];
      window._paq.push(['disableCookies']);      // ohne das braucht Matomo Einwilligung
      window._paq.push(['trackPageView']);
      window._paq.push(['enableLinkTracking']);
      window._paq.push(['setTrackerUrl', W.matomo.url + 'matomo.php']);
      window._paq.push(['setSiteId', W.matomo.seitenId]);
      script(W.matomo.url + 'matomo.js');
    });

  /* Ab hier nur mit Einwilligung. */
  var jaStat = stand.statistik, jaMark = stand.marketing;

  if(gesetzt(W.gtm) && (jaStat || jaMark))
    einmal('gtm', function(){
      window.dataLayer.push({'gtm.start': Date.now(), event:'gtm.js'});
      script('https://www.googletagmanager.com/gtm.js?id=' + encodeURIComponent(W.gtm.id));
    });

  if(gesetzt(W.ga4) && jaStat)
    einmal('ga4', function(){
      script('https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(W.ga4.id));
      gtag('js', new Date());
      gtag('config', W.ga4.id, { anonymize_ip:true });
    });

  if(gesetzt(W.clarity) && jaStat)
    einmal('clarity', function(){
      /* Clarity zeichnet Sitzungen auf. Eingaben und Text werden
         serverseitig maskiert — das muss im Clarity-Konto zusätzlich
         auf "Mask all" stehen, sonst landen Formularinhalte in der
         Aufzeichnung. Siehe README. */
      window.clarity = window.clarity || function(){ (window.clarity.q = window.clarity.q || []).push(arguments); };
      script('https://www.clarity.ms/tag/' + encodeURIComponent(W.clarity.id));
    });

  if(gesetzt(W.ads) && jaMark)
    einmal('ads', function(){
      script('https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(W.ads.id));
      gtag('js', new Date());
      gtag('config', W.ads.id);
    });

  if(gesetzt(W.metaPixel) && jaMark)
    einmal('meta', function(){
      !function(f,b,e,v,n,t,s){ if(f.fbq) return; n=f.fbq=function(){
        n.callMethod ? n.callMethod.apply(n,arguments) : n.queue.push(arguments); };
        if(!f._fbq) f._fbq=n; n.push=n; n.loaded=!0; n.version='2.0'; n.queue=[];
        t=b.createElement(e); t.async=!0; t.src=v; s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s); }(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
      window.fbq('init', W.metaPixel.id);
      window.fbq('track', 'PageView');
    });

  if(gesetzt(W.linkedin) && jaMark)
    einmal('linkedin', function(){
      window._linkedin_partner_id = W.linkedin.id;
      window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
      window._linkedin_data_partner_ids.push(W.linkedin.id);
      script('https://snap.licdn.com/li.lms-analytics/insight.min.js');
    });

  if(gesetzt(W.brevo) && jaMark)
    einmal('brevo', function(){
      window.Brevo = window.Brevo || [];
      script('https://cdn.brevo.com/js/sdk-loader.js');
      window.Brevo.push(['init', { client_key: W.brevo.id }]);
    });

  if(gesetzt(W.hubspot) && jaMark)
    einmal('hubspot', function(){
      script('https://js-eu1.hs-scripts.com/' + encodeURIComponent(W.hubspot.id) + '.js', {id:'hs-script-loader'});
    });

  /* Eigene Auswertung kann hier anknüpfen. */
  document.dispatchEvent(new CustomEvent('qs:consent', { detail: stand }));
}

/* Gibt es überhaupt etwas, das eine Einwilligung braucht? */
function einwilligungNoetig(){
  for(var k in WERKZEUGE){
    var w = WERKZEUGE[k];
    if(!gesetzt(w)) continue;
    if(w.ohneEinwilligung) continue;     // misst ohne Gerätezugriff
    return true;
  }
  return false;
}

/* ═══ 6 — OBERFLÄCHE ═════════════════════════════════════════════════
   Ablehnen und Annehmen stehen gleichwertig nebeneinander: gleiche
   Größe, gleicher Kontrast, gleiche Reihenfolge der Bedienbarkeit.
   Eine Einwilligung, die man wegklicken muss, ist keine freiwillige
   (Art. 4 Nr. 11, Art. 7 DSGVO; EDSA-Leitlinien 03/2022 zu
   irreführenden Gestaltungsmustern). Dieses Banner nimmt das ernst —
   nicht aus Vorsicht, sondern weil eine erschlichene Einwilligung
   die Daten dahinter wertlos macht.                                 */
var banner = null;

function bannerBauen(){
  if(banner) return banner;
  banner = document.createElement('div');
  banner.className = 'cmp';
  banner.setAttribute('role','dialog');
  banner.setAttribute('aria-modal','false');
  banner.setAttribute('aria-labelledby','cmp-titel');

  var kats = '';
  Object.keys(KATEGORIEN).forEach(function(k){
    var kat = KATEGORIEN[k];
    kats += '<label class="cmp-kat">' +
      '<input type="checkbox" data-kat="' + k + '"' + (kat.pflicht ? ' checked disabled' : '') + '>' +
      '<span><b>' + kat.name + (kat.pflicht ? ' <i>immer aktiv</i>' : '') + '</b>' +
      '<em>' + kat.text + '</em></span></label>';
  });

  banner.innerHTML =
    '<div class="cmp-innen">' +
      '<h2 id="cmp-titel" class="cmp-titel">Was darf gemessen werden?</h2>' +
      '<p class="cmp-text">Notwendige Funktionen laufen immer. Alles andere entscheiden Sie — ' +
        'und können es jederzeit über „cookies &amp; speicherung" in der Fußzeile ändern. ' +
        '<a href="datenschutz.html">Was dabei erhoben wird</a></p>' +
      '<div class="cmp-kats" hidden>' + kats + '</div>' +
      '<div class="cmp-knoepfe">' +
        '<button type="button" class="knopf knopf--klein" data-tun="ablehnen">Nur notwendige</button>' +
        '<button type="button" class="knopf knopf--klein" data-tun="annehmen">Alle annehmen</button>' +
        '<button type="button" class="cmp-mehr" data-tun="mehr">Einzeln wählen</button>' +
      '</div>' +
      '<div class="cmp-knoepfe cmp-knoepfe--wahl" hidden>' +
        '<button type="button" class="knopf knopf--klein" data-tun="speichern">Auswahl speichern</button>' +
      '</div>' +
    '</div>';

  document.body.appendChild(banner);

  banner.addEventListener('click', function(e){
    var b = e.target.closest('[data-tun]'); if(!b) return;
    var tun = b.dataset.tun;
    if(tun === 'mehr'){
      banner.querySelector('.cmp-kats').hidden = false;
      banner.querySelector('.cmp-knoepfe--wahl').hidden = false;
      b.hidden = true;
      return;
    }
    var wahl = { statistik:false, marketing:false };
    if(tun === 'annehmen'){ wahl.statistik = true; wahl.marketing = true; }
    if(tun === 'speichern'){
      banner.querySelectorAll('[data-kat]').forEach(function(f){
        if(f.dataset.kat !== 'notwendig') wahl[f.dataset.kat] = f.checked;
      });
    }
    entscheiden(wahl);
  });
  return banner;
}

function bannerZeigen(vorbelegung){
  var b = bannerBauen();
  if(vorbelegung){
    b.querySelectorAll('[data-kat]').forEach(function(f){
      if(f.dataset.kat !== 'notwendig') f.checked = !!vorbelegung[f.dataset.kat];
    });
  }
  b.classList.add('da');
  requestAnimationFrame(function(){ b.classList.add('hoch'); });
}
function bannerWeg(){
  if(!banner) return;
  banner.classList.remove('hoch');
  setTimeout(function(){ banner.classList.remove('da'); }, 600);
}

function entscheiden(wahl){
  var stand = schreiben(wahl);
  consentModeMelden(stand);
  werkzeugeStarten(stand);
  bannerWeg();
}

/* ═══ 7 — START ══════════════════════════════════════════════════════ */
var vorhanden = lesen();

if(!einwilligungNoetig()){
  /* Kein Werkzeug eingetragen, das eine Einwilligung braucht. Dann
     gibt es nichts zu fragen — der bestehende Hinweis in index.html
     bleibt zuständig und sagt weiterhin die Wahrheit. Was ohne
     Gerätezugriff misst, startet trotzdem. */
  werkzeugeStarten({ statistik:false, marketing:false });
}else if(vorhanden){
  consentModeMelden(vorhanden);
  werkzeugeStarten(vorhanden);
}else{
  /* Noch nicht gefragt: nichts laden außer dem, was ohne
     Gerätezugriff auskommt, und fragen. */
  werkzeugeStarten({ statistik:false, marketing:false });
  if(document.readyState === 'loading')
    document.addEventListener('DOMContentLoaded', function(){ bannerZeigen(null); });
  else bannerZeigen(null);
}

/* Widerruf: derselbe Fußzeilen-Knopf wie bisher. Art. 7 Abs. 3 DSGVO
   verlangt, dass der Widerruf so einfach ist wie die Erteilung. */
window.qsConsent = {
  oeffnen: function(){ bannerZeigen(lesen() || {}); },
  noetig:  einwilligungNoetig,
  stand:   lesen
};

})();
