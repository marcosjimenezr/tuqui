/* TUQUI · vistas */
const SEED=[];

const CATS=[
 // El orden manda: las primeras cinco son las que salen de una al registrar,
 // mientras el hogar no tenga historia propia. Van las del dia a dia primero.
 // c = color, t = tinte del circulo, d = dibujo del icono (viewBox 24, trazo 1.7).
 {id:'mercado',n:'Mercado',c:'#3F7A5C',t:'#E2EDE5',
  d:'<path d="M2.6 4h2.2l2.3 10.1a1.7 1.7 0 0 0 1.7 1.3h7.7a1.7 1.7 0 0 0 1.7-1.3L19.6 8H5.6"/><circle cx="9.6" cy="19.4" r="1.4"/><circle cx="16.8" cy="19.4" r="1.4"/>'},
 {id:'domicilios',n:'Domicilios',c:'#C2622E',t:'#F6E6DA',
  d:'<circle cx="5.4" cy="16.8" r="3"/><circle cx="18.6" cy="16.8" r="3"/><path d="M8.4 16.8h7.2M15.6 16.8 13.2 7.4h-2.6M13.8 10.6h3.8l1.8 6.2M5.4 13.8v-3.2h4.8"/>'},
 {id:'comerfuera',n:'Comer fuera',c:'#9A7420',t:'#F2EBD8',
  d:'<path d="M6.4 3v5.4M9.6 3v5.4M8 8.4V21"/><path d="M16.4 3c1.7 1.4 2.2 3.5 2.2 5.4 0 1.6-.8 2.6-2.2 3V21"/>'},
 {id:'transporte',n:'Transporte',c:'#656B76',t:'#E8E8EA',
  d:'<path d="M3.4 15.6h17.2M5 15.6l1.7-5.4A2.1 2.1 0 0 1 8.7 8.7h6.6a2.1 2.1 0 0 1 2 1.5l1.7 5.4"/><circle cx="7.6" cy="17.6" r="1.7"/><circle cx="16.4" cy="17.6" r="1.7"/>'},
 {id:'hogar',n:'Casa',c:'#55728C',t:'#E3EAEF',
  d:'<path d="M5.4 11.4V8.2a2.1 2.1 0 0 1 2.1-2.1h9a2.1 2.1 0 0 1 2.1 2.1v3.2"/><path d="M3 14a2.1 2.1 0 0 1 4.2 0v1.8h9.6V14A2.1 2.1 0 0 1 21 14v4.4H3z"/><path d="M5.4 18.4v1.5M18.6 18.4v1.5"/>'},
 {id:'servicios',n:'Servicios',c:'#2F7E79',t:'#DFEEEC',
  d:'<path d="M13.4 2.4 5 13.6h5.9l-1 8 8.4-11.2h-5.9z"/>'},
 {id:'vivienda',n:'Vivienda',c:'#45689C',t:'#E2E8F2',
  d:'<path d="M3.2 11.2 12 4.2l8.8 7"/><path d="M5.4 10.4v8.7a.9.9 0 0 0 .9.9h11.4a.9.9 0 0 0 .9-.9v-8.7"/>'},
 {id:'ayuda',n:'Ayuda en casa',c:'#73589F',t:'#EAE4F3',
  d:'<circle cx="12" cy="7.8" r="3.5"/><path d="M4.9 20c.7-3.7 3.5-5.8 7.1-5.8s6.4 2.1 7.1 5.8"/>'},
 {id:'salud',n:'Salud',c:'#AA4545',t:'#F6E3E3',
  d:'<rect x="2.8" y="6.6" width="18.4" height="13.6" rx="2.4"/><path d="M9.2 6.6V5.4A1.3 1.3 0 0 1 10.5 4.1h3a1.3 1.3 0 0 1 1.3 1.3v1.2"/><path d="M12 10.4v6M9 13.4h6"/>'},
 {id:'bienestar',n:'Bienestar',c:'#64802E',t:'#EDF1DD',
  d:'<path d="M2.8 9.6v4.8M6.2 7.2v9.6M17.8 7.2v9.6M21.2 9.6v4.8M6.2 12h11.6"/>'},
 {id:'educacion',n:'Educación',c:'#5555A6',t:'#E5E5F4',
  d:'<path d="M12 3.6 2.2 8.8 12 14l9.8-5.2z"/><path d="M6.4 11.1v4.7c0 1.9 2.5 3.2 5.6 3.2s5.6-1.3 5.6-3.2v-4.7"/>'},
 {id:'deudas',n:'Deudas y seguros',c:'#85539F',t:'#EFE4F4',
  d:'<rect x="2.4" y="5.4" width="19.2" height="13.2" rx="2.3"/><path d="M2.4 10.1h19.2M6 14.6h3.8"/>'},
 {id:'suscrip',n:'Suscripciones',c:'#357697',t:'#E0ECF2',
  d:'<path d="M4 10.2A5.2 5.2 0 0 1 9.2 5h8.3"/><path d="m14.9 2.4 2.7 2.6-2.7 2.6"/><path d="M20 13.8A5.2 5.2 0 0 1 14.8 19H6.5"/><path d="m9.1 21.6-2.7-2.6 2.7-2.6"/>'},
 {id:'mascotas',n:'Mascotas',c:'#8C5D38',t:'#F1E7DC',
  d:'<ellipse cx="8.2" cy="7.4" rx="1.9" ry="2.6"/><ellipse cx="15.8" cy="7.4" rx="1.9" ry="2.6"/><ellipse cx="4.1" cy="12.6" rx="1.7" ry="2.2"/><ellipse cx="19.9" cy="12.6" rx="1.7" ry="2.2"/><path d="M12 12.6c2.9 0 5.1 2.3 5.1 4.7 0 1.8-1.4 3.1-3.3 3.1-.8 0-1.2-.3-1.8-.3s-1 .3-1.8.3c-1.9 0-3.3-1.3-3.3-3.1 0-2.4 2.2-4.7 5.1-4.7z"/>'},
 {id:'regalos',n:'Regalos y celebraciones',c:'#9E6D1A',t:'#F5EDD7',
  d:'<rect x="2.8" y="9.4" width="18.4" height="10.8" rx="1.7"/><path d="M1.8 9.4h20.4M12 9.4v10.8"/><path d="M12 9.4S9.6 9.4 8.3 8.1a2.2 2.2 0 1 1 3.1-3.1C12.5 6.1 12 9.4 12 9.4"/><path d="M12 9.4s2.4 0 3.7-1.3a2.2 2.2 0 1 0-3.1-3.1C11.5 6.1 12 9.4 12 9.4"/>'},
 {id:'personal',n:'Personal y ocio',c:'#A94B73',t:'#F7E3EC',
  d:'<path d="M8.6 3.4 4 6.1l1.9 4.2 2.3-1v11.3h7.6V9.3l2.3 1L20 6.1l-4.6-2.7a3.7 3.7 0 0 1-6.8 0z"/>'}];
// Si alguna vez se fusionan o renombran categorias, aqui se mapea la vieja a la
// nueva y los gastos ya registrados se leen en la nueva sin tocar la base.
const ALIAS={};
// Si algun dia aparece una categoria que ya no existe, cae en Personal y ocio
// en vez de tumbar la pantalla.
const norCat=c=>{const k=ALIAS[c]||c;return CM[k]?k:'personal'};
// Circulo de categoria: tinte de fondo e icono en el color de la categoria.
function icCat(id){const c=CM[norCat(id)]||{c:'#8A8378',t:'#E6E1D8',d:''};
  return '<span class="ic" style="background:'+c.t+';color:'+c.c+'">'+
    '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" '+
    'stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">'+(c.d||'')+'</svg></span>'}
const CM=Object.fromEntries(CATS.map(c=>[c.id,c]));
// El acuerdo de que va en cada categoria. Se usa en la pantalla de ayuda y traza a
// proposito las rayas donde hoy se confunden: Salud vs Bienestar, Vivienda vs Casa.
const GRUPOS=[
 {t:'Comida y d&iacute;a a d&iacute;a',ids:['mercado','domicilios','comerfuera','transporte']},
 {t:'La casa',ids:['vivienda','servicios','hogar','ayuda']},
 {t:'Cuidado',ids:['salud','bienestar','mascotas']},
 {t:'Compromisos',ids:['educacion','deudas','suscrip']},
 {t:'Gustos',ids:['regalos','personal']}];
const DEF={
 mercado:'Supermercado, plaza, fruver, carnicer&iacute;a. Lo que compran para cocinar en casa.',
 domicilios:'Rappi, iFood, el pedido que llega a la puerta.',
 comerfuera:'Restaurantes, almuerzo del trabajo, caf&eacute;, bar.',
 transporte:'Gasolina, Uber, taxi, bus, parqueadero, peajes, lavado del carro.',
 vivienda:'El techo: arriendo, cuota del cr&eacute;dito, administraci&oacute;n.',
 servicios:'Luz, agua, gas, internet, celular, TV.',
 hogar:'Lo que hay dentro: muebles, arreglos, ferreter&iacute;a, aseo, electrodom&eacute;sticos.',
 ayuda:'Empleada, ni&ntilde;era, jardinero, lavander&iacute;a.',
 salud:'Cuando hay algo que tratar: EPS, prepagada, citas, medicamentos, odont&oacute;logo.',
 bienestar:'Lo recurrente para el cuerpo y la cabeza: gym, yoga, terapia, peluquer&iacute;a, u&ntilde;as.',
 mascotas:'Comida, veterinario, guarder&iacute;a, peluquer&iacute;a canina.',
 educacion:'Colegio, pensi&oacute;n, universidad, cursos, &uacute;tiles, uniformes.',
 deudas:'Tarjeta, pr&eacute;stamos, cuota del carro, SOAT, p&oacute;lizas, predial.',
 suscrip:'Netflix, Spotify, iCloud, lo que se cobra solo cada mes.',
 regalos:'Cumplea&ntilde;os, grados, matrimonios, novenas, diciembre.',
 personal:'Antojos y gustos: ropa, salidas, cine, hobbies, tecnolog&iacute;a.'};
