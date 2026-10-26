/* ===== Configuração: edite aqui ===== */
const CFG={whats:"5511999999999",insta:"instagram_da_manicure"};
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const esc=t=>t.replace(/[&<>"]/g,c=>"&#"+c.charCodeAt(0)+";");
const R=v=>"R$ "+v,fmt=t=>t<60?t+"min":Math.floor(t/60)+"h"+(t%60||"");

/* ===== Dados ===== */
// Portfólio: [título, categoria, cor1, cor2, cor do esmalte, tipo (f=francesinha, a=arte, n=liso)]
const WORKS=[
["Francesinha clássica","Francesinha","#f6e3dc","#ecc7c0","#f2d8cf","f"],
["Francesinha rosé","Francesinha","#f8e6e4","#e8b9bd","#f2d8cf","f"],
["Floral delicado","Nail Art","#f3d7da","#d99aa6","#e8a5b3","a"],
["Cromado dourado","Nail Art","#f1e3cf","#d7b57e","#d9b877","a"],
["Gel alongado nude","Alongamento","#f4e4da","#dcb9a6","#e5c3b1","n"],
["Amendoada rosé","Alongamento","#f7e1e0","#c98f98","#d79aa5","n"],
["Blindagem natural","Manutenção","#efe6e1","#d4c3ba","#e3cfc4","n"],
["Reposição com brilho","Manutenção","#f6e8e4","#e0b8b0","#e9bfb7","n"],
["Pedicure cereja","Pés","#f5dede","#c9808b","#b5505f","p"],
["Spa dos pés nude","Pés","#f3e6dd","#d8bba8","#e6cdbc","s"]];
const CATS=["Todos","Francesinha","Nail Art","Alongamento","Manutenção","Pés"];
// Serviços. v = [cor1, cor2, cor do esmalte, tipo]. Para usar foto real, adicione img:"fotos/arquivo.jpg"
const SERV=[
{n:"Manicure tradicional",p:45,t:50,d:"Cutilagem, hidratação e esmaltação à escolha.",v:["#f6e3dc","#ecc7c0","#e8b5b0","n"]},
{n:"Pedicure completa",p:55,t:60,d:"Cuidado com cutículas, esfoliação e esmaltação.",v:["#f5dede","#d98d98","#b5505f","p"]},
{n:"Esmaltação em gel",p:80,t:60,d:"Brilho intenso e duração de até 3 semanas.",top:1,v:["#f3d7da","#d99aa6","#c9677a","g"]},
{n:"Alongamento em gel",p:180,t:150,d:"Estrutura leve e natural, no formato que você escolher.",top:1,v:["#f4e4da","#dcb9a6","#e5c3b1","l"]},
{n:"Manutenção de alongamento",p:120,t:120,d:"Reposição e acabamento a cada 15 a 20 dias.",v:["#efe6e1","#d4c3ba","#d9b9a8","l"]},
{n:"Nail art artesanal (por unha)",p:15,t:30,d:"Desenhos, cromados e pedrarias, a partir deste valor.",top:1,v:["#f1e3cf","#d7b57e","#e8a5b3","a"]},
{n:"Spa dos pés",p:110,t:90,d:"Esfoliação, máscara hidratante e massagem relaxante.",v:["#f3e6dd","#d8bba8","#e6cdbc","s"]}];
const PACK=[
{n:"Manutenção + Spa",p:210,de:230,t:200,d:"Manutenção de alongamento e spa dos pés no mesmo dia.",v:["#f4e4da","#d8bba8","#e5c3b1","m"]},
{n:"Mãos e pés",p:95,de:100,t:110,d:"Manicure e pedicure completas.",v:["#f7e1e0","#c98f98","#d79aa5","m"]},
{n:"Dia de noiva",p:320,de:360,t:240,d:"Mãos e pés com nail art delicada para o grande dia.",v:["#f8eee6","#e6cfa9","#f2d8cf","f"]}];
const ALL=[...SERV,...PACK];

/* ===== Ilustrações em SVG (sem imagens externas) ===== */
function ng(c,t){let s="";const k=t=="l"?1.3:1;  // unhas das mãos
 [46,58,64,58,44].forEach((h,i)=>{const H=h*k,x=14+i*34,y=100-H;
  s+=`<rect x="${x}" y="${y}" width="26" height="${H}" rx="13" fill="${t=="f"?"#f2d8cf":c}"/>`;
  if(t=="f")s+=`<rect x="${x}" y="${y}" width="26" height="14" rx="7" fill="#fff"/>`;
  if(t=="a")s+=`<circle cx="${x+13}" cy="${y+16}" r="3.2" fill="#f1d9a4"/>`;
  s+=`<rect x="${x+6}" y="${y+6}" width="4" height="${H/2.5}" rx="2" fill="#fff" opacity="${t=="g"?.7:.4}"/>`});return s}
function tg(c){let s="",x=18;  // unhas dos pés
 [[30,34],[24,28],[22,26],[20,24],[18,22]].forEach(([w,h])=>{const y=100-h;
  s+=`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="9" fill="${c}"/><rect x="${x+5}" y="${y+5}" width="4" height="${h/3}" rx="2" fill="#fff" opacity=".45"/>`;x+=w+9});return s}
function nails(c,t){let g;
 if(t=="p"||t=="s")g=tg(c)+(t=="s"?[[40,40,7],[150,30,10],[120,52,5],[70,26,4]].map(([x,y,r])=>`<circle cx="${x}" cy="${y}" r="${r}" fill="#fff" opacity=".6"/>`).join(""):"");
 else if(t=="m")g=`<g transform="translate(36 -6) scale(.62)">${ng(c,"n")}</g><g transform="translate(36 32) scale(.62)">${tg(c)}</g>`;
 else g=ng(c,t);
 return `<svg viewBox="0 0 190 110" aria-hidden="true">${g}</svg>`}

/* ===== Elementos compartilhados: cabeçalho, chamada, rodapé, WhatsApp, lightbox ===== */
const PG=[["index","Início"],["sobre","Sobre mim"],["portfolio","Portfólio"],["servicos","Serviços"],["agendamento","Agendar"],["contato","Contato"]];
const page=document.body.dataset.page;
const HD=`<header class="hd" id="hd"><div class="wrap"><a class="logo" href="index.html">Manicure <i>[Nome]</i></a><button class="bur" id="bur" aria-expanded="false">Menu</button><nav id="nav"><ul>${PG.map(([f,n])=>`<li><a href="${f}.html"${f==page?' aria-current="page"':""}>${n}</a></li>`).join("")}</ul></nav></div></header>`;
const CTA=`<section class="cta-b"><div class="wrap"><h2>Pronta para o seu próximo set de unhas?</h2><a class="btn" href="agendamento.html">Agendar Horário</a></div></section>`;
const FT=`<footer><div class="wrap"><div><h3>Manicure [Nome]</h3><p>Nail designer. Alongamento, nail art e spa dos pés com hora marcada.</p><p>[Razão social ou nome completo], CNPJ [00.000.000/0001-00]</p></div><div><h3>Navegue</h3>${PG.slice(1).map(([f,n])=>`<a href="${f}.html">${n}</a>`).join("")}</div><div><h3>Legal</h3><a href="termos.html">Termos de Uso</a><a href="privacidade.html">Política de Privacidade</a></div><div><h3>Contato</h3><a class="wal" target="_blank" rel="noopener">WhatsApp</a><a class="ial" target="_blank" rel="noopener">@instagram_da_manicure</a><p>Seg a sáb, 9h às 18h</p></div><p class="cp">© <span id="yr"></span> Manicure [Nome]. Todos os direitos reservados.</p></div></footer>`;
const WA=`<a class="wa wal" target="_blank" rel="noopener" aria-label="Conversar no WhatsApp"><svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.1 13.9c-.2.6-1.2 1.1-1.7 1.2-.4.1-1 .1-1.6-.1-.4-.1-.9-.3-1.5-.6-2.6-1.1-4.3-3.7-4.4-3.9-.1-.2-1-1.3-1-2.5s.6-1.8.9-2c.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.1.1.3 0 .4l-.3.5-.4.4c-.1.1-.3.3-.1.6.2.3.7 1.1 1.5 1.8 1 .9 1.9 1.2 2.2 1.3.3.1.4.1.6-.1l.8-1c.2-.2.4-.2.6-.1l1.9.9c.3.1.5.2.5.3.1.2.1.7-.1 1.3z"/></svg></a>`;
const LB=`<div class="lb" id="lb" role="dialog" aria-modal="true" aria-label="Foto ampliada"><button class="x" id="lx" aria-label="Fechar">&times;</button><button class="pn" id="lp" aria-label="Anterior">&lsaquo;</button><div><div class="lv" id="lv"></div><p id="lc"></p></div><button class="pn" id="ln" aria-label="Próxima">&rsaquo;</button></div>`;
document.body.insertAdjacentHTML("afterbegin",HD);
document.body.insertAdjacentHTML("beforeend",(["agendamento","termos","privacidade"].includes(page)?"":CTA)+FT+WA+LB);
$$(".wal").forEach(a=>a.href=`https://wa.me/${CFG.whats}?text=${encodeURIComponent("Olá! Gostaria de agendar um horário.")}`);
$$(".ial").forEach(a=>a.href=`https://instagram.com/${CFG.insta}`);
$("#yr").textContent=new Date().getFullYear();
$("#bur").onclick=()=>{const o=$("#nav").classList.toggle("open");$("#bur").setAttribute("aria-expanded",o)};
const onScroll=()=>$("#hd").classList.toggle("sc",scrollY>40);
addEventListener("scroll",onScroll,{passive:true});onScroll();
if($("#harch"))$("#harch").innerHTML=nails("#f0b8c0","a");
if($("#sarch"))$("#sarch").innerHTML=nails("#e5c3b1","f");

/* ===== Lightbox ===== */
let L=[],li=0;
function showLb(){const w=L[li];$("#lv").style.background=`linear-gradient(150deg,${w[2]},${w[3]})`;$("#lv").innerHTML=nails(w[4],w[5]);$("#lc").textContent=w[0]+" ("+w[1]+")"}
function openLb(l,i){L=l;li=i;showLb();$("#lb").classList.add("on");document.body.style.overflow="hidden"}
function closeLb(){$("#lb").classList.remove("on");document.body.style.overflow=""}
function step(d){li=(li+d+L.length)%L.length;showLb()}
$("#lx").onclick=closeLb;$("#lp").onclick=()=>step(-1);$("#ln").onclick=()=>step(1);
$("#lb").onclick=e=>{if(e.target.id=="lb")closeLb()};
addEventListener("keydown",e=>{if(!$("#lb").classList.contains("on"))return;
 if(e.key=="Escape")closeLb();if(e.key=="ArrowLeft")step(-1);if(e.key=="ArrowRight")step(1)});

/* ===== Galerias (início e portfólio) ===== */
function tiles(el,list){
 el.innerHTML=list.map((w,i)=>`<button class="tile" data-i="${i}" aria-label="Ampliar: ${w[0]}" style="background:linear-gradient(150deg,${w[2]},${w[3]})">${nails(w[4],w[5])}<span>${w[0]}<br>${w[1]}</span></button>`).join("");
 el.onclick=e=>{const b=e.target.closest(".tile");if(b)openLb(list,+b.dataset.i)}}
if($("#gq"))tiles($("#gq"),WORKS.slice(0,4));
if($("#pg")){
 $("#fl").innerHTML=CATS.map((c,i)=>`<button${i?"":' class="on"'}>${c}</button>`).join("");
 $("#fl").onclick=e=>{const b=e.target.closest("button");if(!b)return;
  $$("#fl button").forEach(x=>x.classList.toggle("on",x==b));
  tiles($("#pg"),b.textContent=="Todos"?WORKS:WORKS.filter(w=>w[1]==b.textContent))};
 tiles($("#pg"),WORKS)}

/* ===== Destaques, serviços e pacotes ===== */
if($("#hl"))$("#hl").innerHTML=SERV.map((s,i)=>s.top?`<article><h3>${s.n}</h3><p>${s.d}</p><p class="pr">${R(s.p)}, cerca de ${fmt(s.t)}</p><a href="agendamento.html?s=${i}">Agendar este serviço</a></article>`:"").join("");
if($("#sl")){
 $("#sl").innerHTML=SERV.map(s=>`<div class="mi"><div class="mr"><h3>${s.n}</h3><i></i><b>${R(s.p)}</b></div><p>${s.d} Duração média: ${fmt(s.t)}.</p></div>`).join("");
 $("#pk").innerHTML=PACK.map((s,i)=>`<article><h3>${s.n}</h3><p>${s.d} Duração média: ${fmt(s.t)}.</p><p><s>${R(s.de)}</s> <b>${R(s.p)}</b></p><a href="agendamento.html?s=${SERV.length+i}">Reservar pacote</a></article>`).join("")}

/* ===== Agendamento (simulado) ===== */
if($("#sm")){
 const m=$("#sm"),HRS=["09:00","10:30","13:00","14:30","16:00","17:30"],
 MES=["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"],
 MSG="Toque em uma foto para escolher o serviço.";
 const T=new Date();T.setHours(0,0,0,0);
 let sel=null,vw=new Date(T.getFullYear(),T.getMonth(),1),sd=null,st=null;

 // Menu horizontal de serviços com foto
 m.innerHTML=ALL.map((s,i)=>`<button type="button" class="svc" data-i="${i}" aria-pressed="false"><span class="ph" style="background:linear-gradient(150deg,${s.v[0]},${s.v[1]})">${s.img?`<img src="${s.img}" alt="${s.n}">`:nails(s.v[2],s.v[3])}</span><b>${s.n}</b><small>${R(s.p)}, ${fmt(s.t)}</small></button>`).join("");
 function pick(i){sel=i;$("#bm").textContent="";
  $$(".svc").forEach(b=>b.setAttribute("aria-pressed",b.dataset.i==i));
  const b=$$(".svc")[i];m.scrollTo({left:b.offsetLeft-(m.clientWidth-b.offsetWidth)/2,behavior:"smooth"});
  $("#sn").textContent="Serviço escolhido: "+ALL[i].n}
 m.onclick=e=>{const b=e.target.closest(".svc");if(b)pick(+b.dataset.i)};
 $("#sp").onclick=()=>m.scrollBy({left:-320,behavior:"smooth"});$("#sx").onclick=()=>m.scrollBy({left:320,behavior:"smooth"});
 const q=new URLSearchParams(location.search).get("s");if(q!==null&&ALL[+q])pick(+q);

 // Calendário
 function cal(){
  const y=vw.getFullYear(),mo=vw.getMonth(),n=new Date(y,mo+1,0).getDate();
  $("#cm").textContent=MES[mo]+" "+y;
  let h=["D","S","T","Q","Q","S","S"].map(d=>`<b>${d}</b>`).join("")+"<i></i>".repeat(vw.getDay());
  for(let d=1;d<=n;d++){const dt=new Date(y,mo,d),off=dt<T||dt.getDay()==0||dt-T>90*864e5;
   h+=`<button type="button" class="d${sd&&+sd==+dt?" on":""}${+dt==+T?" td":""}" data-d="${d}"${off?" disabled":""}>${d}</button>`}
  $("#cg").innerHTML=h;$("#pv").disabled=+vw<=+new Date(T.getFullYear(),T.getMonth(),1)}
 // Horários (alguns marcados como ocupados para a simulação)
 function slots(){
  if(!sd){$("#tm").innerHTML='<p class="mu">Escolha uma data para ver os horários livres.</p>';return}
  const now=new Date(),sat=sd.getDay()==6;
  $("#tm").innerHTML=HRS.slice(0,sat?4:6).map((h,i)=>{
   const busy=(sd.getDate()*7+i*3)%5==0,past=+sd==+T&&now.getHours()*60+now.getMinutes()>=(+h.slice(0,2))*60+(+h.slice(3));
   return `<button type="button" class="${st==h?"on":""}" data-t="${h}"${busy||past?" disabled":""}>${h}</button>`}).join("")}
 $("#cg").onclick=e=>{const b=e.target.closest(".d");if(!b)return;sd=new Date(vw.getFullYear(),vw.getMonth(),+b.dataset.d);st=null;cal();slots()};
 $("#tm").onclick=e=>{const b=e.target.closest("[data-t]");if(!b)return;st=b.dataset.t;slots()};
 $("#pv").onclick=()=>{vw.setMonth(vw.getMonth()-1);cal()};$("#nx").onclick=()=>{vw.setMonth(vw.getMonth()+1);cal()};
 cal();slots();

 // Formulário
 $("#ph").oninput=e=>{const v=e.target.value.replace(/\D/g,"").slice(0,11),k=v.length>10?7:6;
  e.target.value=v.length>k?`(${v.slice(0,2)}) ${v.slice(2,k)}-${v.slice(k)}`:v.length>2?`(${v.slice(0,2)}) ${v.slice(2)}`:v};
 $("#bf").onsubmit=e=>{e.preventDefault();
  const s=sel==null?null:ALL[sel],nm=$("#nm").value.trim(),ph=$("#ph").value.replace(/\D/g,"");
  if(!s)return $("#bm").textContent="Escolha um serviço no menu de fotos.";
  if(!sd)return $("#bm").textContent="Escolha uma data no calendário.";
  if(!st)return $("#bm").textContent="Escolha um horário livre.";
  if(nm.length<2)return $("#bm").textContent="Informe seu nome.";
  if(ph.length<10)return $("#bm").textContent="Informe um telefone com DDD.";
  if(!$("#ac").checked)return $("#bm").textContent="Para continuar, aceite os Termos de Uso e a Política de Privacidade.";
  const ds=sd.toLocaleDateString("pt-BR",{weekday:"long",day:"numeric",month:"long"});
  const msg=encodeURIComponent(`Olá! Agendei ${s.n} para ${ds} às ${st}. Meu nome é ${nm}.`);
  $("#bm").textContent="";$("#bf").style.display="none";$("#tm").style.display="none";$("#ok").hidden=false;
  $("#ok").innerHTML=`<h3>Pedido enviado, ${esc(nm.split(" ")[0])}!</h3><p>Reservei <b>${s.n}</b> para <b>${ds}</b> às <b>${st}</b>. Vou confirmar pelo WhatsApp em até 2 horas.</p><a class="btn" target="_blank" rel="noopener" href="https://wa.me/${CFG.whats}?text=${msg}">Confirmar pelo WhatsApp</a><button class="btn o" id="again">Novo agendamento</button>`;
  $("#again").onclick=()=>{$("#bf").reset();$("#bf").style.display="";$("#tm").style.display="";$("#ok").hidden=true;
   sel=sd=st=null;$$(".svc").forEach(b=>b.setAttribute("aria-pressed","false"));$("#sn").textContent=MSG;cal();slots()}}}

/* ===== Contato (simulado) ===== */
if($("#cf"))$("#cf").onsubmit=e=>{e.preventDefault();e.target.innerHTML="<h3>Mensagem enviada!</h3><p class='lead'>Obrigada pelo contato. Respondo em até 24 horas.</p>"};
