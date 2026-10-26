/* =========================================================
   TASK GUIDE FLOATING DRAWER (Shadow-DOM Isolated)
   Shows clear step-by-step task instructions directly inside
   the browser whenever a starter file in tasks/ is opened,
   without affecting the learner's own HTML or CSS!
   ========================================================= */

(function () {
  const scriptEl = document.currentScript || document.querySelector('script[data-task]');
  const taskId = scriptEl ? scriptEl.getAttribute('data-task') : '1';

  const TASKS = {
    '1': {
      title: 'Task 1: Meet Mochi! (HTML Skeleton & Tags)',
      files: 'tasks/task-01-html-skeleton/index.html',
      solutionUrl: '../../solutions/task-01-html-skeleton/index.html',
      intro: 'Right now this page only has raw placeholder text! Open this file in VS Code (or any text editor), complete the steps below, save (Ctrl+S), and refresh!',
      steps: [
        'Change the <title> inside <head> from "Change Me!" to "Meet Mochi the Cat!"',
        'Replace the placeholder heading with <h1>Meet Mochi!</h1>',
        'Add Mochi\'s photo: <img src="../../assets/mochi.svg" alt="Mochi the calico cat" width="260">',
        'Write a <p> paragraph introducing Mochi using <strong> (bold) and <em> (italic)',
        'Add a subheading: <h2>Mochi\'s Favorite Snacks</h2>',
        'Create a bullet list <ul> with three <li> snack items inside it',
        'Add a link <a href="https://en.wikipedia.org/wiki/Calico_cat" target="_blank">Learn more about Calico Cats</a>'
      ]
    },
    '2': {
      title: 'Task 2: Sunny Paws Shelter (Semantic HTML5)',
      files: 'tasks/task-02-semantic-html/index.html',
      solutionUrl: '../../solutions/task-02-semantic-html/index.html',
      intro: 'This page suffers from "div soup" — every block is a generic <div>! Open index.html in your code editor and replace the <div> tags with semantic HTML5 tags (note: the page will look visually similar, which is expected — semantics organize the code structure!).',
      steps: [
        'Change the top banner <div> (and its closing </div>) into <header> ... </header>',
        'Change the link bar <div> inside the header into <nav> ... </nav>',
        'Change the big middle wrapper <div> into <main> ... </main>',
        'Change <div id="about"> into <section id="about"> ... </section>',
        'Change <div id="residents"> into <section id="residents"> ... </section>',
        'Change Barnaby\'s and Luna\'s <div> blocks into <article> ... </article>',
        'Change <div id="contact"> at the bottom into <footer id="contact"> ... </footer>'
      ]
    },
    '3': {
      title: 'Task 3: The Daily Meow (CSS Colors, Fonts & Selectors)',
      files: 'index.html + style.css in tasks/task-03-css-colors-fonts/',
      solutionUrl: '../../solutions/task-03-css-colors-fonts/index.html',
      intro: 'Notice how plain this newspaper looks? style.css isn\'t connected yet, and its rules are waiting for you!',
      steps: [
        'In index.html (inside <head>), add: <link rel="stylesheet" href="style.css">',
        'In style.css, style body { background-color: #fff9f2; color: #2d2424; font-family: system-ui, sans-serif; line-height: 1.6; }',
        'Style h1 { color: #d95d39; font-size: 40px; text-align: center; }',
        'Style class .subtitle { text-align: center; color: #7a6a63; font-size: 18px; }',
        'Style class .highlight { background-color: #ffe3cc; color: #b54222; font-weight: bold; }',
        'Style class .cat-quote { font-style: italic; color: #5e3a8c; font-size: 19px; }',
        'Style ID #special-announcement { background-color: #231f2e; color: #ffd166; text-align: center; font-weight: bold; }'
      ]
    },
    '4': {
      title: 'Task 4: Sir Whiskers\' VIP Card (The CSS Box Model)',
      files: 'tasks/task-04-box-model-card/style.css',
      solutionUrl: '../../solutions/task-04-box-model-card/index.html',
      intro: 'Turn this giant unstyled photo and text into a sleek, centered adoption profile card using padding, border, border-radius, and margin!',
      steps: [
        'Style .cat-card: width: 350px; background-color: #ffffff; padding: 24px; border: 2px solid #d6e4f5; border-radius: 24px; margin: 48px auto; box-shadow: 0 14px 30px rgba(40,42,54,0.1);',
        'Style .cat-photo: width: 100%; display: block; border-radius: 16px; margin-bottom: 16px;',
        'Turn .badge into a pill tag: display: inline-block; background-color: #e3f6e8; color: #216e39; padding: 6px 12px; border-radius: 999px; font-size: 13px; font-weight: bold;',
        'Style .adopt-btn: width: 100%; padding: 14px 20px; background-color: #e63946; color: #ffffff; border: none; border-radius: 12px; font-weight: bold; cursor: pointer;'
      ]
    },
    '5': {
      title: 'Task 5: WhiskerSquad (Flexbox Layouts)',
      files: 'tasks/task-05-flexbox-layout/style.css',
      solutionUrl: '../../solutions/task-05-flexbox-layout/index.html',
      intro: 'Everything is stacked vertically right now! Add display: flex to the parent containers in style.css to snap the layout into place.',
      steps: [
        'On .navbar, add: display: flex; justify-content: space-between; align-items: center;',
        'On .nav-links, add: display: flex; gap: 24px; list-style: none; margin: 0; padding: 0;',
        'On .card-grid, add: display: flex; justify-content: center; gap: 24px; flex-wrap: wrap;',
        'On .cat-stats, add: display: flex; justify-content: space-between;'
      ]
    },
    '6': {
      title: 'Task 6: Petting Simulator (Hover & Smooth Transitions)',
      files: 'tasks/task-06-hover-magic/style.css',
      solutionUrl: '../../solutions/task-06-hover-magic/index.html',
      intro: 'Make Mochi and Luna\'s cards float smoothly when hovered and give the buttons tactile click feedback!',
      steps: [
        'Add transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease; to .cat-card',
        'Create .cat-card:hover with transform: translateY(-8px); box-shadow: 0 18px 36px rgba(35,31,46,0.14); border-color: #9b72cf;',
        'Add transition: transform 0.3s ease; to .cat-photo, and create .cat-card:hover .cat-photo { transform: scale(1.05); }',
        'Add transition to .pet-btn, darken on .pet-btn:hover, and add .pet-btn:active { transform: scale(0.96); }'
      ]
    },
    '7': {
      title: 'Final Project: "The Purrfect Cup" Cat Café ☕🐱',
      files: 'index.html + style.css in tasks/task-07-final-cat-cafe/',
      solutionUrl: '../../solutions/task-07-final-cat-cafe/index.html',
      intro: 'Combine HTML5 semantics, Box Model, Flexbox, and Hover animations to finish the Cat Café landing page!',
      steps: [
        'Milestone 1: Link style.css in index.html, add <nav class="main-nav"> links, and make .nav-wrapper & .main-nav Flex containers',
        'Milestone 2: Add Hero <h1>, <p>, and CTA buttons in index.html; style .hero-layout with Flexbox and add .btn:hover lift',
        'Milestone 3: Add a 3rd <article class="cat-card"> (Luna or Barnaby!) in index.html; style .cats-grid (Flexbox) & .cat-card (Box Model + :hover)',
        'Milestone 4: Align .menu-item rows using display: flex; justify-content: space-between; align-items: center;',
        'Milestone 5: Style .visit-layout with Flexbox and give .visit-card padding, border, and rounded corners!'
      ]
    }
  };

  const data = TASKS[taskId];
  if (!data) return;

  window.addEventListener('DOMContentLoaded', () => {
    const host = document.createElement('div');
    host.id = 'lecture-task-guide-host';
    document.body.appendChild(host);

    const shadow = host.attachShadow({ mode: 'open' });
    const storageKey = `emmi-lecture1-task-${taskId}-checks`;
    const minKey = `emmi-lecture1-task-${taskId}-min`;
    let savedChecks = {};
    try {
      savedChecks = JSON.parse(localStorage.getItem(storageKey) || '{}');
    } catch (_) {}
    let isMin = localStorage.getItem(minKey) === '1';

    shadow.innerHTML = `
      <style>
        :host {
          all: initial;
          position: fixed;
          right: 20px;
          bottom: 20px;
          z-index: 99999;
          font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
          color: #2d2424;
        }
        .panel {
          width: 390px;
          max-width: calc(100vw - 32px);
          max-height: 80vh;
          display: flex;
          flex-direction: column;
          background: #fffdf9;
          border: 2.5px solid #d95d39;
          border-radius: 18px;
          box-shadow: 0 16px 40px rgba(45, 36, 36, 0.22);
          overflow: hidden;
        }
        .panel.minimized {
          width: auto;
        }
        .panel.minimized .body {
          display: none;
        }
        .header {
          background: linear-gradient(135deg, #d95d39, #e76f51);
          color: #ffffff;
          padding: 12px 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          cursor: pointer;
          user-select: none;
        }
        .header-title {
          font-weight: 800;
          font-size: 14px;
          line-height: 1.3;
        }
        .toggle-btn {
          background: rgba(255,255,255,0.22);
          color: #fff;
          border: none;
          border-radius: 8px;
          padding: 4px 10px;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          white-space: nowrap;
        }
        .toggle-btn:hover {
          background: rgba(255,255,255,0.35);
        }
        .body {
          padding: 14px 16px 16px 16px;
          overflow-y: auto;
          font-size: 13.5px;
          line-height: 1.5;
        }
        .file-badge {
          display: block;
          background: #fff3e6;
          border: 1px solid #f0d4be;
          color: #9c4221;
          font-family: Consolas, monospace;
          font-size: 12px;
          padding: 6px 10px;
          border-radius: 8px;
          margin-bottom: 10px;
          word-break: break-all;
        }
        .intro {
          margin: 0 0 12px 0;
          color: #4a3b37;
        }
        .steps {
          list-style: none;
          padding: 0;
          margin: 0 0 14px 0;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .step-item {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          background: #ffffff;
          border: 1px solid #eadbcf;
          padding: 8px 10px;
          border-radius: 10px;
        }
        .step-item.done {
          background: #edf9f0;
          border-color: #b7e4c7;
          color: #52796f;
          text-decoration: line-through;
        }
        .step-item input {
          margin-top: 3px;
          accent-color: #2d7a46;
          cursor: pointer;
          flex-shrink: 0;
        }
        .step-item label {
          cursor: pointer;
          font-size: 13px;
        }
        .footer-links {
          display: flex;
          justify-content: space-between;
          gap: 8px;
          flex-wrap: wrap;
          padding-top: 10px;
          border-top: 1px solid #eadbcf;
        }
        a.btn {
          text-decoration: none;
          font-size: 12.5px;
          font-weight: 700;
          padding: 7px 12px;
          border-radius: 9px;
          background: #f3e8de;
          color: #2d2424;
        }
        a.btn-sol {
          background: #2a9d8f;
          color: #ffffff;
        }
      </style>
      <div class="panel ${isMin ? 'minimized' : ''}" id="panel">
        <div class="header" id="headerBar">
          <span class="header-title">📋 ${data.title}</span>
          <button class="toggle-btn" id="minBtn">${isMin ? 'Show Steps ▲' : 'Minimize ▼'}</button>
        </div>
        <div class="body">
          <span class="file-badge">✏️ Edit in VS Code: ${data.files}</span>
          <p class="intro">${data.intro}</p>
          <ul class="steps">
            ${data.steps.map((s, idx) => {
              const escaped = s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
              const checked = savedChecks[idx] ? 'checked' : '';
              const doneCls = savedChecks[idx] ? 'done' : '';
              return `<li class="step-item ${doneCls}">
                <input type="checkbox" id="chk-${idx}" data-idx="${idx}" ${checked}>
                <label for="chk-${idx}"><strong>${idx + 1}.</strong> ${escaped}</label>
              </li>`;
            }).join('')}
          </ul>
          <div class="footer-links">
            <a class="btn" href="../../index.html#module-${taskId}">← Back to Lecture</a>
            <a class="btn btn-sol" href="${data.solutionUrl}" target="_blank">👀 Target Solution ↗</a>
          </div>
        </div>
      </div>
    `;

    const panel = shadow.getElementById('panel');
    const minBtn = shadow.getElementById('minBtn');
    const headerBar = shadow.getElementById('headerBar');

    headerBar.addEventListener('click', () => {
      isMin = !isMin;
      panel.classList.toggle('minimized', isMin);
      minBtn.textContent = isMin ? 'Show Steps ▲' : 'Minimize ▼';
      try { localStorage.setItem(minKey, isMin ? '1' : '0'); } catch (_) {}
    });

    shadow.querySelectorAll('input[type="checkbox"]').forEach((chk) => {
      chk.addEventListener('change', () => {
        const idx = chk.getAttribute('data-idx');
        savedChecks[idx] = chk.checked;
        chk.closest('.step-item').classList.toggle('done', chk.checked);
        try { localStorage.setItem(storageKey, JSON.stringify(savedChecks)); } catch (_) {}
      });
    });
  });
})();