const MES=['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
const Q=[];MES.forEach(m=>{Q.push(m+' 1');Q.push(m+' 2')});
const DEFMETA=2000000;
let CFG={a1:1250000,a2:1250000,desc:500000,p1:'Mark',p2:'Esposa',meta:DEFMETA};
let metas=[];
const COLP=['#C2622E','#45689C','#3F7A5C','#9E6D1A','#73589F','#2F7E79'];
function H(){if(CFG.hogar&&CFG.hogar.length)return CFG.hogar;
  return [{id:'p1',n:CFG.p1||'Yo',a:+CFG.a1||0,d:0},
          {id:'p2',n:CFG.p2||'Pareja',a:+CFG.a2||0,d:0}]}
const PERS=()=>H().map(p=>p.n);
const idPor=v=>(typeof v==='number')?((H()[v]||{}).id||''):(v||'');
const perPor=v=>{const id=idPor(v);return H().find(p=>p.id===id)||null};
const nomPor=v=>{const p=perPor(v);return p?p.n:''};
function qHoy(){const d=new Date();return MES[d.getMonth()]+' '+(d.getDate()<=15?'1':'2')}
let modo='q', i=Math.max(Q.indexOf(qHoy()),0), view='home', det=null, db=null,
    nuevos=[], overrides={}, editKey=null, lastKey='', amt='', cat=null, por='', nota='',
    AJ=null, vig='desde', cob=1, fon='', fondOv={}, NF=null, NM=null, conceptos={},
    catOpen=false, detOpen=false, ultimo=null, cierres={}, INV=null,
    perBack='home';

const U=()=>modo==='q'?Q:MES;
const qIdx=()=>modo==='q'?i:2*i+1;
function metaQ(k){let v=+CFG.meta||0;
  metas.slice().sort((a,b)=>Q.indexOf(a.desde)-Q.indexOf(b.desde))
    .forEach(m=>{const ix=Q.indexOf(m.desde);if(ix>=0&&ix<=k)v=m.v});
  return v}
const APORTE=()=>modo==='q'?metaQ(i):(metaQ(2*i)+metaQ(2*i+1));
const mesDe=q=>q.split(' ')[0];
function todos(){const out=[];
  SEED.forEach((g,ix)=>{const k='s'+ix,ov=overrides[k]||{};if(ov.del)return;
    out.push({k,q:ov.q||g.q,cat:norCat(ov.cat||g.cat),n:ov.n!==undefined?ov.n:g.n,
      a:ov.a!==undefined?ov.a:g.a*1000,por:ov.por||0,cob:ov.cob!==undefined?ov.cob:(g.cob||1),
      fon:ov.fon!==undefined?ov.fon:(g.fon||''),
      seed:1,edit:!!ov.cat||ov.n!==undefined||ov.a!==undefined})});
  nuevos.forEach(g=>out.push({k:g.id,q:g.q,cat:norCat(g.cat),n:g.n,a:g.a,por:g.por||0,cob:g.cob||1,fon:g.fon||'',id:g.id,cpor:g.cpor||'',ce:g.ce||g.at||''}));
  return out}
const qi=g=>Q.indexOf(g.q);
const per=g=>(g.cob&&g.cob>1)?g.cob*2:1;
let _cc=null;
function costMat(){if(_cc)return _cc;const M={};
  todos().forEach(g=>{const a=qi(g);if(a<0)return;const n=per(g),u=g.a/n;
    for(let k=a;k<a+n&&k<Q.length;k++){M[k]=M[k]||{};M[k][g.cat]=(M[k][g.cat]||0)+u}});
  return _cc=M}
const costoQ=(k,c)=>(costMat()[k]||{})[c]||0;
const costo=(k,c)=>modo==='q'?costoQ(k,c):costoQ(2*k,c)+costoQ(2*k+1,c);
function cubiertos(){const k=qIdx();return todos().filter(g=>{const a=qi(g);
  return g.cob>1&&a>=0&&k>=a&&k<a+per(g)}).sort((a,b)=>qi(a)+per(a)-(qi(b)+per(b)))}
const hastaQ=g=>{const f=qi(g)+per(g)-1,y=2026+Math.floor(f/24),x=((f%24)+24)%24;
  return MES[Math.floor(x/2)]+' '+y};
const SUG=[];
function fondos(){const out=[];
  Object.keys(fondOv).forEach(k=>{const o=fondOv[k];if(o&&o.id&&!o.del)out.push(o)});
  return out}
const sugs=()=>SUG.filter(x=>!fondOv[x.id]);
const clave=n=>String(n||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'')
  .replace(/[^a-z0-9 ]/g,' ').replace(/\s+/g,' ').trim();
function conocidos(){const m={};
  todos().forEach(g=>{const e=m[g.n]=m[g.n]||{n:g.n,v:0,a:[],c:{}};
    e.v++;e.a.push(g.a);e.c[g.cat]=(e.c[g.cat]||0)+1});
  return Object.values(m).map(e=>{e.a.sort((x,y)=>x-y);
    e.med=e.a[Math.floor(e.a.length/2)];
    e.cat=Object.keys(e.c).sort((x,y)=>e.c[y]-e.c[x])[0];
    e.mix=Object.keys(e.c).length>1;return e}).sort((a,b)=>b.v-a.v)}
// --- recurrencia ---------------------------------------------------
// Un concepto es recurrente cuando ya aparecio en dos periodos distintos
// y el hueco entre ellos es constante: una quincena o un mes.
let _rec=null;
function recurrentes(){
  if(_rec)return _rec;
  const m={};
  todos().forEach(g=>{const k=clave(g.n);if(!k)return;
    const e=m[k]=m[k]||{k,n:g.n,cat:g.cat,qs:[],as:[]};
    const x=qi(g);if(x>=0&&e.qs.indexOf(x)<0)e.qs.push(x);
    e.as.push(g.a);e.n=g.n;e.cat=g.cat});
  return _rec=Object.values(m).filter(e=>e.qs.length>=2).map(e=>{
    e.qs.sort((a,b)=>a-b);
    const d=[];for(let j=1;j<e.qs.length;j++)d.push(e.qs[j]-e.qs[j-1]);
    d.sort((a,b)=>a-b);
    e.cada=d[Math.floor(d.length/2)];
    e.ult=e.qs[e.qs.length-1];
    const v=e.as.slice().sort((a,b)=>a-b);
    e.med=v[Math.floor(v.length/2)];
    return e}).filter(e=>e.cada===1||e.cada===2)}
const recMap=()=>Object.fromEntries(recurrentes().map(e=>[e.k,e]));
const cadaTxt=c=>c===1?'cada quincena':'cada mes';
// Recurrentes que ya tocaban en este periodo y todavia no se han registrado.
function pendientes(){
  if(modo!=='q'||!enHoy())return [];
  const hay={};items(i).forEach(g=>hay[clave(g.n)]=1);
  return recurrentes().filter(e=>!hay[e.k]&&e.ult+e.cada<=i)
    .sort((a,b)=>b.med-a.med)}

function sugNombres(t){const q=clave(t);if(q.length<2)return [];
  return conocidos().filter(e=>{const k=clave(e.n);return k!==q&&k.includes(q)}).slice(0,6)}
function umbral(){const v=todos().map(g=>g.a).sort((a,b)=>a-b);
  if(!v.length)return 400000;const m=v[Math.floor(v.length/2)];
  return Math.max(Math.round(m*3/50000)*50000,300000)}
const FM=()=>Object.fromEntries(fondos().map(f=>[f.id,f]));
const activo=(f,k)=>Q.indexOf(f.desde)<=k;
const plan=f=>(f.meta>0&&+f.c>0)?Math.ceil(f.meta/+f.c):0;
function aporta(f,k){if(!activo(f,k))return 0;const n=plan(f);
  if(n&&(k-Q.indexOf(f.desde)+1)>n)return 0;return +f.c||0}
const provQ=k=>fondos().reduce((s,f)=>s+aporta(f,k),0);
const prov=k=>modo==='q'?provQ(k):provQ(2*k)+provQ(2*k+1);
function saldo(f,k){const a=Q.indexOf(f.desde);if(a<0||k<a)return 0;
  const n=plan(f);let q=k-a+1;if(n)q=Math.min(q,n);
  const usado=todos().filter(g=>g.fon===f.id&&qi(g)<=k).reduce((s,g)=>s+g.a,0);
  return q*(+f.c||0)-usado}
const esMeta=f=>+f.meta>0;
function faltanQ(f,k){const n=plan(f);if(!n)return 0;
  return Math.max(n-(k-Q.indexOf(f.desde)+1),0)}
function llegaEn(f,k){const r=faltanQ(f,k);const x=k+r;
  const y=2026+Math.floor(x/24),z=((x%24)+24)%24;return MES[Math.floor(z/2)]+' '+y}
const items=k=>{const T=todos();return modo==='q'?T.filter(g=>g.q===Q[k]):T.filter(g=>mesDe(g.q)===MES[k])};
const tot=k=>items(k).reduce((s,g)=>s+g.a,0);
const totLibre=k=>items(k).filter(g=>!g.fon).reduce((s,g)=>s+g.a,0);
const totFondo=k=>items(k).filter(g=>g.fon).reduce((s,g)=>s+g.a,0);
const catTot=(k,c)=>items(k).filter(g=>g.cat===c).reduce((s,g)=>s+g.a,0);
const prom=c=>{const n=Math.min(i,modo==='q'?6:3);if(n<1)return 0;let s=0;
  for(let k=i-n;k<i;k++)s+=costo(k,c);return s/n};
const fmt=v=>'$'+Math.round(v).toLocaleString('es-CO');
const fmtK=v=>Math.abs(v)>=1000000?'$'+(v/1000000).toFixed(1).replace('.',',')+'M':'$'+Math.round(v/1000)+'k';
const esc=s=>String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;');
// Arriba manda el mes; la quincena y los dias van de apoyo.
const ultimoDia=m=>new Date(2026,MES.indexOf(m)+1,0).getDate();
function lbl(k){
  if(modo==='m')return[MES[k],'mes completo · 2026'];
  const[m,n]=Q[k].split(' ');
  const rango=n==='1'?'1 al 15':'16 al '+ultimoDia(m);
  return[m+'<i class="qq">'+(n==='1'?'1ª':'2ª')+' quincena</i>', rango+' de '+m.toLowerCase()]}
function setModo(x){if(x===modo)return;
  if(x==='m')i=MES.indexOf(mesDe(Q[i]));else i=Q.indexOf(MES[i]+' 2');
  modo=x;det=null;render()}

const scr=document.getElementById('scr'),tabs=document.getElementById('tabs');
const iHoy=()=>modo==='q'?Math.max(Q.indexOf(qHoy()),0):new Date().getMonth();
const enHoy=()=>i===iHoy();
function diasRest(){const d=new Date(),dia=d.getDate(),
  ultimo=new Date(d.getFullYear(),d.getMonth()+1,0).getDate();
  const fin=modo==='m'?ultimo:(dia<=15?15:ultimo);
  return Math.max(fin-dia+1,0)}
function cabecera(){return `<div class="hdr">
  <span class="hn">${esc(CFG.nombre||'Mi hogar')}</span>
  <button class="hg" data-go2="cfg" aria-label="Ajustes">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round">
    <path d="M10.20 2.16 L13.80 2.16 L14.09 4.59 L15.76 5.28 L17.69 3.77 L20.23 6.31 L18.72 8.24 L19.41 9.91 L21.84 10.20 L21.84 13.80 L19.41 14.09 L18.72 15.76 L20.23 17.69 L17.69 20.23 L15.76 18.72 L14.09 19.41 L13.80 21.84 L10.20 21.84 L9.91 19.41 L8.24 18.72 L6.31 20.23 L3.77 17.69 L5.28 15.76 L4.59 14.09 L2.16 13.80 L2.16 10.20 L4.59 9.91 L5.28 8.24 L3.77 6.31 L6.31 3.77 L8.24 5.28 L9.91 4.59 Z"/><circle cx="12" cy="12" r="3.4"/></svg>
  </button></div>`}
// El encabezado dice donde estas. Para moverse hay un solo boton, y la vuelta
// a hoy solo aparece cuando de verdad te saliste del periodo actual.
function barra(){const[a,b]=lbl(i);return cabecera()+`<div class="top">
  <span class="who"><b>${a}${enHoy()?'<i class="hoy">hoy</i>':''}</b><span>${b}</span></span>
  <button class="camb" data-go2="per">Cambiar</button></div>
  ${enHoy()?'':`<button class="volver" data-hoy="1">‹ Volver a ${perNom(iHoy())}</button>`}`}
function segModo(){return `<div class="seg" style="margin-top:12px">
  <button data-modo="q" class="${modo==='q'?'on':''}">Por quincena</button>
  <button data-modo="m" class="${modo==='m'?'on':''}">Por mes</button></div>`}
function topSimple(t,s,back){return `<div class="top">
  ${back?`<button class="step" data-back2="${back}">‹</button>`:'<span style="width:34px"></span>'}
  <span class="who" style="text-align:center"><b>${t}</b><span>${s}</span></span>
  <span style="width:34px"></span></div>`}

// Reparte 100 puntos sin que se pierda ninguno en el redondeo: el sobrante va
// a las categorias con el resto mas grande. Asi la columna suma 100% exacto.
function pcts(vals){
  const t=vals.reduce((a,b)=>a+b,0);
  if(t<=0)return vals.map(()=>0);
  const ex=vals.map(v=>v/t*100), fl=ex.map(Math.floor);
  const falta=Math.max(100-fl.reduce((a,b)=>a+b,0),0);
  ex.map((v,k)=>({k,r:v-Math.floor(v)})).sort((a,b)=>b.r-a.r)
    .slice(0,falta).forEach(o=>fl[o.k]++);
  return fl}

function catList(){
  const list=CATS.map(c=>({c,v:catTot(i,c.id),p:prom(c.id)})).filter(x=>x.v>0).sort((a,b)=>b.v-a.v);
  const mx=Math.max(...list.map(x=>Math.max(x.v,x.p)),1);
  const ps=pcts(list.map(x=>x.v));
  list.forEach((x,k)=>x.pc=ps[k]);
  return {list,mx}}

// Selector de periodo: solo los que tienen gastos, mas el actual, del mas
// nuevo al mas viejo, con cuanto fue cada uno antes de entrar.
function vPer(){
  const act=iHoy(), hay={};
  todos().forEach(g=>{const k=Q.indexOf(g.q); if(k<0)return;
    hay[modo==='q'?k:Math.floor(k/2)]=1});
  hay[act]=1; hay[i]=1;
  const ks=Object.keys(hay).map(Number).sort((x,y)=>y-x);
  return topSimple('Ver otro periodo','elige cu&aacute;l quieres mirar',perBack)+`
  <div class="seg"><button data-modo="q" class="${modo==='q'?'on':''}">Por quincena</button>
    <button data-modo="m" class="${modo==='m'?'on':''}">Por mes</button></div>
  ${ks.map(k=>{const t=tot(k), n=items(k).length,
      cz=cierres[claveDe(modo,k)], cerrado=!!(cz&&cz.saldado);
    return `<button class="row perr${k===i?' sel':''}" data-ver="${k}">
      <span class="tx"><b>${cap(perNom(k))}</b><span>${
        t?fmt(t)+' \u00b7 '+n+(n===1?' movimiento':' movimientos'):'sin movimientos'}</span></span>
      ${k===act?'<em class="et hoy2">hoy</em>'
        :cerrado?`<em class="et">${modo==='q'?'cerrada':'cerrado'}</em>`:''}</button>`}).join('')}
  <p class="hint">Solo aparecen ${modo==='q'?'las quincenas':'los meses'} donde ya registraron algo,
  m&aacute;s ${modo==='q'?'la quincena':'el mes'} de hoy.</p>
  <div class="spacer"></div>`}

function vDescubrir(){
  const t=tot(i),n=items(i).length,prev=qsConDatos(),sg=sugInicial();
  const {list,mx}=catList();
  return barra()+`
  <div class="hero">
    <div class="lb">Llevan registrado</div>
    <div class="big">${fmt(t)}</div>
    <div class="cmp">${n} ${n===1?'movimiento':'movimientos'} en ${modo==='q'?'esta quincena':'este mes'}</div>
    <div class="mrow"><button class="lnk" data-go2="aj">ya sabemos cu\u00e1nto ponemos \u00b7 ponerlo ahora \u203a</button></div>
  </div>
  ${sg?`<div class="ins good"><h4>Ya los conocemos un poco</h4>
    <p>En sus \u00faltimas quincenas gastaron ${listaY(prev.slice(-3).map(fmt))}.
    Proponemos una meta de <span class="a">${fmt(sg)}</span> por quincena.</p>
    <button class="btn sec2" data-meta0="${sg}">Me sirve, usar esta meta</button>
    <button class="lnk" data-go2="aj" style="margin-top:10px">prefiero poner otra \u203a</button></div>`
   :`<div class="ins"><h4>Estamos conociendo sus gastos</h4>
    <p>Por ahora no hay meta ni sem\u00e1foro: registren lo que vayan gastando y ya. Cuando cierren su
    segunda quincena con movimientos, les proponemos una meta con sus propios n\u00fameros.</p>
    <p>Llevan <b>${prev.length}</b> ${prev.length===1?'quincena cerrada':'quincenas cerradas'} con gastos.</p></div>`}
  ${list.length?`<div class="sec"><b>En qu\u00e9 se ha ido</b></div>
  ${list.map(x=>`<button class="row" data-cat="${x.c.id}">
    ${icCat(x.c.id)}
    <span class="tx"><b>${x.c.n}<i class="pc">${x.pc}%</i></b><span class="bar"><i style="width:${x.v/mx*100}%;background:${x.c.c}"></i></span></span>
    <span class="amt">${fmtK(x.v)}</span></button>`).join('')}`:''}
  <div class="spacer"></div>`}

function vHome(){
  if(!hayMeta())return vDescubrir();
  const t=tot(i),ap=APORTE(),
        pv=prov(i),disp=Math.max(ap-pv,0),tl=totLibre(i),tf=totFondo(i),
        over=tl>disp,esc2=Math.max(disp,tl)*1.06||1;
  const {list,mx}=catList();
  return barra()+`
  <div class="hero ${over?'over':'ok'}">
    <div class="lb">${over?'Se pasaron por':'Les queda'}</div>
    <div class="big">${fmt(Math.abs(disp-tl))}</div>
    <div class="cmp">Gastaron <b>${fmt(tl)}</b> de <b>${fmt(disp)}</b>${tf?` · <b>${fmt(tf)}</b> salió de fondos`:''}</div>
    ${(()=>{const dr=diasRest();
      if(!enHoy()||!dr)return '';
      if(tl>disp)return `<div class="pace">Quedan <b>${dr} ${dr===1?'día':'días'}</b> de esta ${modo==='q'?'quincena':'mes'}.</div>`;
      return `<div class="pace">Quedan <b>${dr} ${dr===1?'día':'días'}</b> · pueden gastar <b>${fmt((disp-tl)/dr)}</b> al día</div>`})()}
    <div class="meter"><i class="f" style="width:${Math.min(tl,disp)/esc2*100}%"></i>
      ${over?`<i class="x" style="left:${disp/esc2*100}%;width:${(tl-disp)/esc2*100}%"></i>`:''}
      <u style="left:calc(${disp/esc2*100}% - 1px)"></u></div>
    <div class="mrow">
      <button class="lnk" data-go2="fon">${pv?'apartado '+fmtK(pv)+' · fondos ›':'apartar para lo que ya viene ›'}</button>
      <button class="lnk" data-go2="aj">meta ${fmtK(ap)} · ajustar ›</button></div>
  </div>
  ${(()=>{const pd=pendientes();if(!pd.length)return '';
    const sp=pd.reduce((a,e)=>a+e.med,0);
    return `<div class="sec"><b>Todavía no ha llegado</b><span>${fmt(sp)} aprox.</span></div>
    ${pd.map(e=>`<button class="row pend" data-pend="${esc(e.k)}">
      ${icCat(e.cat)}
      <span class="tx"><b>${esc(e.n)}</b><span>${cadaTxt(e.cada)} · suele ser ${fmt(e.med)}</span></span>
      <span class="amt" style="font-size:13px;color:var(--brand);font-weight:500">Registrar</span></button>`).join('')}
    <p class="hint">Son cosas que ya vienen repitiéndose. Si alguna no aplica este periodo, ignórala — desaparece sola.</p>`})()}
  <div class="sec"><b>Por categoría</b><span>${list.length} ${list.length===1?'categor\u00eda':'categor\u00edas'} · vs. su promedio</span></div>
  ${list.length?list.map(x=>`<button class="row" data-cat="${x.c.id}">
    ${icCat(x.c.id)}
    <span class="tx"><b>${x.c.n}<i class="pc">${x.pc}%</i></b>
      <span class="mini-bar"><i style="width:${x.v/mx*100}%;background:${x.c.c}"></i>${x.p?`<u style="left:calc(${Math.min(x.p/mx*100,99)}% - 1px)"></u>`:''}</span></span>
    <span class="amt">${fmtK(x.v)}</span></button>`).join('')
   :'<p class="hint">Todavía no hay gastos en este periodo.</p>'}
  <p class="hint">El porcentaje es sobre el total gastado en ${modo==='q'?'la quincena':'el mes'}. La línea clara en cada barra es el promedio de ${modo==='q'?'las quincenas':'los meses'} anteriores.</p>
  <div class="spacer"></div>
  ${(()=>{if(H().length<2)return '';
    const cz=cierres[claveCierre()],hecho=!!(cz&&cz.saldado),cc=cuentas();
    if(cc.sinPacto)return '';
    const p=cc.pagos[0];
    return `<div class="cierrez"><button class="row" data-go2="cierre">
    <span class="ic" style="background:var(--surf3);color:var(--mute);font-size:16px">\u21c4</span>
    <span class="tx"><b>Cerrar cuentas</b><span>${hecho?'ya quedaron a paz y salvo'
      :p?esc(p.de)+' le transfiere '+fmtK(p.v)+' a '+esc(p.a):'nadie le debe nada a nadie'}</span></span>
    <span class="amt" style="font-size:13px;color:var(--brand);font-weight:500">${hecho?'Ver':'Abrir'}</span></button></div>`})()}`}

// Fecha en que se registro el gasto, en corto: hoy, ayer, o "4 oct".
const MESC=['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'];
const tsReg=g=>g.ce?(Date.parse(g.ce)||0):8.64e15;   // lo que aun no llega del servidor va arriba
function fechaReg(iso){
  if(!iso)return '';
  const d=new Date(iso); if(isNaN(d.getTime()))return '';
  const dia=x=>new Date(x.getFullYear(),x.getMonth(),x.getDate()).getTime();
  const h=new Date(), dif=Math.round((dia(h)-dia(d))/86400000);
  if(dif===0)return 'hoy';
  if(dif===1)return 'ayer';
  const t=d.getDate()+' '+MESC[d.getMonth()];
  return d.getFullYear()===h.getFullYear()?t:t+' '+d.getFullYear()}

function fila(g,sub,fecha){const an=g.cob>1,rc=recMap()[clave(g.n)];
  return `<button class="row" data-edit="${g.k}">
  ${icCat(g.cat)}
  <span class="tx"><b>${esc(g.n)}${an?`<span class="tag an">${g.cob} meses</span>`:''}${
    !an&&rc?`<span class="tag rc">\u21bb ${cadaTxt(rc.cada)}</span>`:''}</b>
  <span>${an?fmt(g.a/per(g))+' por quincena · cubre hasta '+hastaQ(g).toLowerCase():sub}</span></span>
  <span class="amt">${fmt(g.a)}${fecha?`<em>${fecha}</em>`:''}</span></button>`}

function vDet(){
  const c=CM[det],its=items(i).filter(g=>g.cat===det).sort((a,b)=>b.a-a.a),
        t=its.reduce((s,g)=>s+g.a,0),p=prom(det);
  return barra()+`<div class="det"><button class="back" data-back="1">‹ Volver</button>
    <h3>${c.n}</h3><div class="sum">${fmt(t)} · ${its.length} ${its.length===1?'apunte':'apuntes'}</div>
    ${p?`<p class="hint" style="margin:7px 2px 4px">${
      t>p?'<b>'+fmt(t-p)+'</b> más de lo que suelen gastar aquí'
     :t<p?'<b>'+fmt(p-t)+'</b> menos de lo que suelen gastar aquí'
     :'Van justo en su promedio'} · promedio ${fmt(p)}.</p>`:''}
    ${its.map(g=>fila(g,modo==='m'?g.q.split(' ')[1]+'ª quincena':(g.id&&nomPor(g.por)?nomPor(g.por):'&nbsp;'))).join('')}
    </div><div class="spacer"></div>`}

function vMov(){
  // En orden de ingreso, lo ultimo que registraron primero.
  const its=items(i).slice().sort((a,b)=>tsReg(b)-tsReg(a));
  return barra()+`<div class="sec"><b>${its.length} movimientos</b><span>${fmt(tot(i))}</span></div>
  ${its.length?its.map(g=>fila(g,CM[g.cat].n+(modo==='m'?' · '+g.q.split(' ')[1]+'ª q':'')+(g.id&&nomPor(g.por)?' · '+nomPor(g.por):''),fechaReg(g.ce))).join(''):'<p class="hint">Sin movimientos en este periodo.</p>'}
  <p class="hint">Toca cualquier gasto para corregirle el monto, el nombre o la categoría. También los del histórico.</p>
  <div class="spacer"></div>`}

// Quien esta usando la app, como integrante del hogar. Es el valor por defecto de
// "quien pago": se muestra desde el registro en vez de adivinarse despues al cerrar.
function yoSoy(){const hs=H(), u=(sesion&&sesion.user&&sesion.user.id)||'';
  return (u&&hs.find(x=>x.u===u))||hs[0]||{id:'',n:''}}
const atajos=()=>conocidos().filter(e=>e.v>=3).slice(0,7);
function catsTop(n){const c={};todos().forEach(g=>{c[g.cat]=(c[g.cat]||0)+1});
  return CATS.slice().sort((a,b)=>(c[b.id]||0)-(c[a.id]||0)).slice(0,n)}

function bloqueCob(){
  return `<div class="sec"><b>¿Esto cubre varios meses?</b></div>
  <div class="pills">${[[1,'No, es de ahora'],[3,'3 meses'],[6,'6 meses'],[12,'12 meses']].map(([v,t])=>
    `<button class="pill ${cob===v?'sel':''}" data-cob="${v}">${t}</button>`).join('')}</div>
  ${cob>1?`<p class="hint">Se registra completo hoy — la plata salió hoy. Pero para los promedios cuenta como
   <b>${fmt(+amt/(cob*2))}</b> por quincena, para que no distorsione lo que sigue.</p>`:''}`}

function bloqueFon(){if(!fondos().length)return '';
  return `<div class="sec"><b>¿Sale de un fondo?</b></div>
  <div class="pills"><button class="pill ${fon?'':'sel'}" data-fon="">No, de la quincena</button>
  ${fondos().map(f=>`<button class="pill ${fon===f.id?'sel':''}" data-fon="${f.id}">${esc(f.n)}</button>`).join('')}</div>
  ${fon&&FM()[fon]?`<p class="hint">No cuenta contra la meta de esta quincena: sale del saldo de
   <b>${esc(FM()[fon].n)}</b>, que hoy tiene ${fmt(saldo(FM()[fon],qIdx()))}.</p>`:''}`}

function formulario(modoEdit){
  const pesos=+amt||0, c=conceptos[clave(nota)], km=CM[cat],
        preCob=!modoEdit&&!c&&pesos>=umbral(),
        preFon=!modoEdit&&!c&&fondos().length&&pesos>=umbral()/2,
        at=atajos();
  return `
  ${!modoEdit&&ultimo?`<div class="saved"><span>Guardado <b>${esc(ultimo.n)}</b> · ${fmt(ultimo.a)}</span>
    <button data-undo="1">Deshacer</button></div>`:''}
  ${!modoEdit&&at.length?`<div class="sec"><b>Lo de siempre</b><span>toca y ajusta</span></div>
  <div class="sugn atj">${at.map(e=>`<button data-at="${esc(e.n)}" data-ac="${e.cat}" data-am="${Math.round(e.med)}">
    <span class="k" style="background:${(CM[e.cat]||{c:'#8A8378'}).c}"></span>
    <span><b>${esc(e.n)}</b><em>${fmtK(e.med)} de costumbre</em></span></button>`).join('')}</div>`:''}
  <div class="sec"><b>¿Cuánto?</b><span>en pesos</span></div>
  <div class="amtw"><span class="cur">$</span>
    <input class="amtin" id="amt" inputmode="numeric" enterkeyhint="next" placeholder="0"
      value="${amt?(+amt).toLocaleString('es-CO'):''}"></div>
  <div class="amtp" id="amtp">${pesos?'':'escribe el valor completo, por ejemplo 135000'}</div>
  ${H().length>1?`<div class="pagoq"><span class="pl2">Pag&oacute;</span>
    ${H().map((pp,k)=>`<button class="pers2${idPor(por)===pp.id?' sel':''}" data-por="${pp.id}">
      <span class="av3" style="background:${COLP[k%COLP.length]}">${esc((pp.n||'?').trim().charAt(0).toUpperCase()||'?')}</span>
      ${esc(pp.n)}</button>`).join('')}</div>`:''}
  <div class="sec"><b>¿Qué fue?</b></div>
  <input class="field" id="nota" placeholder="Rappi, Pricesmart, Urleny…" value="${esc(nota)}"
    autocomplete="off" enterkeyhint="done">
  <div class="sugn" id="sugn"></div>
  <p class="hint" id="sugh" hidden>Toca uno para usar el mismo nombre y su categoría.</p>
  ${(cat&&!catOpen)?`<button class="catchip" data-catopen="1">
    <span class="d" style="background:${km.c}"></span>
    <span class="t"><b>${km.n}</b><em>${c||conocidos().some(e=>clave(e.n)===clave(nota))?'la de siempre para '+esc(nota):'categoría escogida'}</em></span>
    <i>cambiar ›</i></button>`
   :`<div class="sec"><b>¿En qué?</b><span>${catOpen?'todas':'las que más usan'}</span></div>
  <div class="pills">${(catOpen?CATS:catsTop(5)).map(x=>`<button class="pill ${cat===x.id?'sel':''}" data-pick="${x.id}">
    <span class="d" style="background:${x.c}"></span>${x.n}</button>`).join('')}
    ${catOpen?'':'<button class="pill" data-catopen="1">Otras ›</button>'}</div>`}
  ${c?`<p class="hint">Ya sabíamos de <b>${esc(nota)}</b>: ${c.cob>1?'cubre '+c.cob+' meses':'gasto de la quincena'}${
    c.fon&&FM()[c.fon]?' · sale del fondo '+esc(FM()[c.fon].n):''}. Se aplica solo.</p>`:''}
  ${preCob?bloqueCob():''}
  ${preFon?bloqueFon():''}
  ${(!preCob||(!preFon&&fondos().length))?`<button class="more" data-more="1">${detOpen?'Ocultar detalles ▴':'Más detalles ▾'}</button>
  ${detOpen?`${preCob?'':bloqueCob()}${preFon?'':bloqueFon()}`:''}`:''}
  ${modoEdit?`<button class="btn" ${amt&&cat?'':'disabled'} data-upd="1">Guardar cambios</button>
    <button class="btn dan" data-rm2="1">Borrar este gasto</button>`
   :`<button class="btn" id="gb" ${amt&&cat?'':'disabled'} data-save="1">Guardar</button>`}
  <div class="spacer"></div>`}

function vReg(){const[a]=lbl(modo==='q'?i:Q.indexOf(MES[i]+' 2'));
  return topSimple('Nuevo gasto',a.toLowerCase(),false)+formulario(false)}
function vEdit(){const g=todos().find(x=>x.k===editKey);
  if(!g)return topSimple('Corregir','','mov')+'<p class="hint">Ese gasto ya no existe.</p><div class="spacer"></div>';
  return topSimple('Corregir gasto','registrado por ustedes','mov')+formulario(true)}

// --- cierre del periodo -------------------------------------------
// Quien pago: lo que diga el gasto; si no dice nada, quien lo registro.
function quienPago(g){
  const hs=H();
  if(g.por && hs.some(p=>p.id===g.por)) return g.por;
  if(g.cpor){const m=hs.find(p=>p.u===g.cpor); if(m) return m.id}
  return hs[0]?hs[0].id:'';
}
const claveDe=(m,k)=>m+'|'+(m==='q'?Q[k]:MES[k]);
const claveCierre=()=>claveDe(modo,i);
function entregado(){const c=cierres[claveCierre()];return (c&&c.ap)||{}}

// Lo pactado es un presupuesto y una proporcion, no una plata que alguien recoge.
// Al cerrar se reparte LO QUE DE VERDAD SE GASTO segun esa proporcion.
function cuentas(){
  const hs=H(), gs=items(i).filter(g=>!g.fon);
  const total=gs.reduce((a,g)=>a+g.a,0);
  const pago={}; hs.forEach(p=>pago[p.id]=0);
  gs.forEach(g=>{const k=quienPago(g); if(pago[k]!==undefined)pago[k]+=g.a});
  const perQ=p=>modo==='q'?(+p.a||0):(+p.a||0)*2;
  const pactTot=hs.reduce((a,p)=>a+perQ(p),0);
  const spc=hs.reduce((a,p)=>a+(+p.pct||0),0);
  const gente=hs.map(p=>{
    const pct = spc>0 ? (+p.pct||0)/spc
              : pactTot>0 ? perQ(p)/pactTot
              : 1/hs.length;
    const pg=pago[p.id]||0, toca=total*pct;
    return {id:p.id,n:p.n,pct,pact:perQ(p),pago:pg,toca,saldo:pg-toca}});
  const deb=gente.filter(x=>x.saldo<-500).map(x=>({...x,v:-x.saldo})).sort((a,b)=>b.v-a.v);
  const acr=gente.filter(x=>x.saldo>500).map(x=>({...x,v:x.saldo})).sort((a,b)=>b.v-a.v);
  const pagos=[]; let m=0,n=0;
  while(m<deb.length&&n<acr.length){
    const v=Math.min(deb[m].v,acr[n].v);
    if(v>500)pagos.push({de:deb[m].n,a:acr[n].n,v:Math.round(v/100)*100});
    deb[m].v-=v; acr[n].v-=v;
    if(deb[m].v<=500)m++; if(acr[n].v<=500)n++;
  }
  return {total,gente,pagos,pactTot,sobra:pactTot-total,sinPacto:spc<=0&&pactTot<=0};
}

function vInvitar(){
  if(!INV) INV={email:'',url:null,err:null};
  const hs=H(), libre=hs.find(x=>!x.u);
  return topSimple('Invitar a alguien','para que entre a este hogar','cfg')+`
  ${INV.url?`
  <div class="ins good"><h4>Listo, el enlace ya existe</h4>
    <p>M\u00e1ndaselo por WhatsApp o como prefieras. Al abrirlo entra a <b>${esc(CFG.nombre||'este hogar')}</b>
    con su propio correo, y ve las mismas cuentas que t\u00fa. Vence en 14 d\u00edas y sirve una sola vez.</p></div>
  <div class="enl">${esc(INV.url)}</div>
  <button class="btn" data-share="1">Compartir</button>
  <button class="btn sec2" data-copiar="1">Copiar el enlace</button>
  <p class="hint" id="cpok"></p>
  <button class="glink" data-otroenl="1">Crear otro enlace</button>
  `:`
  <p class="hint">${libre
    ? 'Esta invitaci\u00f3n es para <b>'+esc(libre.n)+'</b>, que ya est\u00e1 en el hogar pero todav\u00eda no tiene cuenta. Al aceptarla, queda enganchada a esa persona \u2014 no se agrega a nadie m\u00e1s.'
    : 'Todos los del hogar ya tienen cuenta. Si creas esta invitaci\u00f3n, se agrega una persona nueva al hogar.'}</p>
  <label class="glab2">\u00bfA qu\u00e9 correo se la vas a mandar?</label>
  <input class="field" id="invmail" type="email" inputmode="email" autocomplete="off"
    placeholder="correo@ejemplo.com" value="${esc(INV.email)}">
  <p class="hint">Solo queda anotado para que sepas a qui\u00e9n se la mandaste. Ella entra con el correo que quiera.</p>
  ${INV.err?`<div class="ins"><h4>No se pudo crear</h4><p>${esc(INV.err)}</p></div>`:''}
  <button class="btn" data-crear="1">Crear el enlace</button>`}
  <div class="spacer"></div>`}

function vCierre(){
  const viva=cuentas(), hs=H(),
        cerr=cierres[claveCierre()], firme=cerr&&cerr.saldado,
        foto=firme&&cerr.ap&&cerr.ap._foto,
        c=foto?{...viva,...foto,sobra:foto.pactTot-foto.total}:viva,
        {total,gente,pagos,pactTot,sobra,sinPacto}=c,
        et=modo==='q'?'quincena':'mes',
        nom=modo==='q'?Q[i].toLowerCase():MES[i].toLowerCase();
  if(hs.length<2) return topSimple('Cerrar cuentas','','home')+`
    <p class="hint">El cierre sirve cuando viven dos o m\u00e1s personas. Agrega a quien viva contigo
    en Ajustes \u2192 El hogar y vuelve ac\u00e1.</p><div class="spacer"></div>`;
  if(sinPacto) return topSimple('Cerrar cuentas',nom,'home')+`
    <p class="hint">Primero pacten c\u00f3mo se reparten los gastos, en Ajustes \u2192 El hogar.
    Sin eso no hay con qu\u00e9 cruzar.</p>
    <button class="btn sec2" data-go2="aj">Ir a El hogar</button><div class="spacer"></div>`;
  const pc=x=>Math.round(x.pct*100);
  return topSimple('Cerrar cuentas',nom,'home')+`
  ${firme?`<div class="ins good"><h4>Ya quedaron a paz y salvo</h4>
    <p>Cerraron el ${new Date(cerr.en).toLocaleDateString('es-CO',{day:'numeric',month:'long'})}.
    ${foto?'Estos son los n\u00fameros con los que cerraron, aunque despu\u00e9s hayan cambiado el presupuesto.':''}</p>
    <button class="btn sec2" data-reabrir="1">Reabrir el cierre</button></div>`:''}

  <div class="hero"><div class="lb">Se gast\u00f3 en ${et==='quincena'?'la quincena':'el mes'}</div>
    <div class="big">${fmt(total)}</div>
    <div class="cmp">repartido ${gente.map(x=>pc(x)+'%').join(' / ')} como lo pactaron</div></div>

  <div class="sec"><b>Lo que puso cada uno</b></div>
  ${gente.map((x,k)=>`<div class="pers">
    <div class="ph">
      <span class="av2" style="background:${COLP[k%COLP.length]}">${esc((x.n||'?').charAt(0).toUpperCase())}</span>
      <b style="flex:1;font-size:15px">${esc(x.n)} <span class="tag ed">${pc(x)}%</span></b>
      <span style="font-size:13px;color:${x.saldo>500?'var(--good)':x.saldo<-500?'var(--brand)':'var(--faint)'}">${
        x.saldo>500?'puso '+fmt(x.saldo)+' de m\u00e1s':x.saldo<-500?'le faltan '+fmt(-x.saldo):'al d\u00eda'}</span>
    </div>
    <div class="pl"><span>Le tocaba<em>${pc(x)}% de ${fmt(total)}</em></span>
      <b style="color:var(--ink);font-size:15px">${fmt(x.toca)}</b></div>
    <div class="pl"><span>Pag\u00f3 gastos del hogar</span>
      <b style="color:var(--mute);font-size:15px">${fmt(x.pago)}</b></div>
  </div>`).join('')}

  <div class="sec"><b>El cierre</b></div>
  ${pagos.length?pagos.map(p=>`<div class="ins"><h4>${esc(p.de)} le transfiere ${fmt(p.v)} a ${esc(p.a)}</h4>
     <p>Con eso cada uno queda habiendo puesto su parte.</p></div>`).join('')
   :`<div class="ins good"><h4>No se deben nada</h4><p>Cada uno ya puso lo que le correspond\u00eda.</p></div>`}

  <div class="ins ${sobra<0?'':'good'}"><h4>${sobra>=0?'Sobraron '+fmt(sobra)+' de lo pactado':'Se pasaron '+fmt(-sobra)+' de lo pactado'}</h4>
    <p>${sobra>=0
      ?`Hab\u00edan pactado ${fmt(pactTot)} y gastaron ${fmt(total)}. Esa plata no hizo falta ponerla.`
      :`Hab\u00edan pactado ${fmt(pactTot)} y gastaron ${fmt(total)}. Si se repite, toca subir la cuota o recortar.`}</p></div>

  ${firme?'':'<button class="btn" data-cerrar="1">Marcar como saldado</button>'}
  <p class="hint">Se toma como pagador a quien registr\u00f3 cada gasto; si lo pag\u00f3 el otro, c\u00e1mbialo en
   Movimientos antes de cerrar. Lo que sale de un fondo no entra en el cruce.</p>
  <div class="spacer"></div>`}

function vAn(){
  const t=tot(i),ap=Math.max(APORTE()-prov(i),0);
  if(!t)return barra()+'<p class="hint">Registra algunos gastos y aquí aparece la lectura del periodo.</p><div class="spacer"></div>';
  const gaps=CATS.map(c=>({c,v:costo(i,c.id),p:prom(c.id)})).filter(x=>x.p>0).map(x=>({...x,d:x.v-x.p})).sort((a,b)=>b.d-a.d);
  const peor=gaps[0],cub=cubiertos();
  return barra()+`
  ${!hayMeta()?'':t>ap?`<div class="ins"><h4>${modo==='q'?'Esta quincena':'Este mes'} no alcanzó</h4>
    <p>Gastaron <span class="a">${fmt(t)}</span> contra ${fmt(ap)} disponibles. Faltaron <b>${fmt(t-ap)}</b>.</p></div>`
   :`<div class="ins good"><h4>Van dentro de la meta</h4><p>Gastaron ${fmt(t)} y quedan <span class="a">${fmt(ap-t)}</span>.</p></div>`}
  ${peor&&peor.d>0?`<div class="ins"><h4>Lo que se salió de lo normal</h4>
    <p><b>${peor.c.n}</b> va en <span class="a">${fmt(peor.v)}</span> contra un promedio de ${fmt(peor.p)}. Son ${fmt(peor.d)} de más.</p></div>`:''}
  ${cub.length?`<div class="ins good"><h4>Ya está pagado</h4>
    <p>Esto lo pagaron por adelantado y todavía les cubre:</p>
    ${cub.map(g=>`<div class="cov"><span>${esc(g.n)}<em>hasta ${hastaQ(g).toLowerCase()}</em></span>
      <b>${fmt(g.a/per(g))}<em>por quincena</em></b></div>`).join('')}</div>`:''}
  <div class="spacer"></div>`}


/* ---------- meta y aportes ---------- */
const hayMeta=()=>(+CFG.meta>0)||metas.length>0;
function qsConDatos(){const T=todos(),v=[];
  for(let k=0;k<qIdx();k++){const s=T.filter(g=>g.q===Q[k]).reduce((a,g)=>a+g.a,0);if(s>0)v.push(s)}
  return v}
function sugInicial(){const v=qsConDatos();if(v.length<2)return 0;
  const u=v.slice(-6).sort((a,b)=>a-b),n=u.length;
  const med=n%2?u[(n-1)/2]:(u[n/2-1]+u[n/2])/2;
  return Math.round(med/50000)*50000}
const listaY=a=>a.length<2?a.join(''):a.slice(0,-1).join(', ')+' y '+a[a.length-1];

function sugerida(){const T=todos(),v=[];
  for(let k=0;k<qIdx();k++){const s=T.filter(g=>g.q===Q[k]).reduce((a,g)=>a+g.a,0);if(s>0)v.push(s)}
  if(v.length<3)return 0;
  const u=v.slice(-6).sort((a,b)=>a-b),n=u.length;
  const med=n%2?u[(n-1)/2]:(u[n/2-1]+u[n/2])/2;
  return Math.round(med/50000)*50000}
const sumaAp=()=>(AJ.hogar||[]).reduce((s,p)=>s+(+p.a||0),0);
const sumaDesc=()=>(AJ.hogar||[]).reduce((s,p)=>s+(+p.d||0),0);
const metaAJ=()=>sumaAp();
const miles=v=>v?(+v).toLocaleString('es-CO'):'';

// El reparto se pacta en porcentajes: es mas facil decir "mitad y mitad"
// que teclear dos montos. Por dentro se guarda como monto por persona.
function repInit(){
  const hs=AJ.hogar||[];
  // Siembra con el pacto que manda en el periodo donde esta parado el usuario,
  // no con el ultimo que se guardo: asi el campo no miente sobre a que periodo pertenece.
  if(AJ.tot===undefined){const vg=APORTE();
    AJ.tot = vg>0?vg:hs.reduce((a,p)=>a+(+p.a||0),0)}
  if(!AJ.pcs){AJ.pcs={};
    const sp=hs.reduce((a,p)=>a+(+p.pct||0),0), t=hs.reduce((a,p)=>a+(+p.a||0),0);
    hs.forEach(p=>AJ.pcs[p.id]= sp>0?Math.round((+p.pct||0)/sp*100)
                              : t>0?Math.round((+p.a||0)/t*100)
                              : Math.round(100/hs.length));
    AJ.igual = hs.every(p=>Math.abs(AJ.pcs[p.id]-100/hs.length)<1);
  }
  hs.forEach(p=>{if(AJ.pcs[p.id]===undefined)AJ.pcs[p.id]=0});
}
function repAplica(){
  const hs=AJ.hogar||[], n=hs.length;
  if(AJ.igual) hs.forEach((p,k)=>AJ.pcs[p.id]= k===0?100-Math.round(100/n)*(n-1):Math.round(100/n));
  hs.forEach(p=>p.pct=AJ.pcs[p.id]||0);
  let resto=+AJ.tot||0;
  hs.forEach((p,k)=>{
    if(k===n-1){p.a=Math.max(resto,0)}
    else{const v=Math.round((+AJ.tot||0)*(AJ.pcs[p.id]||0)/100/1000)*1000;p.a=v;resto-=v}});
}
const sumaPcs=()=>(AJ.hogar||[]).reduce((a,p)=>a+(+AJ.pcs[p.id]||0),0);

// Nombre legible del periodo donde esta parado el usuario.
function perNom(k){if(k===undefined)k=i;
  if(modo==='m')return MES[k].toLowerCase();
  const p=Q[k].split(' ');return p[0].toLowerCase()+', '+(p[1]==='1'?'1&ordf;':'2&ordf;')+' quincena'}
const cap=t=>t.charAt(0).toUpperCase()+t.slice(1);
// Reparto acordado, leido como 50/50.
function pcTxt(){const hs=CFG.hogar||[],sp=hs.reduce((a,p)=>a+(+p.pct||0),0);
  if(hs.length<2||sp<=0)return '';
  return ', repartido '+hs.map(p=>Math.round((+p.pct||0)/sp*100)).join('/')}

function vAjustes(){
  repInit(); repAplica();
  const m=metaAJ(),sug=sugerida(),q=Q[qIdx()].toLowerCase(),
        hs=AJ.hogar||[],
        ms=metas.slice().sort((x,y)=>Q.indexOf(x.desde)-Q.indexOf(y.desde)),
        dif=sug&&m?Math.abs(sug-m)/m:0, sp=sumaPcs();
  // Historia de pactos: el inicial mas cada cambio, y cual manda en este periodo.
  const pactos=[{id:'',v:+CFG.meta||0,desde:Q[0],base:1}].concat(ms).filter(x=>x.v>0);
  let vi=-1; pactos.forEach((x,k)=>{if(Q.indexOf(x.desde)<=qIdx())vi=k});
  return topSimple('El hogar','qui\u00e9nes viven aqu\u00ed y c\u00f3mo se reparten','cfg')+`
  ${APORTE()>0?`<div class="ins"><h4>Hoy rige ${fmt(APORTE())}</h4>
  <p>Es el pacto de <b>${perNom()}</b>${pcTxt()}. Lo que cambies aqu&iacute; empieza a valer
  desde ese periodo &mdash; lo anterior se queda como est&aacute;.</p></div>`:''}
  <div class="sec"><b>\u00bfQui\u00e9nes viven aqu\u00ed?</b><span>${hs.length===1?'1 persona':hs.length+' personas'}</span></div>
  ${hs.map((pp,k)=>`<div class="ph" style="margin-bottom:8px">
      <span class="av2" style="background:${COLP[k%COLP.length]}">${esc((pp.n||'?').trim().charAt(0).toUpperCase()||'?')}</span>
      <input data-ph="${k}" value="${esc(pp.n||'')}" placeholder="Nombre" autocomplete="off">
      ${hs.length>1?`<button class="x" data-rmp="${k}">Quitar</button>`:''}
    </div>`).join('')}
  <button class="addp" data-addp="1">+ Agregar otra persona</button>

  <div class="sec"><b>\u00bfCada cu\u00e1nto hacen cuentas?</b></div>
  <div class="seg"><button data-perj="q" class="${(AJ.per||'q')==='q'?'on':''}">Por quincena</button>
    <button data-perj="m" class="${AJ.per==='m'?'on':''}">Por mes</button></div>

  <div class="sec"><b>\u00bfCu\u00e1nto esperan gastar en ${perNom()}?</b></div>
  <div class="amtw"><span class="cur">$</span>
    <input class="amtin" id="htot" inputmode="numeric" placeholder="0"
      value="${AJ.tot?(+AJ.tot).toLocaleString('es-CO'):''}"></div>
  ${sug&&dif>0.08?`<p class="hint">En sus \u00faltimas quincenas gastaron <b>${fmt(sug)}</b>.
    <button class="lnk" data-usar="${sug}" style="display:inline">usar esa cifra \u203a</button></p>`:''}

  ${hs.length>1?`
  <div class="sec"><b>\u00bfC\u00f3mo se reparten los gastos?</b></div>
  <div class="seg"><button data-igual="1" class="${AJ.igual?'on':''}">Por partes iguales</button>
    <button data-igual="0" class="${AJ.igual?'':'on'}">En otra proporci\u00f3n</button></div>
  ${AJ.igual?'':`
  ${hs.map((pp,k)=>`<div class="pl"><span>${esc(pp.n||'Persona '+(k+1))}</span>
    <input data-pct="${pp.id}" inputmode="numeric" maxlength="3"
      value="${AJ.pcs[pp.id]||0}" style="text-align:right;width:70px"></div>`).join('')}
  <p class="hint" style="color:${sp===100?'var(--faint)':'var(--brand)'}">Suman ${sp}%${sp===100?'':' \u2014 tienen que sumar 100'}</p>`}
  <div class="goal"><div class="l">Les toca poner</div>
    ${hs.map((pp,k)=>`<div class="pl" style="border:0"><span>${esc(pp.n||'Persona '+(k+1))} \u00b7 ${AJ.pcs[pp.id]||0}%</span>
      <b style="color:var(--ink);font-size:16px">${fmt(pp.a)}</b></div>`).join('')}
  </div>`:`
  <div class="goal"><div class="l">Meta de la quincena</div>
    <div class="v">${fmt(m)}</div><div class="d">lo que pones t\u00fa</div></div>`}

  <div class="sec"><b>\u00bfDesde cu\u00e1ndo vale esto?</b></div>
  <div class="seg"><button data-vig="desde" class="${vig==='desde'?'on':''}">Desde esta ${modo==='m'?'mes':'quincena'}</button>
  <button data-vig="siempre" class="${vig==='siempre'?'on':''}">Corregir el pasado</button></div>
  <p class="hint">${vig==='desde'
    ? 'Lo anterior se queda como est\u00e1. De <b>'+q+'</b> en adelante, '+fmt(m)+'.'
    : '<b>Todo</b> el historial pasa a '+fmt(m)+', incluidas las '+(modo==='m'?'meses':'quincenas')+' que ya cerraron. \u00dasalo solo si el valor anterior estaba mal puesto.'}</p>
  ${pactos.length>1?`
  <div class="sec"><b>Pactos por periodo</b></div>
  ${pactos.map((x,k)=>`<div class="row">
    <span class="ic" style="background:${k===vi?'var(--good-dim)':'var(--surf3)'};color:${k===vi?'var(--good)':'var(--mute)'};font-size:16px">${k===vi?'&#10003;':'&middot;'}</span>
    <span class="tx"><b>${fmt(x.v)}</b><span>${x.base?'desde el principio':'desde '+x.desde.toLowerCase()}${k===vi?' &middot; rige ahora':''}</span></span>
    ${x.base?'':`<button class="x" data-rmeta="${x.id}">Quitar</button>`}</div>`).join('')}
  <p class="hint">Cada pacto manda desde su periodo hasta que empieza el siguiente.
  Si quitas uno, el anterior vuelve a mandar.</p>`:''}

  <button class="btn" data-gaj="1">Guardar</button>
  <div class="spacer"></div>`}

function usarSug(v){AJ.tot=v;render()}
function agregaPers(){const id=uid4();
  AJ.hogar=(AJ.hogar||[]).concat([{id,n:'',a:0,d:0}]);
  if(AJ.pcs){AJ.pcs[id]=0; if(AJ.igual)AJ.pcs=null}
  render()}
function quitaPers(k){if((AJ.hogar||[]).length<2)return;
  const p=AJ.hogar[k];if(AJ.pcs&&p)delete AJ.pcs[p.id];
  AJ.hogar.splice(k,1);if(AJ.igual)AJ.pcs=null;render()}

async function guardarAj(){
  const m=metaAJ(),hs=(AJ.hogar||[]).map((pp,k)=>({id:pp.id||uid4(),n:(pp.n||'').trim()||('Persona '+(k+1)),
    a:+pp.a||0,pct:+pp.pct||0,d:0})),
    nuevo={...CFG,hogar:hs,p1:hs[0]?hs[0].n:'Yo',p2:hs[1]?hs[1].n:'Pareja',
      a1:hs[0]?hs[0].a:0,a2:hs[1]?hs[1].a:0,desc:0,per:AJ.per==='m'?'m':'q'};
  if(vig==='siempre'){nuevo.meta=m;const viejas=metas.slice();metas=[];
    if(db){try{await Promise.all(viejas.map(x=>db.collection('metas').doc(x.id).delete()))}catch(e){}}}
  else{const id=uid4(),e2={id,v:m,desde:Q[qIdx()]};
    metas=metas.filter(x=>x.desde!==e2.desde).concat([e2]);
    if(db){try{await db.collection('metas').doc(id).set(e2)}catch(e){}}}
  CFG=nuevo;
  if(db){try{await db.collection('config').doc('hogar').set(CFG)}catch(e){}}
  AJ=null;aplicaPer();view='home';det=null;render()}
async function quitarMeta(id){metas=metas.filter(x=>x.id!==id);render();
  if(db){try{await db.collection('metas').doc(id).delete()}catch(e){}}}


/* ---------- fondos ---------- */
function tarjetaFondo(f,k){const sd=saldo(f,k);
 if(esMeta(f)){const pr=Math.min(sd/f.meta*100,100),r=faltanQ(f,k),listo=sd>=f.meta;
  return `<div class="fond mta">
   <div class="fh"><b>${esc(f.n)}</b><button class="x" data-rmf="${f.id}">Quitar</button></div>
   <div class="fr"><span>${listo?'\u00a1Ya la tienen completa!':'Meta de '+fmt(f.meta)+(f.mes?' \u00b7 a '+f.mes+' meses':'')}</span><b>${fmt(sd)}</b></div>
   <div class="pgr ${listo?'done':''}"><i style="width:${Math.max(pr,1)}%"></i></div>
   <div class="pc2"><span><b>${Math.round(pr)}%</b> reunido</span>
     <span>${listo?'no se aparta m\u00e1s':(r?'faltan '+r+' quincenas \u00b7 '+llegaEn(f,k).toLowerCase():'')}</span></div>
   <input class="field mo" data-fc="${f.id}" inputmode="numeric" value="${miles(f.c)}">
   <div class="fl">cuota por quincena \u00b7 apartando desde ${f.desde.toLowerCase()}</div>
  </div>`}
 return `<div class="fond">
   <div class="fh"><b>${esc(f.n)}</b><button class="x" data-rmf="${f.id}">Quitar</button></div>
   <div class="fr"><span>${f.d?esc(f.d):'fondo propio'}</span></div>
   <div class="fr" style="margin-top:9px"><span>Saldo acumulado</span><b>${fmt(sd)}</b></div>
   <input class="field mo" data-fc="${f.id}" inputmode="numeric" value="${miles(f.c)}">
   <div class="fl">cuota por quincena \u00b7 apartando desde ${f.desde.toLowerCase()}</div>
 </div>`}

function vFondos(){const k=qIdx(),fs=fondos(),
  mt=fs.filter(esMeta),fd=fs.filter(f=>!esMeta(f)),
  tc=fs.reduce((s,f)=>s+aporta(f,k),0),
  ts=fs.reduce((s,f)=>s+saldo(f,k),0),
  nq=NM&&NM.mes?NM.mes*2:0,
  cuota=nq&&NM.meta?Math.ceil(NM.meta/nq/10000)*10000:0;
 return topSimple('Fondos y metas','plata que apartan cada quincena','cfg')+`
 <div class="goal"><div class="l">Apartan por quincena</div><div class="v">${fmt(tc)}</div>
   <div class="d">saldo acumulado hoy ${fmt(ts)}</div></div>
 <div class="ins" style="margin-top:16px"><h4>Ojo con esto</h4>
   <p>TUQUI no mueve la plata. Para que esto sirva, ese saldo deber\u00eda estar en otra cuenta o en un
   bolsillo aparte \u2014 si se queda en la cuenta del diario, se gasta y queda en el papel.</p></div>

 <div class="sec"><b>Lo que quieren</b><span>monto y plazo</span></div>
 ${mt.length?mt.map(f=>tarjetaFondo(f,k)).join('')
  :'<p class="hint">Un paseo, el carro, la cuota inicial. Le ponen nombre, cu\u00e1nto y para cu\u00e1ndo, y la app calcula cu\u00e1nto apartar cada quincena.</p>'}
 <div class="prow">
   <input class="field nm" data-nm="n" value="${esc(NM?NM.n:'')}" placeholder="Paseo, carro, cuota inicial\u2026" autocomplete="off">
   <input class="field mo" data-nm="meta" inputmode="numeric" value="${NM?miles(NM.meta):''}" placeholder="0"></div>
 <div class="pills" style="margin-top:10px">${[3,6,12,18,24].map(m=>
   `<button class="pill ${NM&&NM.mes===m?'sel':''}" data-nmes="${m}">${m} meses</button>`).join('')}</div>
 ${cuota?`<div class="calcq">Para reunir ${fmt(NM.meta)} en ${NM.mes} meses apartan
   <b>${fmt(cuota)} por quincena</b>
   <span style="display:block;margin-top:5px;font-size:11px;color:var(--faint)">llegan en ${
     (()=>{const x=k+nq,y=2026+Math.floor(x/24),z=((x%24)+24)%24;return MES[Math.floor(z/2)].toLowerCase()+' '+y})()}</span></div>`:''}
 <button class="btn" data-crm="1" ${NM&&NM.n&&NM.meta&&NM.mes?'':'disabled'}>Crear meta</button>

 ${sugs().length?`<div class="sec"><b>Propuestas</b><span>no descuentan nada todav\u00eda</span></div>
 ${sugs().map(x=>`<div class="fond">
   <div class="fh"><b>${esc(x.n)}</b></div>
   <div class="fr" style="display:block"><span>${esc(x.w)}</span></div>
   <div class="fr" style="margin-top:10px"><span>Sugerido</span><b>${fmt(x.c)}</b></div>
   <div class="fl">por quincena, del promedio de sus 9 meses</div>
   <button class="btn" data-okf="${x.id}">Apartar ${fmt(x.c)} por quincena</button>
   <button class="btn dan" data-nof="${x.id}">No, gracias</button>
 </div>`).join('')}`:''}

 <div class="sec"><b>Lo que ya viene</b><span>fondos sin fecha</span></div>
 ${fd.length?fd.map(f=>tarjetaFondo(f,k)).join(''):'<p class="hint">No hay fondos. Crea uno abajo.</p>'}
 <div class="prow">
   <input class="field nm" data-nf="n" value="${esc(NF?NF.n:'')}" placeholder="Para qu\u00e9 es" autocomplete="off">
   <input class="field mo" data-nf="c" inputmode="numeric" value="${NF?miles(NF.c):''}" placeholder="0"></div>
 <p class="hint">El monto es por quincena. Si sabes el total del a\u00f1o, div\u00eddelo entre 24.</p>
 <button class="btn" data-crf="1" ${NF&&NF.n&&NF.c?'':'disabled'}>Crear fondo</button>

 <div class="spacer"></div>`}

async function guardaFondo(id,c){const f=fondos().find(x=>x.id===id);if(!f)return;
  const o={id,n:f.n,c:+c||0,desde:f.desde,d:f.d||'',meta:f.meta||0,hasta:f.hasta||''};fondOv[id]=o;
  if(db){try{await db.collection('fondos').doc(id).set(o)}catch(e){}}}
async function quitaFondo(id){fondOv[id]={id,del:true};render();
  if(db){try{await db.collection('fondos').doc(id).set({id,del:true})}catch(e){}}}
async function aceptaSug(id){const x=SUG.find(y=>y.id===id);if(!x)return;
  const o={id,n:x.n,c:x.c,desde:Q[qIdx()],d:x.d};fondOv[id]=o;render();
  if(db){try{await db.collection('fondos').doc(id).set(o)}catch(e){}}}
async function descartaSug(id){fondOv[id]={id,del:true};render();
  if(db){try{await db.collection('fondos').doc(id).set({id,del:true})}catch(e){}}}
async function olvidar(k){delete conceptos[k];render();
  if(db){try{await db.collection('conceptos').doc(k).delete()}catch(e){}}}
async function crearMeta(){if(!NM||!NM.n||!NM.meta||!NM.mes)return;
  const k=qIdx(),nq=NM.mes*2,
        c=Math.ceil(NM.meta/nq/10000)*10000,id=uid4(),
        o={id,n:NM.n.trim(),c,desde:Q[k],d:'',meta:+NM.meta,mes:NM.mes};
  fondOv[id]=o;NM={n:'',meta:0,mes:0};render();
  if(db){try{await db.collection('fondos').doc(id).set(o)}catch(e){}}}
async function crearFondo(){if(!NF||!NF.n||!NF.c)return;
  const id=uid4(),o={id,n:NF.n.trim(),c:+NF.c||0,desde:Q[qIdx()],d:''};
  fondOv[id]=o;NF={n:'',c:0};render();
  if(db){try{await db.collection('fondos').doc(id).set(o)}catch(e){}}}
function pintaCuota(){const b=document.querySelector('[data-crm]');
  if(b)b.disabled=!(NM&&NM.n&&NM.meta&&NM.mes)}
function pintaSug(){const c=document.getElementById('sugn');if(!c)return;
  const l=sugNombres(nota);
  c.innerHTML=l.map(e=>{const k=CM[e.cat]||{n:'?',c:'#8A8378'};
    return `<button data-sn="${esc(e.n)}" data-sc="${e.cat}">
      <span class="k" style="background:${k.c}"></span>
      <span><b>${esc(e.n)}</b><em>${k.n}${e.mix?' y otras':''} \u00b7 ${e.v===1?'1 vez':e.v+' veces'} \u00b7 ${fmtK(e.med)}</em></span>
    </button>`}).join('');
  const h=document.getElementById('sugh');if(h)h.hidden=!l.length;
  c.querySelectorAll('[data-sn]').forEach(b=>b.onmousedown=b.ontouchstart=ev=>{ev.preventDefault();
    nota=b.dataset.sn; cat=cat||b.dataset.sc; catOpen=false;
    const n=document.getElementById('nota');if(n)n.value=nota;render()})}

/* ---------- configuraci\u00f3n ---------- */
function vConfig(){const k=qIdx(),hs=H(),
  ap=hs.reduce((x,p)=>x+(+p.a||0),0)-hs.reduce((x,p)=>x+(+p.d||0),0),
  fs=fondos(),tc=fs.reduce((x,f)=>x+aporta(f,k),0),
  nm=fs.filter(esMeta).length,nf=fs.length-nm,
  ncc=Object.keys(conceptos).length;
 return topSimple('Configuraci\u00f3n','todo se puede cambiar cuando quieran','home')+`
 <button class="cfgr" data-go2="aj">
   <span class="ci"><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"><circle cx="9" cy="8" r="3.2"/><path d="M3.5 19c.6-3 2.8-4.6 5.5-4.6s4.9 1.6 5.5 4.6"/><circle cx="17.5" cy="8.5" r="2.4"/><path d="M16 13.6c2.6-.3 4.4 1.2 4.9 4"/></svg></span>
   <span class="ct"><b>El hogar</b><span>${hs.map(p=>esc(p.n)).join(', ')} \u00b7 meta ${fmt(ap)} por quincena</span></span>
   <i>\u203a</i></button>
 <button class="cfgr" data-go2="fon">
   <span class="ci"><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"><path d="M4 8.5h16v10a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 18.5z"/><path d="M7 8.5V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2.5"/><path d="M12 12.5v3.5"/></svg></span>
   <span class="ct"><b>Fondos y metas</b><span>${fs.length?`${nm} meta${nm===1?'':'s'} y ${nf} fondo${nf===1?'':'s'} \u00b7 ${fmt(tc)} por quincena`:'todav\u00eda no apartan nada'}</span></span>
   <i>\u203a</i></button>
 <button class="cfgr" data-go2="cats">
   <span class="ci"><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"><path d="M4 5.5h7v14H4z"/><path d="M13 5.5h7v14h-7z"/><path d="M6 9h3M15 9h3M6 12.5h3M15 12.5h3"/></svg></span>
   <span class="ct"><b>Qu\u00e9 va en cada categor\u00eda</b><span>${CATS.length} categor\u00edas con su definici\u00f3n</span></span>
   <i>\u203a</i></button>
 <button class="cfgr" data-go2="apr">
   <span class="ci"><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"><path d="M4.5 12.5 9 17l10.5-10"/></svg></span>
   <span class="ct"><b>Lo que la app aprendi\u00f3</b><span>${ncc?ncc+' concepto'+(ncc===1?'':'s')+' con respuesta guardada':'todav\u00eda no ha aprendido nada'}</span></span>
   <i>\u203a</i></button>
 <button class="cfgr" data-go2="inv">
   <span class="ci"><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"><path d="M4 6.5h16v11H4z"/><path d="m4.6 7.2 7.4 5.3 7.4-5.3"/></svg></span>
   <span class="ct"><b>Invitar a alguien</b><span>mandarle un enlace para que entre a este hogar</span></span>
   <i>\u203a</i></button>
 <button class="cfgr" data-out="1">
   <span class="ci" style="color:var(--brand)"><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"><path d="M14 4.5H6.5A1.5 1.5 0 0 0 5 6v12a1.5 1.5 0 0 0 1.5 1.5H14"/><path d="M17 8.5 20.5 12 17 15.5M20 12H10"/></svg></span>
   <span class="ct"><b>Cerrar sesión</b><span>${(sesion&&sesion.user&&sesion.user.email)||''}</span></span>
   <i>\u203a</i></button>
 <button class="cfgr" data-upd="1">
   <span class="ci"><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"><path d="M20 12a8 8 0 1 1-2.6-5.9"/><path d="M20 4v4.5h-4.5"/></svg></span>
   <span class="ct"><b>Buscar actualizaci\u00f3n</b><span id="vst">versi\u00f3n ${verBonita(MIVER)}</span></span>
   <i>\u203a</i></button>
 <p class="hint">El hogar puede cambiar: alguien entra, alguien sale, o cambia lo que pone cada uno.
 Nada de esto queda fijo desde el principio \u2014 se ajusta aqu\u00ed cuando pase.</p>
 <div class="spacer"></div>`}

function vCats(){
 // Si alguna categoria nueva se queda sin grupo, no desaparece: cae al final.
 const dentro={}; GRUPOS.forEach(g=>g.ids.forEach(x=>dentro[x]=1));
 const sueltas=CATS.filter(c=>!dentro[c.id]).map(c=>c.id);
 const gs=sueltas.length?GRUPOS.concat([{t:'Otras',ids:sueltas}]):GRUPOS;
 return topSimple('Qu&eacute; va en cada una',CATS.length+' categor&iacute;as','cfg')+`
 <div class="ins"><h4>Para que los dos cuenten igual</h4>
 <p>Si uno mete la peluquer&iacute;a en Bienestar y el otro en Personal, el reporte no sirve.
 Esta es la raya acordada.</p></div>
 ${gs.map(g=>`<span class="glab3">${g.t}</span>
   ${g.ids.map(id=>{const c=CM[id];return c?`<div class="row def">
     ${icCat(id)}
     <span class="tx"><b>${c.n}</b><span>${DEF[id]||''}</span></span></div>`:''}).join('')}`).join('')}
 <p class="hint">Si algo no cuadra en ninguna, va en <b>Personal y ocio</b>.
 Lo importante no es en cu&aacute;l va, sino que siempre vaya en la misma.</p>
 <div class="spacer"></div>`}

function vAprend(){const cs=Object.values(conceptos);
 return topSimple('Lo que la app aprendi\u00f3','de sus respuestas','cfg')+`
 ${cs.length?cs.map(c=>`<button class="row" data-olv="${c.k}">
   <span class="ic" style="background:var(--surf3);color:var(--mute);font-size:16px">\u2713</span>
   <span class="tx"><b>${esc(c.n)}</b><span>${c.cob>1?'cubre '+c.cob+' meses':'gasto de la quincena'}${
     c.fon&&FM()[c.fon]?' \u00b7 fondo '+esc(FM()[c.fon].n):''}</span></span>
   <span class="amt" style="font-size:13px;color:var(--brand);font-weight:500">Olvidar</span></button>`).join('')
  :'<p class="hint">Cuando respondan por primera vez si un gasto cubre varios meses o sale de un fondo, la respuesta queda aqu\u00ed.</p>'}
 ${cs.length?'<p class="hint">La app solo pregunta la primera vez que aparece un concepto. Si algo qued\u00f3 mal, olv\u00eddalo y vuelve a preguntar.</p>':''}
 <div class="spacer"></div>`}

function render(){
  _cc=null;_rec=null;
  [...tabs.children].forEach(b=>b.classList.toggle('on',b.dataset.go===view));
  const y=scr.scrollTop;
  if(view==='aj'&&!AJ)AJ={...CFG,hogar:H().map(x=>({...x}))};
  scr.innerHTML=(avisoInv?`<div class="ins"><h4>No pudimos unirte a ese hogar</h4>
      <p>${esc(avisoInv)}</p><button class="btn sec2" data-okaviso="1">Entendido</button></div>`:'')
    +(view==='inv'?vInvitar():view==='cierre'?vCierre():view==='cfg'?vConfig():view==='per'?vPer():view==='cats'?vCats():view==='apr'?vAprend():view==='fon'?vFondos():view==='aj'?vAjustes():view==='edit'?vEdit():det?vDet():view==='home'?vHome():view==='reg'?vReg():view==='mov'?vMov():vAn())
    +`<div class="sync ${db?'':'warn'}">${db?'Guardado en tu cuenta':'Sin conexión — no se está guardando'}</div>`;
  if(view==='reg'||view==='edit'){const n=document.getElementById('nota');if(n){
    n.oninput=e=>{nota=e.target.value;pintaSug()};
    n.onblur=()=>{setTimeout(()=>{if(conceptos[clave(nota)])render()},180)};
    pintaSug()}}
  scr.querySelectorAll('[data-upd]').forEach(b=>b.onclick=async()=>{
    const t=document.getElementById('vst'); if(!t)return;
    b.disabled=true; t.textContent='Buscando\u2026';
    const r=await revisaVersion(true);
    if(r==='nueva'){t.textContent='Actualizando\u2026';return}
    t.textContent = r==='sinred'
      ? 'sin conexi\u00f3n \u2014 int\u00e9ntalo en un momento'
      : 'ya tienes la \u00faltima \u00b7 versi\u00f3n '+verBonita(MIVER);
    b.disabled=false});
  scr.querySelectorAll('[data-cerrar]').forEach(b=>b.onclick=async()=>{
    b.disabled=true;const c=cuentas();
    const foto={total:Math.round(c.total),pactTot:Math.round(c.pactTot),
      pagos:c.pagos,gente:c.gente.map(x=>({n:x.n,pct:x.pct,pago:Math.round(x.pago),
        toca:Math.round(x.toca),saldo:Math.round(x.saldo)}))};
    await guardaCierre({total:foto.total,detalle:c.pagos,saldado:true,
      aportes:{...entregado(),_foto:foto},
      cerrado_por:sesion.user.id,cerrado_en:new Date().toISOString()});
    render()});
  scr.querySelectorAll('[data-reabrir]').forEach(b=>b.onclick=async()=>{
    b.disabled=true;await guardaCierre({saldado:false});render()});
  scr.querySelectorAll('[data-okaviso]').forEach(b=>b.onclick=()=>{avisoInv=null;render()});
  {const e=document.getElementById('invmail');
   if(e)e.oninput=ev=>{INV.email=ev.target.value}}
  scr.querySelectorAll('[data-crear]').forEach(b=>b.onclick=async()=>{
    b.disabled=true;b.textContent='Creando\u2026';
    const url=await invitar((INV.email||'').trim());
    if(!url){INV.err='Revisa que tengas conexi\u00f3n y vuelve a intentar.';b.disabled=false;b.textContent='Crear el enlace'}
    else {INV.url=url;INV.err=null}
    render()});
  // Compartir va en su propio toque: iOS no deja abrir el men\u00fa despu\u00e9s de esperar al servidor.
  scr.querySelectorAll('[data-share]').forEach(b=>b.onclick=()=>{
    const url=INV&&INV.url; if(!url)return;
    if(navigator.share){ navigator.share({title:'TUQUI',
      text:'Te invito a nuestro hogar en TUQUI',url}).catch(()=>{}) }
    else { copiarEnl(url) }});
  scr.querySelectorAll('[data-copiar]').forEach(b=>b.onclick=()=>copiarEnl(INV&&INV.url));
  scr.querySelectorAll('[data-otroenl]').forEach(b=>b.onclick=()=>{INV=null;render()});
  scr.querySelectorAll('[data-meta0]').forEach(b=>b.onclick=async()=>{
    b.disabled=true;CFG={...CFG,meta:+b.dataset.meta0};
    if(db){try{await db.collection('config').doc('hogar').set(CFG)}catch(e){}}
    render()});
  scr.querySelectorAll('[data-pend]').forEach(b=>b.onclick=()=>{
    const e=recMap()[b.dataset.pend];if(!e)return;
    amt=String(e.med);cat=e.cat;nota=e.n;cob=1;fon='';por=yoSoy().id;
    catOpen=false;detOpen=false;ultimo=null;view='reg';det=null;render()});
  scr.querySelectorAll('[data-mv]').forEach(b=>b.onclick=()=>{i+=+b.dataset.mv;det=null;render()});
  scr.querySelectorAll('[data-ver]').forEach(b=>b.onclick=()=>{
    i=+b.dataset.ver;det=null;view=perBack;render()});
  scr.querySelectorAll('[data-hoy]').forEach(b=>b.onclick=()=>{i=iHoy();det=null;render()});
  scr.querySelectorAll('[data-modo]').forEach(b=>b.onclick=()=>setModo(b.dataset.modo));
  scr.querySelectorAll('[data-cat]').forEach(b=>b.onclick=()=>{det=b.dataset.cat;render()});
  scr.querySelectorAll('[data-back]').forEach(b=>b.onclick=()=>{det=null;render()});
  scr.querySelectorAll('[data-go2]').forEach(b=>b.onclick=()=>{
    if(b.dataset.go2==='aj'){AJ={...CFG,hogar:H().map(x=>({...x}))};vig='desde'}
    if(b.dataset.go2==='fon'){NF={n:'',c:0};NM={n:'',meta:0,mes:0}}
    if(b.dataset.go2==='per'){perBack=(view==='mov'||view==='an')?view:'home'}
    if(b.dataset.go2==='reg'){amt='';cat=null;nota='';cob=1;fon='';por=yoSoy().id;catOpen=false;detOpen=false;ultimo=null}
    view=b.dataset.go2;det=null;render()});
  scr.querySelectorAll('[data-ph]').forEach(el=>el.oninput=e=>{
    AJ.hogar[+el.dataset.ph].n=e.target.value;
    const av=el.parentNode.querySelector('.av2');
    if(av)av.textContent=(e.target.value||'?').trim().charAt(0).toUpperCase()||'?'});
  {const t=document.getElementById('htot');if(t){
    t.oninput=e=>{const d=e.target.value.replace(/\D/g,'').slice(0,12);
      AJ.tot=+d;e.target.value=d?(+d).toLocaleString('es-CO'):''};
    t.onblur=()=>render()}}
  scr.querySelectorAll('[data-perj]').forEach(b=>b.onclick=()=>{
    AJ.per=b.dataset.perj; render()});
  scr.querySelectorAll('[data-igual]').forEach(b=>b.onclick=()=>{
    AJ.igual=b.dataset.igual==='1'; if(AJ.igual)AJ.pcs=null; render()});
  scr.querySelectorAll('[data-pct]').forEach(el=>{
    el.oninput=e=>{const d=e.target.value.replace(/\D/g,'').slice(0,3);
      e.target.value=d; AJ.pcs[el.dataset.pct]=Math.min(+d||0,100)};
    el.onblur=()=>render()});
  scr.querySelectorAll('[data-addp]').forEach(b=>b.onclick=agregaPers);
  scr.querySelectorAll('[data-rmp]').forEach(b=>b.onclick=()=>quitaPers(+b.dataset.rmp));
  scr.querySelectorAll('[data-vig]').forEach(b=>b.onclick=()=>{vig=b.dataset.vig;render()});
  scr.querySelectorAll('[data-usar]').forEach(b=>b.onclick=()=>usarSug(+b.dataset.usar));
  scr.querySelectorAll('[data-gaj]').forEach(b=>b.onclick=guardarAj);
  scr.querySelectorAll('[data-rmeta]').forEach(b=>b.onclick=()=>quitarMeta(b.dataset.rmeta));
  {const a=document.getElementById('amt');if(a){a.oninput=e=>{
     const d=e.target.value.replace(/\D/g,'').replace(/^0+/,'').slice(0,12);amt=d;
     e.target.value=d?(+d).toLocaleString('es-CO'):'';
     const pv=document.getElementById('amtp');if(pv)pv.textContent=d?'':'escribe el valor completo, por ejemplo 135000';
     const gb=document.getElementById('gb');if(gb)gb.disabled=!(amt&&cat)};
     a.onblur=()=>{if((+amt>=umbral())||fondos().length)render()}}}
  scr.querySelectorAll('[data-pick]').forEach(b=>b.onclick=()=>{cat=b.dataset.pick;catOpen=false;render()});
  scr.querySelectorAll('[data-catopen]').forEach(b=>b.onclick=()=>{catOpen=true;render()});
  scr.querySelectorAll('[data-more]').forEach(b=>b.onclick=()=>{detOpen=!detOpen;render()});
  scr.querySelectorAll('[data-undo]').forEach(b=>b.onclick=deshacer);
  scr.querySelectorAll('[data-at]').forEach(b=>b.onclick=()=>{nota=b.dataset.at;cat=b.dataset.ac;
    amt=b.dataset.am;catOpen=false;ultimo=null;render();
    const a=document.getElementById('amt');if(a){a.focus();a.select&&a.select()}});
  scr.querySelectorAll('[data-por]').forEach(b=>b.onclick=()=>{por=b.dataset.por;render()});
  scr.querySelectorAll('[data-cob]').forEach(b=>b.onclick=()=>{cob=+b.dataset.cob;render()});
  scr.querySelectorAll('[data-fon]').forEach(b=>b.onclick=()=>{fon=b.dataset.fon;render()});
  scr.querySelectorAll('[data-fc]').forEach(el=>{el.oninput=e=>{const d=e.target.value.replace(/\D/g,'');e.target.value=miles(d)};
    el.onblur=e=>guardaFondo(el.dataset.fc,e.target.value.replace(/\D/g,''))});
  scr.querySelectorAll('[data-nf]').forEach(el=>el.oninput=e=>{NF=NF||{n:'',c:0};
    if(el.dataset.nf==='c'){const d=e.target.value.replace(/\D/g,'');NF.c=+d;e.target.value=miles(d)}
    else NF.n=e.target.value});
  scr.querySelectorAll('[data-rmf]').forEach(b=>b.onclick=()=>quitaFondo(b.dataset.rmf));
  scr.querySelectorAll('[data-nm]').forEach(el=>{const f=el.dataset.nm;
    if(f==='meta'){el.oninput=e=>{const d=e.target.value.replace(/\D/g,'');
      NM=NM||{n:'',meta:0,mes:0};NM.meta=+d;e.target.value=miles(d);
      const gb=el.closest('.scr');if(gb)pintaCuota()}}
    else el.oninput=e=>{NM=NM||{n:'',meta:0,mes:0};NM.n=e.target.value;pintaCuota()}});
  scr.querySelectorAll('[data-nmes]').forEach(b=>b.onclick=()=>{
    NM=NM||{n:'',meta:0,mes:0};NM.mes=+b.dataset.nmes;render()});
  scr.querySelectorAll('[data-crm]').forEach(b=>b.onclick=crearMeta);
  scr.querySelectorAll('[data-crf]').forEach(b=>b.onclick=crearFondo);
  scr.querySelectorAll('[data-okf]').forEach(b=>b.onclick=()=>aceptaSug(b.dataset.okf));
  scr.querySelectorAll('[data-nof]').forEach(b=>b.onclick=()=>descartaSug(b.dataset.nof));
  scr.querySelectorAll('[data-olv]').forEach(b=>b.onclick=()=>olvidar(b.dataset.olv));
  scr.querySelectorAll('[data-out]').forEach(b=>b.onclick=()=>salir());
  scr.querySelectorAll('[data-noexiste]').forEach(b=>b.onclick=async()=>{
    const em=prompt('\u00bfA qu\u00e9 correo le mandas la invitaci\u00f3n?');
    if(!em)return; const url=await invitar(em.trim());
    if(!url){alert('No se pudo crear la invitaci\u00f3n');return}
    if(navigator.share){try{await navigator.share({title:'TUQUI',text:'Te invito a nuestro hogar en TUQUI',url})}catch(e){}}
    else {try{await navigator.clipboard.writeText(url);alert('Enlace copiado. Env\u00edaselo a '+em)}catch(e){prompt('Copia este enlace:',url)}}});
  scr.querySelectorAll('[data-save]').forEach(b=>b.onclick=guardar);
  scr.querySelectorAll('[data-edit]').forEach(b=>b.onclick=()=>abrirEdit(b.dataset.edit));
  scr.querySelectorAll('[data-upd]').forEach(b=>b.onclick=guardarEdit);
  scr.querySelectorAll('[data-rm2]').forEach(b=>b.onclick=borrarActual);
  scr.querySelectorAll('[data-back2]').forEach(b=>b.onclick=()=>{editKey=null;amt='';cat=null;nota='';cob=1;fon='';AJ=null;NF=null;view=b.dataset.back2;det=null;render()});
  const key=view+'|'+(det||'')+'|'+(editKey||'');
  scr.scrollTop=(key===lastKey)?y:0; lastKey=key;
}
function abrirEdit(k){const g=todos().find(x=>x.k===k);if(!g)return;
  editKey=k;amt=String(Math.round(g.a));cat=g.cat;por=idPor(g.por)||quienPago(g);cob=g.cob||1;fon=g.fon||'';nota=g.n;
  catOpen=false;detOpen=false;ultimo=null;view='edit';det=null;render()}
async function guardar(){
  const q=modo==='q'?Q[i]:MES[i]+' 2';
  const nom=nota.trim()||CM[cat].n, kk=clave(nom), c=conceptos[kk],
        cb=(c&&cob===1)?(c.cob||1):cob, fn=(c&&!fon)?(c.fon||''):fon;
  const g={id:uid4(),q,cat,a:+amt,n:nom,por,cob:cb,fon:fn,at:new Date().toISOString()};
  nuevos.push(g);
  if(kk&&(cb>1||fn)&&(!c||c.cob!==cb||c.fon!==fn)){const doc={k:kk,n:nom,cob:cb,fon:fn};conceptos[kk]=doc;
    if(db){try{await db.collection('conceptos').doc(kk).set(doc)}catch(e){}}}
  ultimo={...g};amt='';cat=null;nota='';cob=1;fon='';por=yoSoy().id;catOpen=false;detOpen=false;
  view='reg';lastKey='';render();
  const a=document.getElementById('amt');if(a)a.focus();
  if(db){try{await db.collection('gastos').doc(g.id).set(g)}catch(e){}}}
async function deshacer(){if(!ultimo)return;const id=ultimo.id;
  nuevos=nuevos.filter(g=>g.id!==id);ultimo=null;render();
  if(db){try{await db.collection('gastos').doc(id).delete()}catch(e){}}}
async function guardarEdit(){
  const upd={cat,a:+amt,n:nota.trim()||CM[cat].n,por,cob,fon},k=editKey;
  if(k[0]==='s'){overrides[k]={...(overrides[k]||{}),...upd};
    if(db){try{await db.collection('ediciones').doc(k).set({...overrides[k],k})}catch(e){}}}
  else{const j=nuevos.findIndex(x=>x.id===k);
    if(j>=0){nuevos[j]={...nuevos[j],...upd};
      if(db){try{await db.collection('gastos').doc(k).set(nuevos[j])}catch(e){}}}}
  editKey=null;amt='';cat=null;nota='';cob=1;fon='';view='mov';render()}
async function borrarActual(){
  const k=editKey;
  if(k[0]==='s'){overrides[k]={del:true};
    if(db){try{await db.collection('ediciones').doc(k).set({del:true,k})}catch(e){}}}
  else{nuevos=nuevos.filter(g=>g.id!==k);
    if(db){try{await db.collection('gastos').doc(k).delete()}catch(e){}}}
  editKey=null;amt='';cat=null;nota='';cob=1;fon='';view='mov';render()}


/* ================================================================
   TUQUI · capa de cuentas y datos (Supabase)
   ================================================================ */
const CFGX = window.TUQUI_CONFIG || {};
const uid4 = () => (crypto.randomUUID ? crypto.randomUUID()
  : 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const r = Math.random()*16|0; return (c==='x'?r:(r&0x3|0x8)).toString(16)}));

