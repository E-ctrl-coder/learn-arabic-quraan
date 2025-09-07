/* Paste your FULL taxonomy below. Node schema:
  {
    id:       "uniqueId",
    labelAr:  "Arabic Text",
    labelEn:  "English Text",  // or "" if none
    group:    "noun"|"verb"|"particle",
    x:        100, y: 200,      // absolute px for your shape
    children: ["childId1","childId2",...]
  }
*/

const classification = [
  // ROOT
  { id:"root",     labelAr:"الكلمة",            labelEn:"Word",        group:"noun",     x:900,  y:60,  children:["verb","particle","noun"] },

  // VERB BRANCH
  { id:"verb",     labelAr:"فعل",               labelEn:"Verb",        group:"verb",     x:300,  y:260, children:["past","present","future","imperative","passive"] },
  { id:"past",     labelAr:"الماضي",            labelEn:"Past",        group:"verb",     x:180,  y:420, children:[] },
  { id:"present",  labelAr:"المضارع",           labelEn:"Present",     group:"verb",     x:300,  y:420, children:[] },
  { id:"future",   labelAr:"المستقبل",          labelEn:"Future",      group:"verb",     x:420,  y:420, children:[] },
  { id:"imperative",labelAr:"الأمر",            labelEn:"Imperative",  group:"verb",     x:240,  y:560, children:[] },
  { id:"passive",  labelAr:"مبني للمجهول",      labelEn:"Passive",     group:"verb",     x:360,  y:560, children:[] },

  // PARTICLE BRANCH
  { id:"particle", labelAr:"حرف",               labelEn:"Particle",    group:"particle", x:900,  y:260, children:[
      "linking","interrogation","vocative","conditional","explanation","emphasis",
      "exception","dissuasion","wishHope","alert","joulb","reasonPurpose","specMin","oath","defParticles"
    ]
  },
  { id:"linking",        labelAr:"الربط",            labelEn:"Linking",                group:"particle", x:780, y:420, children:[] },
  { id:"interrogation",  labelAr:"الاستفهام",        labelEn:"Interrogation",          group:"particle", x:900, y:420, children:[] },
  { id:"vocative",       labelAr:"النداء",           labelEn:"Vocative",              group:"particle", x:1020,y:420, children:[] },
  { id:"conditional",    labelAr:"الشرط",            labelEn:"Conditional",           group:"particle", x:780, y:560, children:[] },
  { id:"explanation",    labelAr:"التفسير",          labelEn:"Explanation",           group:"particle", x:900, y:560, children:[] },
  { id:"emphasis",       labelAr:"التوكيد",          labelEn:"Emphasis",              group:"particle", x:1020,y:560, children:[] },
  { id:"exception",      labelAr:"الاستثناء",        labelEn:"Exception",             group:"particle", x:780, y:700, children:[] },
  { id:"dissuasion",     labelAr:"التحضيض",          labelEn:"Dissuasion",            group:"particle", x:900, y:700, children:[] },
  { id:"wishHope",       labelAr:"التمني والرجاء",    labelEn:"Wish & Hope",           group:"particle", x:1020,y:700, children:[] },
  { id:"alert",          labelAr:"التنبيه",          labelEn:"Warning",               group:"particle", x:780, y:840, children:[] },
  { id:"joulb",          labelAr:"الجولب",           labelEn:"Joulb",                 group:"particle", x:900, y:840, children:[] },
  { id:"reasonPurpose",  labelAr:"التعليل والغاية",   labelEn:"Reason & Purpose",      group:"particle", x:1020,y:840, children:[] },
  { id:"specMin",        labelAr:"التخصيص والتقليل", labelEn:"Specification & Diminution",group:"particle", x:780, y:980, children:[] },
  { id:"oath",           labelAr:"القسم",            labelEn:"Oath",                  group:"particle", x:900, y:980, children:[] },
  { id:"defParticles",   labelAr:"حروف تعريف",       labelEn:"Defining Particles",    group:"particle", x:1020,y:980, children:[] },

  // NOUN BRANCH
  { id:"noun",     labelAr:"اسم",               labelEn:"Noun",        group:"noun",     x:1500, y:260, children:["properNoun","representative","derivedVerb"] },
  { id:"properNoun",    labelAr:"اسم علم",         labelEn:"Proper Noun",            group:"noun", x:1360, y:420, children:[] },
  { id:"representative",labelAr:"تمثيلي",          labelEn:"Representative",         group:"noun", x:1500, y:420, children:["relative","demonstrative","pronouns"] },
  { id:"derivedVerb",   labelAr:"مشتق من الفعل",   labelEn:"Derived from Verb",      group:"noun", x:1640, y:420, children:[
      "ismMafool","ismFael","ismAla","ismZaman","ismMakan","sifaMush","ismTafdeel","ismMubalagh"
    ]
  },

  { id:"relative",       labelAr:"اسم موصول",       labelEn:"Relative Pronoun",       group:"noun", x:1360, y:580, children:[] },
  { id:"demonstrative",  labelAr:"اسم إشارة",       labelEn:"Demonstrative",          group:"noun", x:1500, y:580, children:[] },

  { id:"pronouns",       labelAr:"ضمائر",           labelEn:"Pronouns",              group:"noun", x:1640, y:580, children:[
      "subjectPronoun","possPronoun","addressPronoun","absentPronoun","speakerPronoun","objectPronoun"
    ]
  },
  { id:"subjectPronoun", labelAr:"ضمير رفع",        labelEn:"Subject Pronoun",        group:"noun", x:1400, y:740, children:[] },
  { id:"possPronoun",    labelAr:"ملكية",           labelEn:"Possessive Pronoun",     group:"noun", x:1520, y:740, children:["possVerb","possNoun"] },
  { id:"addressPronoun", labelAr:"ضمير مخاطب",      labelEn:"Address Pronoun",        group:"noun", x:1640, y:740, children:[] },
  { id:"absentPronoun",  labelAr:"ضمير غائب",       labelEn:"Absent Pronoun",         group:"noun", x:1760, y:740, children:[] },
  { id:"speakerPronoun", labelAr:"ضمير متكلم",      labelEn:"Speaker Pronoun",        group:"noun", x:1880, y:740, children:[] },
  { id:"objectPronoun",  labelAr:"ضمير نصب",        labelEn:"Object Pronoun",         group:"noun", x:2000, y:740, children:[] },
  { id:"possVerb",       labelAr:"ملكية فعل",       labelEn:"Possessive Verb",        group:"noun", x:1500, y:880, children:[] },
  { id:"possNoun",       labelAr:"ملكية اسم",       labelEn:"Possessive Noun",        group:"noun", x:1640, y:880, children:[] },

  { id:"ismMafool",      labelAr:"اسم المفعول",     labelEn:"Passive Participle",     group:"noun", x:1540, y:580, children:[] },
  { id:"ismFael",        labelAr:"اسم الفاعل",      labelEn:"Active Participle",      group:"noun", x:1660, y:580, children:[] },
  { id:"sifaMush",       labelAr:"صفة مشبهة",       labelEn:"Resembling Adjective",    group:"noun", x:1780, y:580, children:[] },
  { id:"ismTafdeel",     labelAr:"اسم التفضيل",     labelEn:"Elative",                group:"noun", x:1900, y:580, children:[] },
  { id:"ismAla",         labelAr:"اسم آلة",         labelEn:"Instrument Noun",         group:"noun", x:1540, y:740, children:[] },
  { id:"ismZaman",       labelAr:"اسم زمان",        labelEn:"Noun of Time",           group:"noun", x:1660, y:740, children:[] },
  { id:"ismMakan",       labelAr:"اسم مكان",        labelEn:"Noun of Place",          group:"noun", x:1780, y:740, children:[] },
  { id:"ismMubalagh",    labelAr:"اسم مبالغة",      labelEn:"Form of Exaggeration",    group:"noun", x:1900, y:740, children:[] }
];

