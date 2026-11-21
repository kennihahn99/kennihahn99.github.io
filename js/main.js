/* Kenneth Hahn · Athletik & Performance – Bewegung, Reiter, Menü, „Los geht's“ */
(function(){
var D=document,H=D.documentElement,MAIL='info@kennethhahn.de';
var RM=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
function clamp(v,a,b){return Math.max(a,Math.min(b,v))}
function $(s,r){return (r||D).querySelector(s)}
function $$(s,r){return Array.prototype.slice.call((r||D).querySelectorAll(s))}

/* Menü */
var bg=$('.burger'),mn=$('#menu');
if(bg&&mn)bg.addEventListener('click',function(){var o=mn.hidden;mn.hidden=!o;bg.setAttribute('aria-expanded',o);bg.setAttribute('aria-label',o?'Menü schließen':'Menü öffnen');D.body.style.overflow=o?'hidden':'';});

/* Bühnen-Grafiken „Mein Ansatz“ (nur Weiß/Grau), zeichnen sich über --k (0…1) */
var G={
 1:'<svg viewBox="0 0 300 170" aria-hidden="true">'+[['Sprint',72,0],['Sprung',54,.15],['Kraft',36,.3]].map(function(r,i){return '<circle cx="80" cy="85" r="'+r[1]+'" class="rgt"/><circle cx="80" cy="85" r="'+r[1]+'" class="rg rc'+i+'" pathLength="100" transform="rotate(-90 80 85)" style="--d:'+r[2]+'"/><circle cx="184" cy="'+(52+i*34)+'" r="5" class="lc'+i+'"/><text x="198" y="'+(56+i*34)+'" class="lb">'+r[0]+'</text><text x="294" y="'+(56+i*34)+'" class="lb ok" text-anchor="end" style="--d:'+r[2]+'">✓</text>'}).join('')+'<polyline points="68,86 77,95 94,76" class="ck" pathLength="100"/></svg>',
 2:(function(){var h=[34,48,62,40,58,78,52,74,96,66,88,110],s='<svg viewBox="0 0 300 170" aria-hidden="true"><defs><linearGradient id="g2f"><stop offset=".9" stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient><mask id="g2m"><rect width="300" height="170" fill="url(#g2f)"/></mask></defs><text x="0" y="14" class="lb">Basis</text><text x="106" y="14" class="lb">Aufbau</text><text x="206" y="14" class="lb">Leistung</text><line x1="98" y1="4" x2="98" y2="160" class="ax"/><line x1="198" y1="4" x2="198" y2="160" class="ax"/><g mask="url(#g2m)">';
  for(var i=0;i<12;i++)s+='<rect x="'+(i*25+2)+'" y="'+(160-h[i]*1.2)+'" width="17" height="'+(h[i]*1.2)+'" rx="5" class="pb ph'+(i<4?0:i<8?1:2)+'" style="--i:'+i+'"/>';
  return s+'</g></svg>';})(),
 3:'<svg viewBox="0 0 300 170" aria-hidden="true"><line x1="10" y1="160" x2="290" y2="160" class="ax"/><line x1="10" y1="110" x2="290" y2="110" class="ax"/><line x1="10" y1="60" x2="290" y2="60" class="ax"/><polyline points="10,150 50,138 90,142 130,112 170,104 210,78 250,62 290,28" class="line" pathLength="100"/><circle cx="10" cy="150" r="5" class="sd"/><circle cx="290" cy="28" r="6" class="dot"/><text x="10" y="176" class="lb">Eingangstest</text><text x="290" y="176" class="lb" text-anchor="end">Dein Ziel</text></svg>'
};
$$('[data-g]').forEach(function(el){el.innerHTML=G[el.dataset.g];});

/* Reiter auf den Angebots-Seiten */
var tb=$('.tabs');
function moveInd(){var a=$('.tab[aria-selected="true"]'),ind=$('.ind');if(!a||!ind)return;ind.style.width=a.offsetWidth+'px';ind.style.transform='translateX('+a.offsetLeft+'px)';}
if(tb){
 H.classList.remove('notab');
 var tabs=$$('.tab'),panes=$$('.tabpane');
 function sel(i,focus){tabs.forEach(function(t,j){t.setAttribute('aria-selected',j===i);t.tabIndex=j===i?0:-1;});panes.forEach(function(p,j){p.hidden=j!==i;});moveInd();if(focus)tabs[i].focus();
  if(location.hash!=='#'+panes[i].id)history.replaceState(null,'','#'+panes[i].id);}
 tabs.forEach(function(t,i){t.addEventListener('click',function(){sel(i)});t.addEventListener('keydown',function(e){var d=e.key==='ArrowRight'?1:e.key==='ArrowLeft'?-1:0;if(d)sel((i+d+tabs.length)%tabs.length,true);});});
 var start=0;panes.forEach(function(p,j){if(location.hash==='#'+p.id)start=j;});
 sel(start);history.replaceState(null,'',location.pathname+location.search+(start?'#'+panes[start].id:''));
 window.addEventListener('resize',moveInd);
 if(D.fonts&&D.fonts.ready)D.fonts.ready.then(moveInd);
 /* Links wie „#preis“ auf derselben Seite öffnen den passenden Reiter */
 $$('a[href^="#"]').forEach(function(a){a.addEventListener('click',function(e){panes.forEach(function(p,j){if(a.getAttribute('href')==='#'+p.id){e.preventDefault();sel(j);tb.scrollIntoView({behavior:RM?'auto':'smooth'});}});});});
}

/* Bewegung: einmal seitlich einblenden, Angebote bei jedem Scrollen, Hero, Bühne */
if(!RM){H.classList.remove('nofx');H.classList.add('fx');}
var bar=58;
function onScroll(){
 if(RM)return;
 var y=window.scrollY,h=window.innerHeight;
 $$('.rv:not(.shown)').forEach(function(el){if(el.getBoundingClientRect().top<h*.9)el.classList.add('shown');});
 var nw=0;
 $$('.ol.oly').forEach(function(el){var r=el.getBoundingClientRect(),inn=r.top<h,out=r.bottom<bar+14,was=el.classList.contains('shown'),now=inn&&!out;
  el.style.transitionDelay=(now&&!was)?(nw++*.12)+'s':'0s';
  el.classList.toggle('shown',now);el.classList.toggle('out',inn&&out);});
 var ht=$('.herotext');
 if(ht){var k=clamp(y/420,0,1);ht.style.opacity=1-k*.85;ht.style.transform='translateY('+(-k*30)+'px) scale('+(1-k*.04)+')';}
 /* Leuchtsatz auf Über mich: Wörter färben sich nacheinander beim Scrollen */
 $$('.glow.lit').forEach(function(g){var sp=$$('span',g),top=g.getBoundingClientRect().top,pr=clamp((h*.85-top)/(h*.45),0,1),n=Math.round(pr*sp.length);sp.forEach(function(x,i){x.classList.toggle('on',i<n)});});
 var z=$('.photo.zoom');
 if(z){var q=clamp(1-z.getBoundingClientRect().top/h,0,1.4);z.querySelector('img').style.transform='scale('+(1+q*.18)+')';}
 var s=$('.story');
 if(s){
  var sh=h-bar,top=s.getBoundingClientRect().top-bar,p=clamp(-top/(s.offsetHeight-sh),0,1),f=clamp((p-.87)*10.5,0,1),q=clamp(p/.875,0,1);/* Schritte bis 87,5 %, dann kurz Pause, dann „Aus Training wird Leistung.“ */
  var fin=$('.fin',s);fin.style.opacity=f;fin.style.transform='translateY(calc(-50% + '+((1-f)*24)+'px))';
  $$('.st',s).forEach(function(el,i){
   var loc=q*3-i,o;
   if(i===0&&loc<.5)o=1;else if(i===2&&loc>.5)o=1-f;else o=clamp(Math.min(loc*4,(1-loc)*4),0,1);
   el.style.setProperty('--k',clamp(loc*1.6+.1,0,1).toFixed(3));
   el.style.opacity=o;
   el.style.transform='translate('+((.5-clamp(loc,0,1))*140)+'px,-50%)';
  });
  $('.prog i',s).style.width=(p*100)+'%';
 }
}
if(!RM){
 var hh=$('.page .h1');if(hh)hh.classList.add('mask');
 window.addEventListener('scroll',function(){requestAnimationFrame(onScroll)},{passive:true});
 window.addEventListener('resize',onScroll);
 onScroll();
}

/* Fester Knopf unten: erscheint, sobald „Auf einen Blick“ oben verschwunden ist */
var sc=$('.stickycta'),gl=$('.glance');
if(sc&&gl){function stk(){var on=gl.getBoundingClientRect().bottom<bar&&getComputedStyle(sc).display!=='none';D.body.classList.toggle('has-stk',on);sc.classList.toggle('on',on);sc.setAttribute('aria-hidden',!on);sc.querySelector('a').tabIndex=on?0:-1;}
 window.addEventListener('scroll',stk,{passive:true});stk();}

/* Los geht's: 3 Schritte, danach öffnet sich eine fertige E-Mail (keine Daten auf fremden Servern) */
var box=$('#wz');if(!box)return;
function SV(p){return '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+p+'</svg>';}
var GOALS=[
 ['performance','Für den Kader bereit sein','Leistungssport · Tests, Plan, App, enge Begleitung',SV('<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1" fill="currentColor"/>')],
 ['camp','Im Team trainieren','Sommerkurs 2027 · draußen, feste Gruppe',SV('<circle cx="9" cy="8" r="3"/><path d="M3 19c0-3.3 2.7-5 6-5s6 1.7 6 5"/><circle cx="17" cy="9" r="2.4"/><path d="M16 14.1c2.7.2 5 1.8 5 4.9"/>')],
 ['private','Mein Ziel, mein Tempo','Personal Training · Einzeltraining, ganz für dich',SV('<circle cx="12" cy="8" r="3.4"/><path d="M5 20c0-3.9 3.1-6 7-6s7 2.1 7 6"/>')],
 ['vitality','Gesund & Fit','Fitter werden, gesund bleiben, zurück nach Verletzung',SV('<path d="M12 20s-7.5-4.6-7.5-10.2A4.1 4.1 0 0 1 12 7.4a4.1 4.1 0 0 1 7.5 2.4C19.5 15.4 12 20 12 20z"/>')]
];
var NAMES={allein:'Einzeltraining',gruppe:'In der Gruppe',draussen:'Draußen',zuhause:'Bei mir zu Hause',online:'Online'};
var W={step:0,goal:null,who:null,where:null},F={};
var pre=new URLSearchParams(location.search).get('angebot');
/* Kommt man von einem Angebot, ist das Ziel schon klar: Schritt überspringen. Sommerkurs = Gruppe draußen, also gleich zum Kontakt. */
var SKIP=false;
if(GOALS.some(function(g){return g[0]===pre})){W.goal=pre;W.who=pre==='camp'?'gruppe':'allein';if(pre==='camp')W.where='draussen';W.step=pre==='camp'?2:1;SKIP=true;
 var intro=$('.page > .p');if(intro)intro.textContent=pre==='camp'?'Nur noch deine Kontaktdaten, kostenlos und unverbindlich. Ich melde mich persönlich.':'Zwei kurze Fragen, kostenlos und unverbindlich. Ich melde mich persönlich.';}
function esc(v){return String(v||'').replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;');}
function opt(gr,val,title,sub,ico){var on=W[gr]===val;return '<button type="button" class="opt'+(on?' on':'')+'" data-pick="'+gr+'" data-val="'+val+'" aria-pressed="'+on+'">'+(ico?'<i>'+ico+'</i>':'')+'<span><b>'+title+'</b>'+(sub?'<small>'+sub+'</small>':'')+'</span></button>';}
function fld(k,lab,type,ph,ac){return '<label class="field">'+lab+'<input data-f="'+k+'" type="'+type+'" placeholder="'+ph+'" autocomplete="'+ac+'" value="'+esc(F[k])+'"></label>';}
function goal(){return GOALS.filter(function(x){return x[0]===W.goal})[0];}
function stepHTML(){
 if(W.step===0)return '<h2 class="h2">Was willst du erreichen?</h2><div class="opts">'+GOALS.map(function(g){return opt('goal',g[0],g[1],g[2],g[3])}).join('')+'</div>';
 if(W.step===1){var c=W.goal==='camp';
  return '<h2 class="h2">Wo willst du trainieren?</h2>'+(c?'<p class="hint">Der Sommerkurs findet in der Gruppe draußen in Füssen statt.</p>':'')+
  '<div class="chips2">'+opt('where','draussen','Draußen')+(c?'':opt('where','zuhause','Bei mir zu Hause')+opt('where','online','Online'))+'</div>';}
 var g=goal();
 return '<h2 class="h2">Wie erreiche ich dich?</h2><div class="sum"><span>'+(g?g[1]:'')+'</span>'+(W.who?'<span>'+NAMES[W.who]+'</span>':'')+(W.where?'<span>'+NAMES[W.where]+'</span>':'')+'</div>'+
  fld('name','Name','text','Vor- und Nachname','name')+fld('mail','E-Mail','email','name@beispiel.de','email')+fld('goal','Dein Ziel (optional)','text','z. B. schneller auf den ersten Metern','off')+
  '<p class="hint">Bitte keine Angaben zu Gesundheit oder Verletzungen. Darüber sprechen wir in Ruhe im Erstgespräch.</p>'+
  '<label class="chk"><input type="checkbox" data-f="ok18"'+(F.ok18?' checked':'')+'><span>Ich bin 18+ oder meine Eltern sind einverstanden.</span></label>'+
  '<button type="button" class="pill" data-send style="justify-self:start">Unverbindlich vormerken →</button><p class="ok" hidden role="status"></p>'+
  '<p class="hint">Ich nutze deine Angaben nur, um mich bei dir zu melden, und lösche sie, wenn daraus kein Training wird. Mehr in der <a href="datenschutz.html">Datenschutzerklärung</a>.</p>';
}
function wiz(){
 var can=W.step===0?!!W.goal:W.step===1?!!(W.who&&W.where):true;
 return '<div class="wz"><div class="dots" aria-hidden="true">'+[0,1,2].map(function(i){return '<span class="'+(i<=W.step?'on':'')+'"></span>'}).join('')+'<em>'+(SKIP&&W.step===2?'Nur noch ein Schritt':'Schritt '+(W.step+1)+' von 3')+'</em></div>'+(SKIP&&W.step===1?'<div class="sum" style="align-items:center"><span>'+goal()[2].split(' · ')[0]+'</span><button type="button" class="pill ghost sm" data-wiz="change">Ändern</button></div>':'')+
  '<div class="wstep">'+stepHTML()+'</div>'+
  '<div class="wnav">'+(W.step>0?'<button type="button" class="wback" data-wiz="-1">← Zurück</button>':'<span></span>')+(W.step<2?'<button type="button" class="pill" data-wiz="1"'+(can?'':' disabled')+'>Weiter →</button>':'')+'</div></div>';
}
function draw(dir){box.innerHTML=wiz();if(dir&&!RM)$('.wstep',box).classList.add(dir>0?'fromR':'fromL');}
function mail(){
 var g=goal(),b=['Hallo Kenneth,','','ich möchte mich unverbindlich vormerken.','',
  'Ziel: '+(g?g[1]+' ('+g[2].split(' · ')[0]+')':''),
  'Format: '+(NAMES[W.who]||''),'Wo: '+(NAMES[W.where]||''),
  F.goal?'Mein Ziel: '+F.goal:'', '','Ich bin 18+ oder meine Eltern sind einverstanden.','','Viele Grüße','',F.name].filter(function(x,i,a){return x!==''||a[i-1]!==''}).join('\n');
 return 'mailto:'+MAIL+'?subject='+encodeURIComponent('Vormerken: '+(g?g[2].split(' · ')[0]:'Training')+' – '+F.name)+'&body='+encodeURIComponent(b);
}
box.addEventListener('click',function(e){
 var t=e.target.closest('[data-pick],[data-wiz],[data-send]');if(!t)return;
 if(t.hasAttribute('data-pick')){var gr=t.dataset.pick;W[gr]=t.dataset.val;if(gr==='goal'){W.who=W.goal==='camp'?'gruppe':'allein';W.where=W.goal==='camp'?'draussen':null;}draw(0);var b=$('[data-pick="'+gr+'"][data-val="'+t.dataset.val+'"]',box);if(b)b.focus();return;}
 if(t.hasAttribute('data-wiz')){if(t.disabled)return;
  if(t.dataset.wiz==='change'){SKIP=false;W.step=0;draw(-1);return;}
  var d=+t.dataset.wiz;W.step=clamp(W.step+d,0,2);if(d<0&&W.step===1&&W.goal==='camp')W.step=0;if(d<0&&SKIP&&W.step===0)SKIP=false;draw(d);var h2=$('.h2',box);if(h2){h2.tabIndex=-1;h2.focus({preventScroll:true});}return;}
 var m=/^[^@\s]+@[^@\s]+\.[^@\s]+$/,miss=[],o=t.nextElementSibling;
 if(!F.name)miss.push('Name');if(!m.test(F.mail||''))miss.push('E-Mail');if(!F.ok18)miss.push('Häkchen zum Alter');
 o.hidden=false;o.classList.toggle('err',miss.length>0);
 if(miss.length){o.textContent='Bitte noch ausfüllen: '+miss.join(', ')+'.';return;}
 o.innerHTML='Dein E-Mail-Programm öffnet sich mit einer fertigen Nachricht. Tippe dort nur noch auf Senden. Klappt es nicht? Schreib direkt an <a href="mailto:'+MAIL+'">'+MAIL+'</a>.';
 location.href=mail();
});
box.addEventListener('input',function(e){var k=e.target.dataset&&e.target.dataset.f;if(k)F[k]=e.target.type==='checkbox'?e.target.checked:e.target.value.trim();});
draw(0);
})();