let sb = null, sesion = null, hogarId = null, hogarRow = null, gate = null, pendMail = null;

/* ---------- pantallas de cuenta ---------- */
function gateHTML(inner){ return `<div class="gate"><div class="gcard">
  <div class="glogo"><svg width="34" height="34" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round">
    <path d="M3.5 11.2 12 4.5l8.5 6.7"/><path d="M5.5 10.6V19h13v-8.4"/><path d="M4 19.5h16"/></svg></div>
  ${inner}</div></div>`}

function vLogin(msg){
  return gateHTML(`
   <h1>TUQUI</h1>
   <p class="gsub">Las cuentas del hogar, ordenadas y al día.</p>
   ${msg?`<div class="gmsg">${msg}</div>`:''}
   ${CFGX.GOOGLE?`<button class="gbtn gg" id="bGoogle">
     <svg width="17" height="17" viewBox="0 0 48 48"><path fill="#4285F4" d="M45 24.3c0-1.6-.1-2.7-.4-3.9H24v7.1h12c-.2 1.8-1.5 4.6-4.4 6.4l6.7 5.2C42.2 35.5 45 30.4 45 24.3z"/><path fill="#34A853" d="M24 46c5.9 0 10.9-2 14.5-5.3l-6.9-5.4c-1.9 1.3-4.3 2.2-7.6 2.2-5.8 0-10.7-3.8-12.5-9.1l-7.1 5.5C8.1 41.1 15.4 46 24 46z"/><path fill="#FBBC05" d="M11.5 28.4c-.5-1.4-.7-2.9-.7-4.4s.3-3 .7-4.4l-7.1-5.5C2.9 17 2 20.4 2 24s.9 7 2.4 9.9l7.1-5.5z"/><path fill="#EA4335" d="M24 10.5c4.1 0 6.9 1.8 8.5 3.3l6.2-6C34.9 4.3 29.9 2 24 2 15.4 2 8.1 6.9 4.4 14.1l7.1 5.5C13.3 14.3 18.2 10.5 24 10.5z"/></svg>
     Continuar con Google</button>`:''}
   ${CFGX.APPLE?`<button class="gbtn ga" id="bApple">
     <svg width="17" height="17" viewBox="0 0 24 24" fill="#fff"><path d="M16.4 12.7c0-2.4 2-3.6 2.1-3.6-1.1-1.7-2.9-1.9-3.5-1.9-1.5-.2-2.9.9-3.7.9s-1.9-.9-3.2-.8c-1.6 0-3.2 1-4 2.4-1.7 3-.4 7.4 1.2 9.8.8 1.2 1.8 2.5 3.1 2.4 1.2 0 1.7-.8 3.2-.8s1.9.8 3.2.8 2.2-1.2 3-2.4c.9-1.3 1.3-2.6 1.3-2.7-.1 0-2.6-1-2.7-4.1zM14 5.3c.7-.8 1.1-2 1-3.3-1 0-2.2.7-2.9 1.5-.6.7-1.2 1.9-1 3.1 1.1.1 2.2-.6 2.9-1.3z"/></svg>
     Continuar con Apple</button>`:''}
   ${(CFGX.GOOGLE||CFGX.APPLE)?'<div class="gor"><span>o</span></div>':''}
   <input class="ginput" id="gmail" type="email" inputmode="email" autocomplete="email"
     placeholder="tu@correo.com" enterkeyhint="go">
   <button class="gbtn gp" id="bMail">Enviarme el código</button>
   <p class="gfoot">Sin contraseñas: te llega un código al correo y lo escribes aquí.<br>
     Tus gastos solo los ves tú y quien invites a tu hogar.</p>`)}