/* ————————————————————————— ENGINE ————————————————————————— */
const nodesById = new Map(classification.map(n => [n.id, n]));
const childrenOf = new Map(classification.map(n => [n.id, n.children||[]]));
const parentsOf = new Map();
classification.forEach(n => (n.children||[]).forEach(c => parentsOf.set(c, n.id)));

const container = document.getElementById("diagram-container");
const nodesLayer = document.getElementById("nodes");
const svg = document.getElementById("connectors");
const infoPanel = document.getElementById("info-panel");
const closeInfo = document.getElementById("close-info");
const infoContent = document.getElementById("info-content");

// autosize canvas
(function autosize(){
  const pad = 200;
  const maxX = Math.max(...classification.map(n => n.x)) + pad;
  const maxY = Math.max(...classification.map(n => n.y)) + pad;
  svg.setAttribute("width",  maxX);
  svg.setAttribute("height", maxY);
  nodesLayer.style.width  = `${maxX}px`;
  nodesLayer.style.height = `${maxY}px`;
})();

function makeNodeEl(n){
  const div = document.createElement("div");
  div.className = "node";
  div.dataset.id = n.id;
  div.dataset.group = n.group;
  div.style.left = `${n.x}px`;
  div.style.top  = `${n.y}px`;
  div.innerHTML = `<span class="ar">${n.labelAr}</span><span class="en">${n.labelEn}</span>`;
  div.addEventListener("mouseenter",()=> highlightPath(n.id,true));
  div.addEventListener("mouseleave",()=> highlightPath(n.id,false));
  div.addEventListener("click",e=>{
    e.stopPropagation();
    focusSubtree(n.id);
    showInfo(n);
  });
  return div;
}

