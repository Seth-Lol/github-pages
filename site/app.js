const arabicToKhmer = {
  0: '០', 1: '១', 2: '២', 3: '៣', 4: '៤',
  5: '៥', 6: '៦', 7: '៧', 8: '៨', 9: '៩',
};

const subjectLabels = [
  ['Khmer', 'ភាសាខ្មែរ', 'Khmer'],
  ['Math', 'គណិតវិទ្យា', 'Math'],
  ['Bio', 'ជីវវិទ្យា', 'Biology'],
  ['History', 'ប្រវត្តិវិទ្យា', 'History'],
  ['Chemistry', 'គីមីវិទ្យា', 'Chemistry'],
  ['Physic', 'រូបវិទ្យា', 'Physics'],
  ['Language', 'ភាសាបរទេស', 'Language'],
];

let students = [];
const form = document.querySelector('#search-form');
const input = document.querySelector('#search-input');
const initialState = document.querySelector('#initial-state');
const resultsContent = document.querySelector('#results-content');
const resultsSection = document.querySelector('#results-section');

function normalize(value) {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/[0-9]/g, digit => arabicToKhmer[digit])
    .replace(/[.,/\\|_\-–—()]/g, ' ')
    .replace(/\s+/g, ' ');
}

function escapeHtml(value) {
  return String(value || '').replace(/[&<>'"]/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;',
  })[character]);
}

function scoreTone(score) {
  if (score === 'A') return 'score-a';
  if (score === 'B') return 'score-b';
  if (score === 'C') return 'score-c';
  return 'score-neutral';
}

function renderStudent(student, index) {
  const subjects = subjectLabels.map(([key, khmer, english]) => `
    <div class="subject">
      <div class="subject-copy"><strong>${khmer}</strong><small>${english}</small></div>
      <span class="subject-score ${scoreTone(student.Scores[key])}">${escapeHtml(student.Scores[key])}</span>
    </div>
  `).join('');

  return `
    <article class="result-card" style="animation-delay:${Math.min(index * 45, 180)}ms">
      <div class="student-head">
        <div class="grade-box ${scoreTone(student.Grade)}">${escapeHtml(student.Grade)}</div>
        <div class="student-copy">
          <div class="student-meta"><span class="pass-pill">${escapeHtml(student['Total Result'])}</span><span class="page-ref">Page ${student['Page Number']} / ${student['Total Pages']}</span></div>
          <h3>${escapeHtml(student.Name)}</h3>
          <p class="school">${escapeHtml(student['School Name'])}</p>
        </div>
      </div>
      <div class="summary">
        <div><p class="label">Overall grade</p><p class="value grade-value">Grade ${escapeHtml(student.Grade)}</p></div>
        <div><p class="label">Birthday</p><p class="value">${escapeHtml(student.Birthday || 'មិនមានទិន្នន័យ')}</p></div>
      </div>
      <div class="subjects"><p class="label">Subject grades</p><div class="subject-grid">${subjects}</div></div>
    </article>
  `;
}

function search(query) {
  const needle = normalize(query);
  if (!needle) return;

  const matches = students.filter(student =>
    normalize(student.Name).includes(needle) || normalize(student.Birthday) === needle
  );

  initialState.hidden = true;
  if (!matches.length) {
    resultsContent.innerHTML = `
      <div class="state-card not-found">
        <div class="state-icon">!</div>
        <h2>រកមិនឃើញលទ្ធផល</h2>
        <p>Check the spelling, try only the family name, or enter the birthday exactly as printed.</p>
        <button type="button" id="reset-search">ស្វែងរកម្តងទៀត</button>
      </div>`;
    document.querySelector('#reset-search').addEventListener('click', resetSearch);
  } else {
    resultsContent.innerHTML = `
      <div class="results-heading">
        <div><p>Search results</p><h2>រកឃើញ ${matches.length} លទ្ធផល</h2></div>
        <span class="count-pill">${matches.length} found</span>
      </div>
      <div class="cards">${matches.map(renderStudent).join('')}</div>`;
  }
  setTimeout(() => resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
}

function resetSearch() {
  input.value = '';
  resultsContent.innerHTML = '';
  initialState.hidden = false;
  input.focus();
}

form.addEventListener('submit', event => {
  event.preventDefault();
  search(input.value);
});

document.querySelectorAll('[data-example]').forEach(button => {
  button.addEventListener('click', () => {
    input.value = button.dataset.example;
    input.focus();
  });
});

fetch('./results.json')
  .then(response => {
    if (!response.ok) throw new Error('Could not load results');
    return response.json();
  })
  .then(data => { students = data; })
  .catch(() => {
    initialState.innerHTML = '<div class="state-icon">!</div><h2>មិនអាចផ្ទុកទិន្នន័យបានទេ</h2><p>Please refresh and try again.</p>';
  });

window.addEventListener('load', () => {
  const telegram = window.Telegram && window.Telegram.WebApp;
  if (telegram) {
    telegram.ready();
    telegram.expand();
    if (telegram.setHeaderColor) telegram.setHeaderColor('#ffffff');
    if (telegram.setBackgroundColor) telegram.setBackgroundColor('#f4f7fb');
  }
});