function vCodigo(email, msg){
  return gateHTML(`
   <h1>Revisa tu correo</h1>
   <p class="gsub">Le mandamos un código a<br><b style="color:var(--ink)">${esc(email)}</b></p>
   ${msg?`<div class="gmsg">${msg}</div>`:''}
   <input class="gcode" id="gcod" inputmode="numeric" autocomplete="one-time-code"
     maxlength="10" placeholder="• • • • • •" enterkeyhint="go">
   <button class="gbtn gp" id="bCod">Entrar</button>
   <button class="glink" id="bResend">No me llegó — enviar otro</button>
   <button class="glink" id="bOtro">Usar otro correo</button>
   <p class="gfoot">El código vence en 10 minutos. Si no lo ves, mira en spam
     o en Promociones.</p>`)}

let NH = null;
function nhInit(){ if(!NH) NH={nom:'',yo:'',per:'q',con:null,otros:[''],igual:true,pcs:[]} }
function nhGente(){ return NH.con==='solo'?[NH.yo||'Yo']:[NH.yo||'Yo'].concat(NH.otros) }
function nhPcs(){ const n=nhGente().length;
  if(NH.igual||!NH.pcs.length){const e=Math.round(100/n);
    NH.pcs=Array.from({length:n},(_,k)=>k===0?100-e*(n-1):e)}
  while(NH.pcs.length<n)NH.pcs.push(0);
  NH.pcs.length=n; return NH.pcs }

