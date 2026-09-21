/* TUQUI · vistas */
const SEED=[];

const CATS=[
 {id:'vivienda',n:'Vivienda',c:'#5b8def',f:1},{id:'servicios',n:'Servicios',c:'#2bb3a3',f:1},
 {id:'suscrip',n:'Suscripciones',c:'#35b6e8',f:1},{id:'ayuda',n:'Ayuda en casa',c:'#a78bfa',f:1},
 {id:'mercado',n:'Mercado',c:'#3ecf8e'},{id:'domicilios',n:'Domicilios',c:'#ff8a4c'},
 {id:'comerfuera',n:'Comer fuera',c:'#e5b567'},{id:'bienestar',n:'Bienestar',c:'#9bcc4a'},
 {id:'salud',n:'Salud',c:'#ff6b6b'},{id:'mascotas',n:'Mascotas',c:'#c98a5b'},
 {id:'transporte',n:'Transporte',c:'#9aa5b4'},{id:'hogar',n:'Hogar',c:'#7c9bd6'},
 {id:'personal',n:'Personal y ocio',c:'#f472b6'}];
const CM=Object.fromEntries(CATS.map(c=>[c.id,c]));
const MES=['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
const Q=[];MES.forEach(m=>{Q.push(m+' 1');Q.push(m+' 2')});
const DEFMETA=2000000;
let CFG={a1:1250000,a2:1250000,desc:500000,p1:'Mark',p2:'Esposa',meta:DEFMETA};
let metas=[];
const COLP=['#e0536b','#5b8def','#3ecf8e','#e5b567','#a78bfa','#2bb3a3'];
function H(){if(CFG.hogar&&CFG.hogar.length)return CFG.hogar;
  return [{id:'p1',n:CFG.p1||'Yo',a:+CFG.a1||0,d:Math.round((+CFG.desc||0)/2)},
          {id:'p2',n:CFG.p2||'Pareja',a:+CFG.a2||0,d:Math.round((+CFG.desc||0)/2)}]}
const PERS=()=>H().map(p=>p.n);
const idPor=v=>(typeof v==='number')?((H()[v]||{}).id||''):(v||'');
const perPor=v=>{const id=idPor(v);return H().find(p=>p.id===id)||null};
const nomPor=v=>{const p=perPor(v);return p?p.n:''};
function qHoy(){const d=new Date();return MES[d.getMonth()]+' '+(d.getDate()<=15?'1':'2')}
let modo='q', i=Math.max(Q.indexOf(qHoy()),0), view='home', det=null, db=null,
    nuevos=[], overrides={}, editKey=null, lastKey='', amt='', cat=null, por='', nota='',
    AJ=null, vig='siempre', cob=1, fon='', fondOv={}, NF=null, NM=null, conceptos={},
    catOpen=false, detOpen=false, ultimo=null;

const U=()=>modo==='q'?Q:MES;
const qIdx=()=>modo==='q'?i:2*i+1;
function metaQ(k){let v=CFG.meta||DEFMETA;
  metas.slice().sort((a,b)=>Q.indexOf(a.desde)-Q.indexOf(b.desde))
    .forEach(m=>{const ix=Q.indexOf(m.desde);if(ix>=0&&ix<=k)v=m.v});
  return v}
const APORTE=()=>modo==='q'?metaQ(i):(metaQ(2*i)+metaQ(2*i+1));
const mesDe=q=>q.split(' ')[0];
function todos(){const out=[];
  SEED.forEach((g,ix)=>{const k='s'+ix,ov=overrides[k]||{};if(ov.del)return;
    out.push({k,q:ov.q||g.q,cat:ov.cat||g.cat,n:ov.n!==undefined?ov.n:g.n,
      a:ov.a!==undefined?ov.a:g.a*1000,por:ov.por||0,cob:ov.cob!==undefined?ov.cob:(g.cob||1),
      fon:ov.fon!==undefined?ov.fon:(g.fon||''),
      seed:1,edit:!!ov.cat||ov.n!==undefined||ov.a!==undefined})});
  nuevos.forEach(g=>out.push({k:g.id,q:g.q,cat:g.cat,n:g.n,a:g.a,por:g.por||0,cob:g.cob||1,fon:g.fon||'',id:g.id}));
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
const fijos=k=>items(k).filter(g=>CM[g.cat]&&CM[g.cat].f).reduce((s,g)=>s+g.a,0);
const prom=c=>{const n=Math.min(i,modo==='q'?6:3);if(n<1)return 0;let s=0;
  for(let k=i-n;k<i;k++)s+=costo(k,c);return s/n};
const fmt=v=>'$'+Math.round(v).toLocaleString('es-CO');
const fmtK=v=>Math.abs(v)>=1000000?'$'+(v/1000000).toFixed(1).replace('.',',')+'M':'$'+Math.round(v/1000)+'k';
const esc=s=>String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;');
function lbl(k){if(modo==='m')return[MES[k],'mes completo · 2026'];
  const[m,n]=Q[k].split(' ');return[(n==='1'?'1ª':'2ª')+' quincena',m.toLowerCase()+' 2026']}
function setModo(x){if(x===modo)return;
  if(x==='m')i=MES.indexOf(mesDe(Q[i]));else i=Q.indexOf(MES[i]+' 2');
  modo=x;det=null;render()}

const scr=document.getElementById('scr'),tabs=document.getElementById('tabs');
function barra(){const[a,b]=lbl(i);return `<div class="top">
  <button class="step" data-mv="-1" ${i===0?'disabled':''}>‹</button>
  <span class="who"><b>${a}</b><span>${b}</span></span>
  <button class="step" data-mv="1" ${i===U().length-1?'disabled':''}>›</button></div>
  <div class="seg"><button data-modo="q" class="${modo==='q'?'on':''}">Quincena</button>
  <button data-modo="m" class="${modo==='m'?'on':''}">Mes</button></div>`}
function topSimple(t,s,back){return `<div class="top">
  ${back?`<button class="step" data-back2="${back}">‹</button>`:'<span style="width:34px"></span>'}
  <span class="who" style="text-align:center"><b>${t}</b><span>${s}</span></span>
  <span style="width:34px"></span></div>`}

function vHome(){
  const t=tot(i),fx=fijos(i),dd=t-fx,ap=APORTE(),
        pv=prov(i),disp=Math.max(ap-pv,0),tl=totLibre(i),tf=totFondo(i),
        over=tl>disp,esc2=Math.max(disp,tl)*1.06||1;
  const list=CATS.map(c=>({c,v:catTot(i,c.id),p:prom(c.id)})).filter(x=>x.v>0).sort((a,b)=>b.v-a.v);
  const mx=Math.max(...list.map(x=>Math.max(x.v,x.p)),1);
  return barra()+`
  <div class="hero ${over?'over':'ok'}">
    <div class="lb">${over?'Se pasaron por':'Les queda'}</div>
    <div class="big">${fmt(Math.abs(disp-tl))}</div>
    <div class="cmp">Gastaron <b>${fmt(tl)}</b> de <b>${fmt(disp)}</b>${tf?` · <b>${fmt(tf)}</b> salió de fondos`:''}</div>
    <div class="meter"><i class="f" style="width:${Math.min(tl,disp)/esc2*100}%"></i>
      ${over?`<i class="x" style="left:${disp/esc2*100}%;width:${(tl-disp)/esc2*100}%"></i>`:''}
      <u style="left:calc(${disp/esc2*100}% - 1px)"></u></div>
    ${pv?`<div class="calc">
      <button class="cw" data-go2="aj"><em>Meta</em><b>${fmtK(ap)}</b></button><i>−</i>
      <button class="cw" data-go2="fon"><em>Apartado</em><b>${fmtK(pv)}</b></button><i>=</i>
      <span class="cw on"><em>Para gastar</em><b>${fmtK(disp)}</b></span></div>`
     :`<div class="mrow"><button class="lnk" data-go2="fon">apartar para metas y para lo que ya viene ›</button>
       <button class="lnk" data-go2="aj">meta ${fmtK(ap)} · ajustar ›</button></div>`}
  </div>
  <div class="acts">
    <button class="act pri" data-go2="reg"><span class="c">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0a0b0d" stroke-width="2.4" stroke-linecap="round"><path d="M12 6v12M6 12h12"/></svg></span><span>Registrar</span></button>
    <button class="act" data-go2="mov"><span class="c">
      <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h10"/></svg></span><span>Corregir</span></button>
    <button class="act" data-go2="an"><span class="c">
      <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"><path d="M5 19V11M12 19V5M19 19v-5"/></svg></span><span>Analizar</span></button>
    <button class="act" data-go2="cfg"><span class="c">
      <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="3.3"/><path d="M12 3.5v2M12 18.5v2M3.5 12h2M18.5 12h2M6 6l1.4 1.4M16.6 16.6 18 18M18 6l-1.4 1.4M7.4 16.6 6 18"/></svg></span><span>Ajustes</span></button>
  </div>
  <div class="two">
    <div class="card fx"><div class="l">Compromisos fijos</div>
      <div class="d">Llegan sí o sí, no se deciden cada mes</div>
      <div class="v">${fmt(fx)}</div><div class="sh"><i style="width:${t?fx/t*100:0}%"></i></div>
      <div class="pc">${t?Math.round(fx/t*100):0}% de lo gastado</div></div>
    <div class="card"><div class="l">Día a día</div>
      <div class="d">Aquí sí se puede decidir algo y manejarlo</div>
      <div class="v">${fmt(dd)}</div><div class="sh"><i style="width:${t?dd/t*100:0}%"></i></div>
      <div class="pc">${t?Math.round(dd/t*100):0}% de lo gastado</div></div>
  </div>
  <div class="sec"><b>Por categoría</b><span>vs. su promedio</span></div>
  ${list.length?list.map(x=>`<button class="row" data-cat="${x.c.id}">
    <span class="ic" style="background:${x.c.c}">${x.c.n[0]}</span>
    <span class="tx"><b>${x.c.n}</b>
      <span class="mini-bar"><i style="width:${x.v/mx*100}%;background:${x.c.c}"></i>${x.p?`<u style="left:calc(${Math.min(x.p/mx*100,99)}% - 1px)"></u>`:''}</span></span>
    <span class="amt">${fmtK(x.v)}${x.p?`<em>${x.v>x.p?'+':''}${fmtK(x.v-x.p)}</em>`:''}</span></button>`).join('')
   :'<p class="hint">Todavía no hay gastos en este periodo.</p>'}
  <p class="hint">La línea clara en cada barra es el promedio de ${modo==='q'?'las quincenas':'los meses'} anteriores.</p>
  <div class="spacer"></div>`}

function fila(g,sub){const an=g.cob>1;
  return `<button class="row" data-edit="${g.k}">
  <span class="ic" style="background:${CM[g.cat].c}">${CM[g.cat].n[0]}</span>
  <span class="tx"><b>${esc(g.n)}${an?`<span class="tag an">${g.cob} meses</span>`:''}</b>
  <span>${an?fmt(g.a/per(g))+' por quincena · cubre hasta '+hastaQ(g).toLowerCase():sub}</span></span>
  <span class="amt">${fmt(g.a)}</span></button>`}

function vDet(){
  const c=CM[det],its=items(i).filter(g=>g.cat===det).sort((a,b)=>b.a-a.a),
        t=its.reduce((s,g)=>s+g.a,0),p=prom(det);
  return barra()+`<div class="det"><button class="back" data-back="1">‹ Volver</button>
    <h3>${c.n}</h3><div class="sum">${fmt(t)} · ${its.length} ${its.length===1?'apunte':'apuntes'}${p?' · promedio '+fmt(p):''}</div>
    ${its.map(g=>fila(g,modo==='m'?g.q.split(' ')[1]+'ª quincena':(g.id&&nomPor(g.por)?nomPor(g.por):'&nbsp;'))).join('')}
    </div><div class="spacer"></div>`}

function vMov(){
  const its=items(i).slice().sort((a,b)=>b.a-a.a);
  return barra()+`<div class="sec"><b>${its.length} movimientos</b><span>${fmt(tot(i))}</span></div>
  ${its.length?its.map(g=>fila(g,CM[g.cat].n+(modo==='m'?' · '+g.q.split(' ')[1]+'ª q':'')+(g.id&&nomPor(g.por)?' · '+nomPor(g.por):''))).join(''):'<p class="hint">Sin movimientos en este periodo.</p>'}
  <p class="hint">Toca cualquier gasto para corregirle el monto, el nombre o la categoría. También los del histórico.</p>
  <div class="spacer"></div>`}

const atajos=()=>conocidos().filter(e=>e.v>=3).slice(0,7);
function catsTop(n){const c={};todos().forEach(g=>{c[g.cat]=(c[g.cat]||0)+1});
  return CATS.slice().sort((a,b)=>(c[b.id]||0)-(c[a.id]||0)).slice(0,n)}

function bloqueCob(){
  return `<div class="sec"><b>¿Esto cubre varios meses?</b></div>
  <div class="pills">${[[1,'No, es de ahora'],[3,'3 meses'],[6,'6 meses'],[12,'12 meses']].map(([v,t])=>
    `<button class="pill ${cob===v?'sel':''}" data-cob="${v}">${t}</button>`).join('')}</div>
  ${cob>1?`<p class="hint">Se registra completo hoy — la plata salió hoy. Pero para los promedios cuenta como
   <b>${fmt(+amt*1000/(cob*2))}</b> por quincena, para que no distorsione lo que sigue.</p>`:''}`}

function bloqueFon(){if(!fondos().length)return '';
  return `<div class="sec"><b>¿Sale de un fondo?</b></div>
  <div class="pills"><button class="pill ${fon?'':'sel'}" data-fon="">No, de la quincena</button>
  ${fondos().map(f=>`<button class="pill ${fon===f.id?'sel':''}" data-fon="${f.id}">${esc(f.n)}</button>`).join('')}</div>
  ${fon&&FM()[fon]?`<p class="hint">No cuenta contra la meta de esta quincena: sale del saldo de
   <b>${esc(FM()[fon].n)}</b>, que hoy tiene ${fmt(saldo(FM()[fon],qIdx()))}.</p>`:''}`}

function formulario(modoEdit){
  const pesos=+amt*1000, c=conceptos[clave(nota)], km=CM[cat],
        preCob=!modoEdit&&!c&&pesos>=umbral(),
        preFon=!modoEdit&&!c&&fondos().length&&pesos>=umbral()/2,
        at=atajos();
  return `
  ${!modoEdit&&ultimo?`<div class="ok"><span>Guardado <b>${esc(ultimo.n)}</b> · ${fmt(ultimo.a)}</span>
    <button data-undo="1">Deshacer</button></div>`:''}
  ${!modoEdit&&at.length?`<div class="sec"><b>Lo de siempre</b><span>toca y ajusta</span></div>
  <div class="sugn atj">${at.map(e=>`<button data-at="${esc(e.n)}" data-ac="${e.cat}" data-am="${Math.round(e.med/1000)}">
    <span class="k" style="background:${(CM[e.cat]||{c:'#5f666e'}).c}"></span>
    <span><b>${esc(e.n)}</b><em>${fmtK(e.med)} de costumbre</em></span></button>`).join('')}</div>`:''}
  <div class="sec"><b>¿Cuánto?</b><span>en miles</span></div>
  <div class="amtw"><span class="cur">$</span>
    <input class="amtin" id="amt" inputmode="numeric" enterkeyhint="next" placeholder="0"
      value="${amt?(+amt).toLocaleString('es-CO'):''}"></div>
  <div class="amtp" id="amtp">${pesos?fmt(pesos):'escribe 135 y son $135.000'}</div>
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
  <button class="more" data-more="1">${detOpen?'Ocultar detalles ▴':'Más detalles ▾'}</button>
  ${detOpen?`<div class="sec"><b>¿Quién pagó?</b></div>
  <div class="pills">${H().map((pp,k)=>`<button class="pill ${idPor(por)===pp.id?'sel':''}" data-por="${pp.id}">
    <span class="d" style="background:${COLP[k%COLP.length]}"></span>${esc(pp.n)}</button>`).join('')}</div>
  ${preCob?'':bloqueCob()}${preFon?'':bloqueFon()}`:''}
  ${modoEdit?`<button class="btn" ${amt&&cat?'':'disabled'} data-upd="1">Guardar cambios</button>
    <button class="btn dan" data-rm2="1">Borrar este gasto</button>`
   :`<button class="btn" id="gb" ${amt&&cat?'':'disabled'} data-save="1">Guardar</button>`}
  <div class="spacer"></div>`}

function vReg(){const[a]=lbl(modo==='q'?i:Q.indexOf(MES[i]+' 2'));
  return topSimple('Nuevo gasto',a.toLowerCase(),false)+formulario(false)}
function vEdit(){const g=todos().find(x=>x.k===editKey);
  if(!g)return topSimple('Corregir','','mov')+'<p class="hint">Ese gasto ya no existe.</p><div class="spacer"></div>';
  return topSimple('Corregir gasto','registrado por ustedes','mov')+formulario(true)}

function vAn(){
  const t=tot(i),fx=fijos(i),dd=t-fx,ap=Math.max(APORTE()-prov(i),0);
  if(!t)return barra()+'<p class="hint">Registra algunos gastos y aquí aparece la lectura del periodo.</p><div class="spacer"></div>';
  const gaps=CATS.map(c=>({c,v:costo(i,c.id),p:prom(c.id)})).filter(x=>x.p>0).map(x=>({...x,d:x.v-x.p})).sort((a,b)=>b.d-a.d);
  const peor=gaps[0],cub=cubiertos();
  return barra()+`
  ${t>ap?`<div class="ins"><h4>${modo==='q'?'Esta quincena':'Este mes'} no alcanzó</h4>
    <p>Gastaron <span class="a">${fmt(t)}</span> contra ${fmt(ap)} disponibles. Faltaron <b>${fmt(t-ap)}</b>.</p></div>`
   :`<div class="ins good"><h4>Van dentro de la meta</h4><p>Gastaron ${fmt(t)} y quedan <span class="a">${fmt(ap-t)}</span>.</p></div>`}
  ${peor&&peor.d>0?`<div class="ins"><h4>Lo que se salió de lo normal</h4>
    <p><b>${peor.c.n}</b> va en <span class="a">${fmt(peor.v)}</span> contra un promedio de ${fmt(peor.p)}. Son ${fmt(peor.d)} de más.</p></div>`:''}
  <div class="ins"><h4>Cuánto ya estaba decidido</h4>
    <p>De ${fmt(t)}, <b>${fmt(fx)}</b> son compromisos fijos. Sobre ${fmt(dd)} es que realmente se puede decidir algo${dd>ap?' — más que el aporte entero':', el '+Math.round(dd/ap*100)+'% del aporte'}.</p></div>
  ${cub.length?`<div class="ins good"><h4>Ya está pagado</h4>
    <p>Esto lo pagaron por adelantado y todavía les cubre:</p>
    ${cub.map(g=>`<div class="cov"><span>${esc(g.n)}<em>hasta ${hastaQ(g).toLowerCase()}</em></span>
      <b>${fmt(g.a/per(g))}<em>por quincena</em></b></div>`).join('')}</div>`:''}
  <div class="spacer"></div>`}


/* ---------- meta y aportes ---------- */
function sugerida(){const T=todos(),v=[];
  for(let k=0;k<qIdx();k++){const s=T.filter(g=>g.q===Q[k]).reduce((a,g)=>a+g.a,0);if(s>0)v.push(s)}
  if(v.length<3)return 0;
  const u=v.slice(-6).sort((a,b)=>a-b),n=u.length;
  const med=n%2?u[(n-1)/2]:(u[n/2-1]+u[n/2])/2;
  return Math.round(med/50000)*50000}
const sumaAp=()=>(AJ.hogar||[]).reduce((s,p)=>s+(+p.a||0),0);
const sumaDesc=()=>(AJ.hogar||[]).reduce((s,p)=>s+(+p.d||0),0);
const metaAJ=()=>Math.max(sumaAp()-sumaDesc(),0);
const miles=v=>v?(+v).toLocaleString('es-CO'):'';

function vAjustes(){
  const m=metaAJ(),sug=sugerida(),q=Q[qIdx()].toLowerCase(),
        hs=AJ.hogar||[],
        ms=metas.slice().sort((x,y)=>Q.indexOf(x.desde)-Q.indexOf(y.desde)),
        dif=sug&&m?Math.abs(sug-m)/m:0;
  return topSimple('El hogar','qui\u00e9nes viven aqu\u00ed y cu\u00e1nto ponen','cfg')+`
  <div class="sec"><b>\u00bfQui\u00e9nes viven aqu\u00ed?</b><span>${hs.length===1?'1 persona':hs.length+' personas'}</span></div>
  ${hs.map((pp,k)=>`<div class="pers">
    <div class="ph">
      <span class="av2" style="background:${COLP[k%COLP.length]}">${esc((pp.n||'?').trim().charAt(0).toUpperCase()||'?')}</span>
      <input data-ph="${k}" value="${esc(pp.n||'')}" placeholder="Nombre" autocomplete="off">
      ${hs.length>1?`<button class="x" data-rmp="${k}">Quitar</button>`:''}
    </div>
    <div class="pl"><span>Aporta por quincena</span>
      <input data-pa="${k}" inputmode="numeric" value="${miles(pp.a)}" placeholder="0"></div>
    <div class="pl"><span>De eso, no llega al hogar<em>cuotas que salen del aporte pero no se gastan en la casa</em></span>
      <input data-pd="${k}" inputmode="numeric" value="${miles(pp.d)}" placeholder="0"></div>
  </div>`).join('')}
  <button class="addp" data-addp="1">+ Agregar otra persona</button>
  <div class="goal"><div class="l">Meta de la quincena</div>
    <div class="v" id="mv">${fmt(m)}</div>
    <div class="d" id="md">${fmt(sumaAp())} aportados \u2212 ${fmt(sumaDesc())} que no llegan</div></div>
  ${sug&&dif>0.08?`<div class="ins"><h4>Lo que dice su historial</h4>
    <p>En sus \u00faltimas quincenas gastaron <span class="a">${fmt(sug)}</span>, y la meta de arriba est\u00e1 en ${fmt(m)}.
    ${sug>m?'Con esta meta van a ir cortos casi todas las quincenas.':'La meta les est\u00e1 quedando holgada frente a lo que gastan.'}</p>
    <button class="btn sec2" data-usar="${sug}">Ajustar los aportes a ${fmt(sug)}</button></div>`:''}
  <div class="sec"><b>\u00bfDesde cu\u00e1ndo aplica?</b></div>
  <div class="seg"><button data-vig="siempre" class="${vig==='siempre'?'on':''}">Siempre</button>
  <button data-vig="desde" class="${vig==='desde'?'on':''}">Desde ${q}</button></div>
  <p class="hint">${vig==='siempre'?'Cambia la meta de todos los periodos, incluido el 2026 que ya est\u00e1 registrado.':'El historial se queda como estaba y la meta nueva aplica de '+q+' en adelante.'}</p>
  <button class="btn" data-gaj="1">Guardar</button>
  ${ms.length?'<div class="sec"><b>Cambios de meta guardados</b></div>'+ms.map(x=>`<button class="row" data-rmeta="${x.id}">
    <span class="ic" style="background:var(--surf3);color:var(--mute);font-size:17px">\u2191</span>
    <span class="tx"><b>${fmt(x.v)}</b><span>desde ${x.desde.toLowerCase()}</span></span>
    <span class="amt" style="font-size:13px;color:var(--brand);font-weight:500">Quitar</span></button>`).join(''):''}
  <div class="spacer"></div>`}

function pintaMeta(){const a=document.getElementById('mv'),b=document.getElementById('md');
  if(a)a.textContent=fmt(metaAJ());
  if(b)b.textContent=fmt(sumaAp())+' aportados \u2212 '+fmt(sumaDesc())+' que no llegan'}
function usarSug(v){const need=v+sumaDesc(),hs=AJ.hogar,tot=sumaAp();
  let queda=need;
  hs.forEach((pp,k)=>{const r=tot?(+pp.a||0)/tot:1/hs.length;
    if(k<hs.length-1){pp.a=Math.round(need*r/10000)*10000;queda-=pp.a}
    else pp.a=Math.max(queda,0)});
  render()}
function agregaPers(){AJ.hogar=(AJ.hogar||[]).concat([{id:uid4(),n:'',a:0,d:0}]);render()}
function quitaPers(k){if((AJ.hogar||[]).length<2)return;AJ.hogar.splice(k,1);render()}

async function guardarAj(){
  const m=metaAJ(),hs=(AJ.hogar||[]).map((pp,k)=>({id:pp.id||uid4(),n:(pp.n||'').trim()||('Persona '+(k+1)),
    a:+pp.a||0,d:+pp.d||0})),
    nuevo={...CFG,hogar:hs,p1:hs[0]?hs[0].n:'Yo',p2:hs[1]?hs[1].n:'Pareja',
      a1:hs[0]?hs[0].a:0,a2:hs[1]?hs[1].a:0,desc:hs.reduce((x,y)=>x+y.d,0)};
  if(vig==='siempre'){nuevo.meta=m;const viejas=metas.slice();metas=[];
    if(db){try{await Promise.all(viejas.map(x=>db.collection('metas').doc(x.id).delete()))}catch(e){}}}
  else{const id=uid4(),e2={id,v:m,desde:Q[qIdx()]};
    metas=metas.filter(x=>x.desde!==e2.desde).concat([e2]);
    if(db){try{await db.collection('metas').doc(id).set(e2)}catch(e){}}}
  CFG=nuevo;
  if(db){try{await db.collection('config').doc('hogar').set(CFG)}catch(e){}}
  AJ=null;view='home';det=null;render()}
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
  c.innerHTML=l.map(e=>{const k=CM[e.cat]||{n:'?',c:'#5f666e'};
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
   <span class="ci"><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.9" stroke-linecap="round"><circle cx="9" cy="8" r="3.2"/><path d="M3.5 19c.6-3 2.8-4.6 5.5-4.6s4.9 1.6 5.5 4.6"/><circle cx="17.5" cy="8.5" r="2.4"/><path d="M16 13.6c2.6-.3 4.4 1.2 4.9 4"/></svg></span>
   <span class="ct"><b>El hogar</b><span>${hs.map(p=>esc(p.n)).join(', ')} \u00b7 meta ${fmt(ap)} por quincena</span></span>
   <i>\u203a</i></button>
 <button class="cfgr" data-go2="fon">
   <span class="ci"><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.9" stroke-linecap="round"><path d="M4 8.5h16v10a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 18.5z"/><path d="M7 8.5V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2.5"/><path d="M12 12.5v3.5"/></svg></span>
   <span class="ct"><b>Fondos y metas</b><span>${fs.length?`${nm} meta${nm===1?'':'s'} y ${nf} fondo${nf===1?'':'s'} \u00b7 ${fmt(tc)} por quincena`:'todav\u00eda no apartan nada'}</span></span>
   <i>\u203a</i></button>
 <button class="cfgr" data-go2="apr">
   <span class="ci"><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.9" stroke-linecap="round"><path d="M4.5 12.5 9 17l10.5-10"/></svg></span>
   <span class="ct"><b>Lo que la app aprendi\u00f3</b><span>${ncc?ncc+' concepto'+(ncc===1?'':'s')+' con respuesta guardada':'todav\u00eda no ha aprendido nada'}</span></span>
   <i>\u203a</i></button>
 <button class="cfgr" data-inv="1">
   <span class="ci"><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.9" stroke-linecap="round"><path d="M4 6.5h16v11H4z"/><path d="m4.6 7.2 7.4 5.3 7.4-5.3"/></svg></span>
   <span class="ct"><b>Invitar a alguien</b><span>mandarle un enlace para que entre a este hogar</span></span>
   <i>\u203a</i></button>
 <button class="cfgr" data-out="1">
   <span class="ci"><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#e0536b" stroke-width="1.9" stroke-linecap="round"><path d="M14 4.5H6.5A1.5 1.5 0 0 0 5 6v12a1.5 1.5 0 0 0 1.5 1.5H14"/><path d="M17 8.5 20.5 12 17 15.5M20 12H10"/></svg></span>
   <span class="ct"><b>Cerrar sesión</b><span>${(sesion&&sesion.user&&sesion.user.email)||''}</span></span>
   <i>\u203a</i></button>
 <p class="hint">El hogar puede cambiar: alguien entra, alguien sale, o cambia lo que pone cada uno.
 Nada de esto queda fijo desde el principio \u2014 se ajusta aqu\u00ed cuando pase.</p>
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
  _cc=null;
  [...tabs.children].forEach(b=>b.classList.toggle('on',b.dataset.go===view));
  const y=scr.scrollTop;
  if(view==='aj'&&!AJ)AJ={...CFG,hogar:H().map(x=>({...x}))};
  scr.innerHTML=(view==='cfg'?vConfig():view==='apr'?vAprend():view==='fon'?vFondos():view==='aj'?vAjustes():view==='edit'?vEdit():det?vDet():view==='home'?vHome():view==='reg'?vReg():view==='mov'?vMov():vAn())
    +`<div class="sync ${db?'':'warn'}">${db?'Guardado en tu cuenta':'Sin conexión — no se está guardando'}</div>`;
  if(view==='reg'||view==='edit'){const n=document.getElementById('nota');if(n){
    n.oninput=e=>{nota=e.target.value;pintaSug()};
    n.onblur=()=>{setTimeout(()=>{if(conceptos[clave(nota)])render()},180)};
    pintaSug()}}
  scr.querySelectorAll('[data-mv]').forEach(b=>b.onclick=()=>{i+=+b.dataset.mv;det=null;render()});
  scr.querySelectorAll('[data-modo]').forEach(b=>b.onclick=()=>setModo(b.dataset.modo));
  scr.querySelectorAll('[data-cat]').forEach(b=>b.onclick=()=>{det=b.dataset.cat;render()});
  scr.querySelectorAll('[data-back]').forEach(b=>b.onclick=()=>{det=null;render()});
  scr.querySelectorAll('[data-go2]').forEach(b=>b.onclick=()=>{
    if(b.dataset.go2==='aj'){AJ={...CFG,hogar:H().map(x=>({...x}))};vig='siempre'}
    if(b.dataset.go2==='fon'){NF={n:'',c:0};NM={n:'',meta:0,mes:0}}
    if(b.dataset.go2==='reg'){amt='';cat=null;nota='';cob=1;fon='';por='';catOpen=false;detOpen=false;ultimo=null}
    view=b.dataset.go2;det=null;render()});
  scr.querySelectorAll('[data-ph]').forEach(el=>el.oninput=e=>{
    AJ.hogar[+el.dataset.ph].n=e.target.value;
    const av=el.parentNode.querySelector('.av2');
    if(av)av.textContent=(e.target.value||'?').trim().charAt(0).toUpperCase()||'?'});
  scr.querySelectorAll('[data-pa],[data-pd]').forEach(el=>el.oninput=e=>{
    const k=+(el.dataset.pa!==undefined?el.dataset.pa:el.dataset.pd),f=el.dataset.pa!==undefined?'a':'d',
          d=e.target.value.replace(/\D/g,'');
    AJ.hogar[k][f]=+d;e.target.value=miles(d);pintaMeta()});
  scr.querySelectorAll('[data-addp]').forEach(b=>b.onclick=agregaPers);
  scr.querySelectorAll('[data-rmp]').forEach(b=>b.onclick=()=>quitaPers(+b.dataset.rmp));
  scr.querySelectorAll('[data-vig]').forEach(b=>b.onclick=()=>{vig=b.dataset.vig;render()});
  scr.querySelectorAll('[data-usar]').forEach(b=>b.onclick=()=>usarSug(+b.dataset.usar));
  scr.querySelectorAll('[data-gaj]').forEach(b=>b.onclick=guardarAj);
  scr.querySelectorAll('[data-rmeta]').forEach(b=>b.onclick=()=>quitarMeta(b.dataset.rmeta));
  {const a=document.getElementById('amt');if(a){a.oninput=e=>{
     const d=e.target.value.replace(/\D/g,'').replace(/^0+/,'').slice(0,9);amt=d;
     e.target.value=d?(+d).toLocaleString('es-CO'):'';
     const pv=document.getElementById('amtp');if(pv)pv.textContent=d?fmt(+d*1000):'escribe 135 y son $135.000';
     const gb=document.getElementById('gb');if(gb)gb.disabled=!(amt&&cat)};
     a.onblur=()=>{if((+amt*1000>=umbral())||fondos().length)render()}}}
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
  scr.querySelectorAll('[data-inv]').forEach(b=>b.onclick=async()=>{
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
  editKey=k;amt=String(Math.round(g.a/1000));cat=g.cat;por=idPor(g.por);cob=g.cob||1;fon=g.fon||'';nota=g.n;
  catOpen=false;detOpen=false;ultimo=null;view='edit';det=null;render()}
async function guardar(){
  const q=modo==='q'?Q[i]:MES[i]+' 2';
  const nom=nota.trim()||CM[cat].n, kk=clave(nom), c=conceptos[kk],
        cb=(c&&cob===1)?(c.cob||1):cob, fn=(c&&!fon)?(c.fon||''):fon;
  const g={id:uid4(),q,cat,a:+amt*1000,n:nom,por,cob:cb,fon:fn,at:new Date().toISOString()};
  nuevos.push(g);
  if(kk&&(cb>1||fn)&&(!c||c.cob!==cb||c.fon!==fn)){const doc={k:kk,n:nom,cob:cb,fon:fn};conceptos[kk]=doc;
    if(db){try{await db.collection('conceptos').doc(kk).set(doc)}catch(e){}}}
  ultimo={...g};amt='';cat=null;nota='';cob=1;fon='';por='';catOpen=false;detOpen=false;
  view='reg';lastKey='';render();
  const a=document.getElementById('amt');if(a)a.focus();
  if(db){try{await db.collection('gastos').doc(g.id).set(g)}catch(e){}}}
async function deshacer(){if(!ultimo)return;const id=ultimo.id;
  nuevos=nuevos.filter(g=>g.id!==id);ultimo=null;render();
  if(db){try{await db.collection('gastos').doc(id).delete()}catch(e){}}}
async function guardarEdit(){
  const upd={cat,a:+amt*1000,n:nota.trim()||CM[cat].n,por,cob,fon},k=editKey;
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

let sb = null, sesion = null, hogarId = null, hogarRow = null, gate = null;

/* ---------- pantallas de cuenta ---------- */
function gateHTML(inner){ return `<div class="gate"><div class="gcard">
  <div class="glogo"><svg width="34" height="34" viewBox="0 0 24 24" fill="none"
    stroke="#e0536b" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round">
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
   <button class="gbtn gp" id="bMail">Enviarme un enlace para entrar</button>
   <p class="gfoot">Sin contraseñas: te llega un enlace al correo y entras con un toque.<br>
     Tus gastos solo los ves tú y quien invites a tu hogar.</p>`)}

function vCrearHogar(){
  return gateHTML(`
   <h1>Arma tu hogar</h1>
   <p class="gsub">Así sabemos de cuánta plata estamos hablando cada quincena.</p>
   <label class="glab">¿Cómo se llama tu hogar?</label>
   <input class="ginput" id="hNom" placeholder="Nuestro apartamento" autocomplete="off">
   <label class="glab">¿Cómo te llamas?</label>
   <input class="ginput" id="hYo" placeholder="Tu nombre" autocomplete="off">
   <label class="glab">¿Cuánto pones por quincena?</label>
   <input class="ginput gnum" id="hAp" inputmode="numeric" placeholder="0">
   <label class="glab">De eso, ¿cuánto no llega al hogar?</label>
   <input class="ginput gnum" id="hDe" inputmode="numeric" placeholder="0">
   <p class="gfoot" style="text-align:left;margin-top:8px">Cuotas que salen del mismo aporte pero no se
     gastan en la casa — el préstamo del carro, por ejemplo. Si no hay ninguna, déjalo en 0.</p>
   <button class="gbtn gp" id="bCrear">Crear mi hogar</button>
   <button class="glink" id="bSalir">Salir de esta cuenta</button>`)}

function pinta(html){ gate.innerHTML = html; gate.hidden = false;
  document.querySelector('.stage').hidden = true }
function entraApp(){ gate.hidden = true; document.querySelector('.stage').hidden = false }

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

async function ruta(){
  if (!sesion) { mostrarLogin(); return }

  // ¿invitación pendiente en la URL?
  const cod = new URLSearchParams(location.search).get('inv');
  if (cod) { try { await sb.rpc('aceptar_invitacion', { p_codigo: cod });
      history.replaceState({}, '', location.pathname) } catch(e){} }

  const { data: ms, error } = await sb.from('members')
    .select('household_id').eq('user_id', sesion.user.id).limit(1);
  if (error) { pinta(gateHTML(`<h1>No pudimos entrar</h1><p class="gsub">${error.message}</p>
    <button class="glink" id="bSalir">Salir de esta cuenta</button>`));
    document.getElementById('bSalir').onclick = salir; return }

  if (!ms || !ms.length) { mostrarCrear(); return }
  hogarId = ms[0].household_id;
  await cargar();
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
    const { error } = await sb.auth.signInWithOtp({ email, options:{ emailRedirectTo: dest } });
    mostrarLogin(error ? error.message
      : `Te enviamos un enlace a <b>${email}</b>. Ábrelo en este mismo teléfono.`);
  };
  document.getElementById('bMail').onclick = enviar;
  mail.onkeydown = e => { if (e.key === 'Enter') enviar() };
}

function mostrarCrear(){
  pinta(vCrearHogar());
  soloNum(document.getElementById('hAp')); soloNum(document.getElementById('hDe'));
  document.getElementById('bSalir').onclick = salir;
  document.getElementById('bCrear').onclick = async (ev) => {
    ev.target.disabled = true;
    const { data, error } = await sb.rpc('crear_hogar', {
      p_nombre: document.getElementById('hNom').value.trim(),
      p_mi_nombre: document.getElementById('hYo').value.trim(),
      p_aporte: leeNum('hAp'), p_descuento: leeNum('hDe') });
    if (error) { ev.target.disabled = false; alert(error.message); return }
    hogarId = data; await cargar(); entraApp(); suscribir(); render();
  };
}

async function salir(){ await sb.auth.signOut(); hogarId=null; location.reload() }

/* ---------- carga ---------- */
async function cargar(){
  const [h, ms, ex, fu, co, mc] = await Promise.all([
    sb.from('households').select('*').eq('id', hogarId).single(),
    sb.from('members').select('*').eq('household_id', hogarId).order('creado_en'),
    sb.from('expenses').select('*').eq('household_id', hogarId),
    sb.from('funds').select('*').eq('household_id', hogarId).order('creado_en'),
    sb.from('concepts').select('*').eq('household_id', hogarId),
    sb.from('meta_changes').select('*').eq('household_id', hogarId),
  ]);
  hogarRow = h.data || {};
  const miembros = ms.data || [];

  CFG = { ...CFG, meta: +hogarRow.meta_base || 0,
          hogar: miembros.map(m => ({ id:m.id, n:m.nombre, a:+m.aporte||0, d:+m.descuento||0 })) };

  nuevos = (ex.data||[]).map(r => ({ id:r.id, q:r.q, cat:r.cat, n:r.nombre, a:+r.monto,
            cob:+r.cobertura||1, fon:r.fund_id||'', por:r.pagado_por||'' }));
  overrides = {};

  fondOv = {}; (fu.data||[]).forEach(r => { fondOv[r.id] =
    { id:r.id, n:r.nombre, d:r.nota||'', c:+r.cuota||0, desde:r.desde_q,
      meta:+r.objetivo||0, mes:+r.meses||0 } });

  conceptos = {}; (co.data||[]).forEach(r => { conceptos[r.clave] =
    { k:r.clave, n:r.nombre, cob:+r.cobertura||1, fon:r.fund_id||'' } });

  metas = (mc.data||[]).map(r => ({ id:r.id, v:+r.valor, desde:r.desde_q }));

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
  await sb.from('households').update({ meta_base: c.meta||0 }).eq('id', hogarId);
  const quedan = (c.hogar||[]).map(p => p.id);
  const { data: actuales } = await sb.from('members').select('id').eq('household_id', hogarId);
  const fuera = (actuales||[]).map(m=>m.id).filter(x => !quedan.includes(x));
  if (fuera.length) await sb.from('members').delete().in('id', fuera);
  for (const p of (c.hogar||[])) {
    await sb.from('members').upsert({ id:p.id, household_id:hogarId,
      nombre:p.n||'', aporte:p.a||0, descuento:p.d||0 });
  }
}

/* ---------- invitar ---------- */
async function invitar(email, memberId){
  const { data, error } = await sb.from('invites')
    .insert({ household_id: hogarId, email, member_id: memberId||null,
              creado_por: sesion.user.id }).select('codigo').single();
  if (error) return null;
  return location.origin + location.pathname + '?inv=' + data.codigo;
}

window.addEventListener('DOMContentLoaded', arranque);
