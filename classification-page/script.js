/* Engine for fixed-shape, bilingual, fully interactive diagram.
   Paste your COMPLETE classification below in the 'classification' array.
   Node schema:
   {
     id: "unique",
     labelAr: "Arabic",
     labelEn: "English or ''",
     group: "noun" | "verb" | "particle",
     x: 123, y: 456, // absolute pixels
     children: ["child1","child2",...]
   }
*/
const classification = [
  // ===== PASTE YOUR FULL CLASSIFICATION HERE =====
  // Example seed (remove if you’re pasting full data):
  { id:"root", labelAr:"الكلمة", labelEn:"Word", group:"noun", x:900, y:60, children:["noun","verb","particle"] },

  // Noun branch — sample items (replace with your complete list and positions)
  { id:"noun", labelAr:"الاسم", labelEn:"Noun", group:"noun", x:600, y:220, children:["proper","pronoun","derived","inflected","diptote"] },
  { id:"proper", labelAr:"اسم علم", labelEn:"Proper Noun", group:"noun", x:420, y:380, children:[] },
  { id:"pronoun", labelAr:"الضمير", labelEn:"Pronoun", group:"noun", x:560, y:380, children:[] },
  { id:"derived", labelAr:"اسم مشتق", labelEn:"Derived Noun", group:"noun", x:700, y:380, children:["ismFael","ismMafool","sifaMushabbaha","sighatMubalaghah","ismTafdeel","ismZaman","ismMakan","ismAla"] },
  { id:"inflected", labelAr:"المعرب", labelEn:"Inflected", group:"noun", x:840, y:380, children:[] },
  { id:"diptote", labelAr:"الممنوع من الصرف", labelEn:"Diptote", group:"noun", x:980, y:380, children:[] },

  { id:"ismFael", labelAr:"اسم الفاعل", labelEn:"Active Participle", group:"noun", x:660, y:540, children:[] },
  { id:"ismMafool", labelAr:"اسم المفعول", labelEn:"Passive Participle", group:"noun", x:740, y:540, children:[] },
  { id:"sifaMushabbaha", labelAr:"الصفة المشبهة", labelEn:"Resembling Adjective", group:"noun", x:820, y:540, children:[] },
  { id:"sighatMubalaghah", labelAr:"صيغة المبالغة", labelEn:"Form of Exaggeration", group:"noun", x:900, y:540, children:[] },
  { id:"ismTafdeel", labelAr:"اسم التفضيل", labelEn:"Elative", group:"noun", x:980, y:540, children:[] },
  { id:"ismZaman", labelAr:"اسم الزمان", labelEn:"Noun of Time", group:"noun", x:1060, y:540, children:[] },
  { id:"ismMakan", labelAr:"اسم المكان", labelEn:"Noun of Place", group:"noun", x:1140, y:540, children:[] },
  { id:"ismAla", labelAr:"اسم الآلة", labelEn:"Instrument Noun", group:"noun", x:1220, y:540, children:[] },

  // Verb branch — add your complete set (Past/Present/Future/Imperative + subtypes if any)
  { id:"verb", labelAr:"الفعل", labelEn:"Verb", group:"verb", x:900, y:220, children:["past","present","future","imperative"] },
  { id:"past", labelAr:"الماضي", labelEn:"Past", group:"verb", x:820, y:380, children:[] },
  { id:"present", labelAr:"المضارع", labelEn:"Present", group:"verb", x:900, y:380, children:[] },
  { id:"future", labelAr:"المستقبل", labelEn:"Future", group:"verb", x:980, y:380, children:[] },
  { id:"imperative", labelAr:"الأمر", labelEn:"Imperative", group:"verb", x:1060, y:380, children:[] },

  // Particle branch — add complete sets (prepositions, conjunctions, other)
  { id:"particle", labelAr:"الحرف", labelEn:"Particle", group:"particle", x:1200, y:220, children:["preps","conj","otherParticles"] },
  { id:"preps", labelAr:"حروف الجر", labelEn:"Prepositions", group:"particle", x:1120, y:380, children:[] },
  { id:"conj", labelAr:"حروف العطف", labelEn:"Conjunctions", group:"particle", x:1200, y:380, children:[] },
  { id:"otherParticles", labelAr:"حروف أخرى", labelEn:"Other Particles", group:"particle", x:1280, y:380, children:[] },
  // ===== END OF SAMPLE =====
];

// ————————————————————————— ENGINE —————————————————————————
const nodesById = new Map(classification.map(n => [n.id, n]));
const childrenOf = new Map(classification.map(n => [n.id, n.children || []]));
const parentsOf = new Map();
classification.forEach(n => (n.children||[]).forEach(c => parentsOf.set(c, n.id)));