function vCrearHogar(){
  nhInit(); const sp=nhPcs().reduce((a,b)=>a+b,0), gs=nhGente();
  return gateHTML(`
   <h1>Arma tu hogar</h1>
   <p class="gsub">Unas pocas preguntas. De plata hablamos despu\u00e9s, cuando la app los conozca.</p>
   <label class="glab">\u00bfC\u00f3mo se llama tu hogar?</label>
   <input class="ginput" id="hNom" placeholder="Nuestro apartamento" autocomplete="off" value="${esc(NH.nom)}">
   <label class="glab">\u00bfC\u00f3mo te llamas?</label>
   <input class="ginput" id="hYo" placeholder="Tu nombre" autocomplete="off" value="${esc(NH.yo)}">

   <label class="glab">\u00bfCada cu\u00e1nto hacen cuentas?</label>
   <div class="seg" style="margin-top:8px">
     <button data-per="q" class="${NH.per==='q'?'on':''}">Por quincena</button>
     <button data-per="m" class="${NH.per==='m'?'on':''}">Por mes</button>
   </div>

   <label class="glab">\u00bfCon qui\u00e9n vives?</label>
   <div class="seg" style="margin-top:8px">
     <button data-con="solo" class="${NH.con==='solo'?'on':''}">Solo</button>
     <button data-con="pareja" class="${NH.con==='pareja'?'on':''}">En pareja</button>
     <button data-con="grupo" class="${NH.con==='grupo'?'on':''}">Con m\u00e1s gente</button>
   </div>

   ${NH.con==='pareja'||NH.con==='grupo'?`
   <label class="glab">${NH.con==='pareja'?'\u00bfC\u00f3mo se llama?':'\u00bfQui\u00e9nes m\u00e1s viven ah\u00ed?'}</label>
   ${NH.otros.map((n,k)=>`<input class="ginput" data-otro="${k}" style="margin-top:8px"
      placeholder="${NH.con==='pareja'?'Su nombre':'Nombre'}" autocomplete="off" value="${esc(n)}">`).join('')}
   ${NH.con==='grupo'?`<button class="glink" id="bMas">+ Agregar otra persona</button>`:''}

   <label class="glab">\u00bfC\u00f3mo se reparten los gastos?</label>
   <div class="seg" style="margin-top:8px">
     <button data-rep="1" class="${NH.igual?'on':''}">Por partes iguales</button>
     <button data-rep="0" class="${NH.igual?'':'on'}">En otra proporci\u00f3n</button>
   </div>
   ${NH.igual?'':`
   ${gs.map((n,k)=>`<div class="pl"><span>${esc(n||('Persona '+(k+1)))}</span>
     <input data-npct="${k}" inputmode="numeric" maxlength="3" value="${NH.pcs[k]}"
       style="text-align:right;width:70px"></div>`).join('')}
   <p class="gfoot" style="color:${sp===100?'':'var(--brand)'}">Suman ${sp}%${sp===100?'':' \u2014 tienen que sumar 100'}</p>`}
   `:''}

   <p class="gfoot" style="margin-top:14px">No les vamos a pedir una meta todav\u00eda. Registren sus gastos
     unas semanas y la app se las propone con sus propios n\u00fameros.</p>
   <button class="gbtn gp" id="bCrear" ${NH.con&&sp===100?'':'disabled'}>Crear mi hogar</button>
   <button class="glink" id="bSalir">Salir de esta cuenta</button>`)}