function pathBetween(a,b,group){
  const x1=a.x+90, y1=a.y+56;
  const x2=b.x+90, y2=b.y;
  const dx=(x2-x1)*0.35;
  const d=`M${x1} ${y1} C${x1} ${y1+dx}, ${x2} ${y2-dx}, ${x2} ${y2}`;
  const p=document.createElementNS("http://www.w3.org/2000/svg","path");
  p.setAttribute("d",d);
  p.setAttribute("class","connector");
  p.dataset.group=group;
  p.dataset.parent=a.id;
  p.dataset.child=b.id;
  return p;
}

function drawAll(){
  classification.forEach(n=> nodesLayer.appendChild(makeNodeEl(n)));
  classification.forEach(n=>{
    (n.children||[]).forEach(cid=>{
      const c=nodesById.get(cid);
      svg.appendChild(pathBetween(n,c,n.group));
    });
  });
}

function highlightPath(id,on){
  nodesLayer.querySelector(`.node[data-id="${id}"]`)
    ?.classList.toggle("active",on);
  svg.querySelectorAll(`[data-parent="${id}"],[data-child="${id}"]`)
    .forEach(p=>p.style.strokeWidth= on?"3.6":"2.2");
}

function focusSubtree(root){
  const keep=new Set();
  (function down(id){ keep.add(id); (childrenOf.get(id)||[]).forEach(down); })(root);
  (function up(id){ const p=parentsOf.get(id); if(p){ keep.add(p); up(p);} })(root);
  nodesLayer.querySelectorAll(".node").forEach(el=>
    el.classList.toggle("dimmed",!keep.has(el.dataset.id))
  );
  svg.querySelectorAll(".connector").forEach(p=>{
    const ok= keep.has(p.dataset.parent)&&keep.has(p.dataset.child);
    p.classList.toggle("dimmed",!ok);
  });
}

function clearFocus(){
  nodesLayer.querySelectorAll(".node").forEach(el=>el.classList.remove("dimmed","active"));
  svg.querySelectorAll(".connector").forEach(p=>p.classList.remove("dimmed"));
}

function showInfo(n){
  infoContent.innerHTML=`
    <h2>${n.labelAr}${n.labelEn? " | "+n.labelEn:""}</h2>
    <p>هنا يمكن وضع التعريفات والأمثلة.<br/>Definitions/examples go here.</p>
  `;
  infoPanel.classList.remove("hidden");
}

closeInfo.addEventListener("click",()=>infoPanel.classList.add("hidden"));
document.addEventListener("click",e=>{
  if(!infoPanel.contains(e.target)) clearFocus();
});

drawAll();