const container = document.getElementById("diagram-container");
const nodesLayer = document.getElementById("nodes");
const svg = document.getElementById("connectors");
const infoPanel = document.getElementById("info-panel");
const closeInfo = document.getElementById("close-info");
const infoContent = document.getElementById("info-content");

// Expand canvas if needed based on max coordinates
(function autosize(){
  const pad = 200;
  const maxX = Math.max(...classification.map(n => n.x)) + pad;
  const maxY = Math.max(...classification.map(n => n.y)) + pad;
  svg.setAttribute("width", String(maxX));
  svg.setAttribute("height", String(maxY));
  nodesLayer.style.width = `${maxX}px`;
  nodesLayer.style.height = `${maxY}px`;
})();

function makeNodeEl(node){
  const div = document.createElement("div");
  div.className = "node";
  div.dataset.id = node.id;
  div.dataset.group = node.group;
  div.style.left = `${node.x}px`;
  div.style.top = `${node.y}px`;

  const ar = document.createElement("span");
  ar.className = "ar";
  ar.textContent = node.labelAr;

  const en = document.createElement("span");
  en.className = "en";
  en.textContent = node.labelEn || "";

  div.append(ar, en);

  div.addEventListener("mouseenter", () => highlightPath(node.id, true));
  div.addEventListener("mouseleave", () => highlightPath(node.id, false));
  div.addEventListener("click", (e) => {
    e.stopPropagation();
    focusSubtree(node.id);
    showInfo(node);
  });

  return div;
}

function pathBetween(a, b, group){
  // Smooth cubic curve from parent (bottom center) to child (top center)
  const x1 = a.x + 90, y1 = a.y + 56;
  const x2 = b.x + 90, y2 = b.y;
  const dx = (x2 - x1) * 0.35;
  const d = `M ${x1} ${y1} C ${x1} ${y1+dx}, ${x2} ${y2-dx}, ${x2} ${y2}`;
  const p = document.createElementNS("http://www.w3.org/2000/svg","path");
  p.setAttribute("d", d);
  p.setAttribute("class","connector");
  p.dataset.group = group;
  p.dataset.parent = a.id;
  p.dataset.child = b.id;
  return p;
}

function drawAll(){
  // nodes
  classification.forEach(n => nodesLayer.appendChild(makeNodeEl(n)));
  // connectors
  classification.forEach(n => {
    (n.children||[]).forEach(cid => {
      const c = nodesById.get(cid);
      if(!c) return;
      svg.appendChild(pathBetween(n, c, n.group));
    });
  });
}

function highlightPath(id, on){
  // highlight node and its direct connectors
  const nodeEl = nodesLayer.querySelector(`.node[data-id="${id}"]`);
  if(!nodeEl) return;
  nodeEl.classList.toggle("active", on);
  svg.querySelectorAll(`[data-parent="${id}"],[data-child="${id}"]`)
     .forEach(p => p.style.strokeWidth = on ? "3.6" : "2.2");
}

function focusSubtree(rootId){
  // Dim everything except subtree rooted at rootId and its ancestors
  const keep = new Set();
  (function walkDown(id){
    keep.add(id);
    (childrenOf.get(id)||[]).forEach(walkDown);
  })(rootId);
  (function walkUp(id){
    const p = parentsOf.get(id);
    if(p){ keep.add(p); walkUp(p); }
  })(rootId);

  nodesLayer.querySelectorAll(".node").forEach(el=>{
    el.classList.toggle("dimmed", !keep.has(el.dataset.id));
  });
  svg.querySelectorAll("path.connector").forEach(p=>{
    const show = keep.has(p.dataset.parent) && keep.has(p.dataset.child);
    p.classList.toggle("dimmed", !show);
  });
}

function clearFocus(){
  nodesLayer.querySelectorAll(".node").forEach(el=>el.classList.remove("dimmed","active"));
  svg.querySelectorAll("path.connector").forEach(p=>p.classList.remove("dimmed"));
}

function showInfo(node){
  infoContent.innerHTML = `
    <h2>${node.labelAr}${node.labelEn ? " | " + node.labelEn : ""}</h2>
    <p>التفاصيل والتعريفات والأمثلة يمكن وضعها هنا.<br/>Details/definitions/examples can go here.</p>
    <p><strong>Group:</strong> ${node.group}</p>
    <p><strong>Children:</strong> ${(node.children||[]).length}</p>
  `;
  infoPanel.classList.remove("hidden");
}

closeInfo.addEventListener("click", ()=> infoPanel.classList.add("hidden"));
document.addEventListener("click", (e)=>{
  if(!infoPanel.contains(e.target)) clearFocus();
});

drawAll();