function pinta(html){ gate.innerHTML = html; gate.hidden = false;
  document.querySelector('.stage').hidden = true }
function entraApp(){ gate.hidden = true; document.querySelector('.stage').hidden = false }
function aplicaPer(){ const p = CFG.per==='m'?'m':'q';
  if (p !== modo) { modo = p; i = iHoy() } }

const soloNum = el => el && (el.oninput = e => {
  const d = e.target.value.replace(/\D/g,''); e.target.value = d ? (+d).toLocaleString('es-CO') : '' });
const leeNum = id => { const el = document.getElementById(id);
  return el ? +String(el.value).replace(/\D/g,'') || 0 : 0 };

/* ---------- flujo ---------- */
async function arranque(){
  gate = document.getElementById('gate');

  if (!CFGX.SUPABASE_URL || CFGX.SUPABASE_URL.includes('TU-PROYECTO')) {
    pinta(gateHTML(`<h1>Falta configurar</h1><p class="gsub">Abre <b>config.js</b> y pon la URL y la
      anon key de tu proyecto de Supabase.</p>`)); return }

  sb = supabase.createClient(CFGX.SUPABASE_URL, CFGX.SUPABASE_ANON_KEY,
       { auth: { detectSessionInUrl: true, persistSession: true, autoRefreshToken: true } });

  const { data: { session } } = await sb.auth.getSession();
  sesion = session;
  sb.auth.onAuthStateChange((_e, s) => { const antes = !!sesion; sesion = s;
    if (!!s !== antes) ruta() });
  ruta();
}

