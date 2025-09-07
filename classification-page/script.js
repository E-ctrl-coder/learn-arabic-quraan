const content = {
  word: {
    brief: "أصغر وحدة لغوية ذات معنى / Smallest meaningful linguistic unit",
    details: "In Arabic grammar, words are classified into three main types...",
    examples: []
  },
  noun: {
    brief: "يدل على اسم شيء أو شخص / Refers to a person, place, or thing",
    details: "Nouns can be definite or indefinite...",
    examples: ["كتاب", "محمد"]
  },
  verb: {
    brief: "يدل على حدث وزمن / Indicates an action and time",
    details: "Verbs are categorized by tense and mood...",
    examples: ["كتب", "يكتب", "اكتب"]
  },
  derived: {
    brief: "أسماء مشتقة من الأفعال / Nouns derived from verbs",
    details: "Includes active participle, passive participle, etc.",
    examples: ["كاتب", "مكتوب"]
  },
  proper: {
    brief: "اسم شخص أو مكان محدد / Specific person or place name",
    details: "E.g., محمد, مكة",
    examples: ["محمد", "مكة"]
  },
  pronoun: {
    brief: "كلمة تحل محل الاسم / Word that replaces a noun",
    details: "E.g., هو, هي",
    examples: ["هو", "هي"]
  }
};

const tooltip = document.getElementById('tooltip');
const detailsContainer = document.getElementById('details-container');

document.querySelectorAll('.node').forEach(node => {
  const key = node.dataset.key;
  node.addEventListener('mouseover', e => {
    tooltip.textContent = content[key].brief;
    tooltip.style.display = 'block';
    tooltip.style.top = (e.pageY + 10) + 'px';
    tooltip.style.left = (e.pageX + 10) + 'px';
  });
  node.addEventListener('mouseout', () => tooltip.style.display = 'none');
  node.addEventListener('click', e => {
    e.stopPropagation();
    showDetails(key, node);
  });
});

function showDetails(key, clickedEl) {
  document.querySelectorAll('.node').forEach(el => {
    if (el !== clickedEl) el.classList.add('fade-out');
  });
  const data = content[key];
  detailsContainer.innerHTML = `
    <div class="details">
      <button class="close-btn" onclick="closeDetails()">× Close</button>
      <h2>${clickedEl.innerHTML}</h2>
      <p>${data.details}</p>
      <strong>Examples:</strong>
      <ul>${data.examples.map(ex => `<li>${ex}</li>`).join('')}</ul>
    </div>
  `;
}

function closeDetails() {
  detailsContainer.innerHTML = '';
  document.querySelectorAll('.fade-out').forEach(el => el.classList.remove('fade-out'));
}