let avisoInv = null;
function guardaInv(){
  const c = new URLSearchParams(location.search).get('inv');
  if (!c) return;
  try { localStorage.setItem('tuqui_inv', c) } catch(e){}
  history.replaceState({}, '', location.pathname);
}
function leeInv(){ try { return localStorage.getItem('tuqui_inv') } catch(e){ return null } }
function borraInv(){ try { localStorage.removeItem('tuqui_inv') } catch(e){} }

async function ruta(){
  guardaInv();                       // antes de pedir la sesion, para no perderlo
  if (!sesion) { mostrarLogin(); return }

  const cod = leeInv();
  if (cod) {
    const { error } = await sb.rpc('aceptar_invitacion', { p_codigo: cod });
    borraInv();
    if (error) avisoInv = 'Esa invitaci\u00f3n ya no sirve \u2014 puede estar vencida o ya usada. P\u00eddele otra a quien te invit\u00f3.';
  }

  const { data: ms, error } = await sb.from('members')
    .select('household_id').eq('user_id', sesion.user.id).limit(1);
  if (error) { pinta(gateHTML(`<h1>No pudimos entrar</h1><p class="gsub">${error.message}</p>
    <button class="glink" id="bSalir">Salir de esta cuenta</button>`));
    document.getElementById('bSalir').onclick = salir; return }

  if (!ms || !ms.length) { mostrarCrear(); return }
  hogarId = ms[0].household_id;
  await cargar();
  aplicaPer();
  entraApp();
  suscribir();
  render();
}

function mostrarLogin(msg){
  pinta(vLogin(msg));
  const dest = location.origin + location.pathname;
  const bg = document.getElementById('bGoogle');
  if (bg) bg.onclick = () => sb.auth.signInWithOAuth({ provider:'google', options:{ redirectTo: dest } });
  const ba = document.getElementById('bApple');
  if (ba) ba.onclick = () => sb.auth.signInWithOAuth({ provider:'apple', options:{ redirectTo: dest } });
  const mail = document.getElementById('gmail');
  const enviar = async () => {
    const email = (mail.value||'').trim();
    if (!/.+@.+\..+/.test(email)) { mail.focus(); return }
    const bt = document.getElementById('bMail');
    bt.disabled = true; bt.textContent = 'Enviando\u2026';
    const { error } = await sb.auth.signInWithOtp({ email,
      options:{ emailRedirectTo: dest, shouldCreateUser: true } });
    if (error) { mostrarLogin(humano(error.message)); return }
    pendMail = email; mostrarCodigo();
  };
  document.getElementById('bMail').onclick = enviar;
  mail.onkeydown = e => { if (e.key === 'Enter') enviar() };
}

function humano(m){
  const t = String(m||'');
  if (/rate limit/i.test(t)) return 'Ya pediste varios c\u00f3digos seguidos. Espera un momento y vuelve a intentar.';
  if (/sending|smtp/i.test(t)) return 'No pudimos mandar el correo en este momento. Intenta otra vez en un minuto.';
  if (/invalid/i.test(t) && /email/i.test(t)) return 'Ese correo no parece v\u00e1lido.';
  return 'No pudimos enviarlo. Intenta de nuevo.';
}

function mostrarCodigo(msg){
  pinta(vCodigo(pendMail, msg));
  const inp = document.getElementById('gcod');
  const entrar = async () => {
    const token = (inp.value||'').replace(/\D/g,'');
    if (token.length < 6) { inp.focus(); return }
    const btn = document.getElementById('bCod'); btn.disabled = true; btn.textContent = 'Entrando…';
    const { error } = await sb.auth.verifyOtp({ email: pendMail, token, type: 'email' });
    if (error) { mostrarCodigo('Ese código no sirvió. Revisa que esté completo y sin espacios, o pide otro.'); return }
    pendMail = null; ruta();
  };
  document.getElementById('bCod').onclick = entrar;
  inp.oninput = e => { const d = e.target.value.replace(/\D/g,'').slice(0,10);
    e.target.value = d; if (d.length === 6 || d.length === 8) entrar() };
  document.getElementById('bResend').onclick = async () => {
    await sb.auth.signInWithOtp({ email: pendMail, options:{ shouldCreateUser: true } });
    mostrarCodigo('Listo, va otro código en camino.');
  };
  document.getElementById('bOtro').onclick = () => { pendMail = null; mostrarLogin() };
  inp.focus();
}

function mostrarCrear(){
  nhInit();
  pinta(vCrearHogar());
  const foco=NH._foco; NH._foco=null;
  const g=(id)=>document.getElementById(id);
  g('hNom').oninput = e => NH.nom = e.target.value;
  g('hYo').oninput  = e => NH.yo = e.target.value;
  g('hYo').onblur   = () => { if(!NH.igual) mostrarCrear() };
  document.querySelectorAll('[data-per]').forEach(b=>b.onclick=()=>{
    NH.per=b.dataset.per; mostrarCrear()});
  document.querySelectorAll('[data-con]').forEach(b=>b.onclick=()=>{
    NH.con=b.dataset.con;
    if(NH.con==='solo')NH.otros=[];
    else if(NH.con==='pareja')NH.otros=[NH.otros[0]||''];
    else if(!NH.otros.length)NH.otros=[''];
    NH.pcs=[]; mostrarCrear()});
  document.querySelectorAll('[data-otro]').forEach(el=>{
    el.oninput=e=>NH.otros[+el.dataset.otro]=e.target.value;
    el.onblur=()=>{ if(!NH.igual) mostrarCrear() }});
  const bm=g('bMas'); if(bm)bm.onclick=()=>{
    NH.otros.push('');NH.pcs=[];NH._foco='otro'+(NH.otros.length-1);mostrarCrear()};
  document.querySelectorAll('[data-rep]').forEach(b=>b.onclick=()=>{
    NH.igual=b.dataset.rep==='1'; NH.pcs=[]; mostrarCrear()});
  document.querySelectorAll('[data-npct]').forEach(el=>{
    el.oninput=e=>{const d=e.target.value.replace(/\D/g,'').slice(0,3);
      e.target.value=d; NH.pcs[+el.dataset.npct]=Math.min(+d||0,100)};
    el.onblur=()=>mostrarCrear()});
  if(foco){const n=+foco.replace('otro','');
    const el=document.querySelector('[data-otro="'+n+'"]'); if(el)el.focus()}

  g('bSalir').onclick = salir;
  g('bCrear').onclick = async (ev) => {
    const nombres = nhGente().map((n,k)=>(n||'').trim()||(k===0?'Yo':'Persona '+(k+1)));
    const pcs = nhPcs();
    ev.target.disabled = true;
    const { data, error } = await sb.rpc('crear_hogar', {
      p_nombre: (NH.nom||'').trim(),
      p_mi_nombre: nombres[0],
      p_aporte: 0, p_descuento: Math.round(pcs[0]||0) });
    if (error) { ev.target.disabled = false; alert(error.message); return }
    hogarId = data;
    try{ await sb.from('households').update({ periodo: NH.per||'q' }).eq('id', hogarId) }catch(e){}
    if (nombres.length > 1) {
      try{ await sb.from('members').insert(nombres.slice(1).map((n,k)=>({
        household_id: hogarId, nombre: n, aporte: 0, descuento: Math.round(pcs[k+1]||0) }))) }
      catch(e){ console.warn('miembros', e) }
    }
    NH = null;
    await cargar(); aplicaPer(); entraApp(); suscribir(); render();
  };
}

async function salir(){ await sb.auth.signOut(); hogarId=null; location.reload() }

/* ---------- carga ---------- */
async function cargar(){
  const [h, ms, ex, fu, co, mc, cl] = await Promise.all([
    sb.from('households').select('*').eq('id', hogarId).single(),
    sb.from('members').select('*').eq('household_id', hogarId).order('creado_en'),
    sb.from('expenses').select('*').eq('household_id', hogarId),
    sb.from('funds').select('*').eq('household_id', hogarId).order('creado_en'),
    sb.from('concepts').select('*').eq('household_id', hogarId),
    sb.from('meta_changes').select('*').eq('household_id', hogarId),
    sb.from('closings').select('*').eq('household_id', hogarId),
  ]);
  hogarRow = h.data || {};
  const miembros = ms.data || [];

  CFG = { ...CFG, nombre: hogarRow.nombre || 'Mi hogar', meta: +hogarRow.meta_base || 0,
          per: hogarRow.periodo === 'm' ? 'm' : 'q',
          hogar: miembros.map(m => ({ id:m.id, n:m.nombre, a:+m.aporte||0, pct:+m.descuento||0,
                                      d:0, u:m.user_id||'' })) };

  nuevos = (ex.data||[]).map(r => ({ id:r.id, q:r.q, cat:r.cat, n:r.nombre, a:+r.monto,
            cob:+r.cobertura||1, fon:r.fund_id||'', por:r.pagado_por||'',
            cpor:r.creado_por||'', ce:r.creado_en||'' }));
  overrides = {};

  fondOv = {}; (fu.data||[]).forEach(r => { fondOv[r.id] =
    { id:r.id, n:r.nombre, d:r.nota||'', c:+r.cuota||0, desde:r.desde_q,
      meta:+r.objetivo||0, mes:+r.meses||0 } });

  conceptos = {}; (co.data||[]).forEach(r => { conceptos[r.clave] =
    { k:r.clave, n:r.nombre, cob:+r.cobertura||1, fon:r.fund_id||'' } });

  metas = (mc.data||[]).map(r => ({ id:r.id, v:+r.valor, desde:r.desde_q }));

  cierres = {}; (cl.data||[]).forEach(r => { cierres[r.modo+'|'+r.periodo] =
    { id:r.id, periodo:r.periodo, modo:r.modo, total:+r.total, det:r.detalle||[],
      ap:r.aportes||{}, saldado:!!r.saldado, en:r.cerrado_en } });

  db = shim;   // a partir de aquí la app considera que hay conexión
}

let canal = null;
function suscribir(){
  if (canal) sb.removeChannel(canal);
  canal = sb.channel('hogar:'+hogarId);
  ['expenses','funds','concepts','meta_changes','members','households'].forEach(t =>
    canal.on('postgres_changes', { event:'*', schema:'public', table:t }, async () => {
      await cargar(); render() }));
  canal.subscribe();
}

/* ---------- puente: misma forma que usaba la app ---------- */
const H_ = () => ({ household_id: hogarId });

const shim = { collection(nombre){ return { doc(id){ return {
  async set(v){ await escribir(nombre, id, v) },
  async delete(){ await borrar(nombre, id) } } } } } };

async function escribir(col, id, v){
  try{
    if (col === 'gastos') {
      await sb.from('expenses').upsert({ id, ...H_(), q:v.q, cat:v.cat, nombre:v.n,
        monto:v.a, cobertura:v.cob||1, fund_id:v.fon||null, pagado_por:v.por||null,
        creado_por: sesion.user.id });
    } else if (col === 'fondos') {
      if (v.del) { await sb.from('funds').delete().eq('id', id); }
      else { await sb.from('funds').upsert({ id, ...H_(), nombre:v.n, nota:v.d||'',
        cuota:v.c||0, desde_q:v.desde, objetivo:v.meta||0, meses:v.mes||0 }); }
    } else if (col === 'conceptos') {
      await sb.from('concepts').upsert({ ...H_(), clave:v.k, nombre:v.n,
        cobertura:v.cob||1, fund_id:v.fon||null }, { onConflict:'household_id,clave' });
    } else if (col === 'metas') {
      await sb.from('meta_changes').upsert({ id, ...H_(), valor:v.v, desde_q:v.desde });
    } else if (col === 'config') {
      await guardarHogar(v);
    }
  }catch(e){ console.warn('escribir', col, e) }
  await cargar();
}

async function borrar(col, id){
  try{
    if (col === 'gastos')   await sb.from('expenses').delete().eq('id', id);
    if (col === 'fondos')   await sb.from('funds').delete().eq('id', id);
    if (col === 'metas')    await sb.from('meta_changes').delete().eq('id', id);
    if (col === 'conceptos') await sb.from('concepts').delete()
      .eq('household_id', hogarId).eq('clave', id);
  }catch(e){ console.warn('borrar', col, e) }
  await cargar();
}

async function guardarHogar(c){
  await sb.from('households').update({ meta_base: c.meta||0, periodo: c.per||'q' }).eq('id', hogarId);
  const quedan = (c.hogar||[]).map(p => p.id);
  const { data: actuales } = await sb.from('members').select('id').eq('household_id', hogarId);
  const fuera = (actuales||[]).map(m=>m.id).filter(x => !quedan.includes(x));
  if (fuera.length) await sb.from('members').delete().in('id', fuera);
  for (const p of (c.hogar||[])) {
    await sb.from('members').upsert({ id:p.id, household_id:hogarId,
      nombre:p.n||'', aporte:p.a||0, descuento:Math.round(p.pct||0) });
  }
}

/* ---------- invitar ---------- */
function copiarEnl(url){
  if(!url)return; const av=document.getElementById('cpok');
  const ok=()=>{if(av)av.textContent='Enlace copiado \u2014 p\u00e9galo en WhatsApp.'};
  if(navigator.clipboard&&navigator.clipboard.writeText){
    navigator.clipboard.writeText(url).then(ok).catch(()=>seleccionar())
  } else seleccionar();
  function seleccionar(){
    const d=document.querySelector('.enl'); if(!d)return;
    const r=document.createRange(); r.selectNodeContents(d);
    const sel=window.getSelection(); sel.removeAllRanges(); sel.addRange(r);
    if(av)av.textContent='Qued\u00f3 seleccionado: mant\u00e9n presionado y toca Copiar.';
  }
}

async function invitar(email, memberId){
  // Si el hogar ya tiene a esa persona creada pero sin cuenta, la invitacion
  // la engancha a ella en vez de agregar a alguien nuevo. Sin esto el hogar
  // terminaria con una persona de mas y el reparto se dana.
  if (!memberId) { const libre = (CFG.hogar||[]).find(x => !x.u); if (libre) memberId = libre.id }
  const { data, error } = await sb.from('invites')
    .insert({ household_id: hogarId, email, member_id: memberId||null,
              creado_por: sesion.user.id }).select('codigo').single();
  if (error) return null;
  return location.origin + location.pathname + '?inv=' + data.codigo;
}

tabs.onclick = e => {
  const b = e.target.closest('.tab'); if (!b) return;
  const v = b.dataset.go; if (!v) return;
  if (v === 'reg') { amt=''; cat=null; nota=''; cob=1; fon=''; por=yoSoy().id; catOpen=false; detOpen=false; ultimo=null }
  view = v; det = null; render();
};

// --- actualizacion automatica -------------------------------------
// En iOS una app instalada puede quedarse viva en memoria y no recargar
// nunca. Esto compara la version publicada con la que esta corriendo y,
// si cambio, limpia el cache y recarga.
const MIVER = (document.querySelector('meta[name=tuqui-version]')||{}).content || '';
let _chk = 0;
async function limpiaYRecarga(){
  try{ if (self.caches){ const ks = await caches.keys();
    await Promise.all(ks.map(k=>caches.delete(k))) } }catch(e){}
  try{ if (navigator.serviceWorker){
    const rs = await navigator.serviceWorker.getRegistrations();
    await Promise.all(rs.map(r=>r.unregister())) } }catch(e){}
  try{ guardaInv() }catch(e){}
  location.replace(location.pathname + '?v=' + Date.now());
}
// Devuelve 'nueva' | 'aldia' | 'sinred'
async function revisaVersion(forzado){
  const ahora = Date.now();
  if (!forzado && ahora - _chk < 60000) return 'aldia';
  _chk = ahora;
  try{
    const r = await fetch('index.html?v=' + ahora, { cache:'no-store' });
    const t = await r.text();
    const m = t.match(/tuqui-version"\s+content="([^"]+)"/);
    if (m && MIVER && m[1] !== MIVER){ await limpiaYRecarga(); return 'nueva' }
    return 'aldia';
  }catch(e){ return 'sinred' }
}
// La version viene como "31 \u00b7 2026-10-02 \u00b7 d8b8892"
function verBonita(v){
  const p = String(v||'').split('\u00b7').map(x=>x.trim());
  const MS=['enero','febrero','marzo','abril','mayo','junio','julio',
            'agosto','septiembre','octubre','noviembre','diciembre'];
  const f = (p[1]||'').match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!p[0]) return 'desconocida';
  return p[0] + (f ? ' \u00b7 ' + (+f[3]) + ' de ' + MS[+f[2]-1] : '');
}
document.addEventListener('visibilitychange', () => { if (!document.hidden) revisaVersion() });
window.addEventListener('focus', revisaVersion);
setTimeout(revisaVersion, 4000);

window.addEventListener('DOMContentLoaded', arranque);
