/* =========================================================
   LECTURE 1 INTERACTIVE HUB SCRIPT
   Powers chapter navigation, Presentation Mode, Copy buttons,
   and all live interactive HTML/CSS playgrounds!
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  const panels = Array.from(document.querySelectorAll('.chapter-panel'));
  const navBtns = Array.from(document.querySelectorAll('.chapter-btn'));
  const prevBtn = document.getElementById('prevChapterBtn');
  const nextBtn = document.getElementById('nextChapterBtn');
  const progressFill = document.getElementById('progressFill');
  const progressLabel = document.getElementById('progressLabel');
  const togglePresentBtn = document.getElementById('togglePresentBtn');

  let currentChapter = 0;

  function goToChapter(index, pushHash = true) {
    if (index < 0 || index >= panels.length) return;
    currentChapter = index;

    panels.forEach((p, i) => p.classList.toggle('active', i === index));
    navBtns.forEach((b, i) => b.classList.toggle('active', i === index));

    const pct = Math.round(((index + 1) / panels.length) * 100);
    if (progressFill) progressFill.style.width = `${pct}%`;
    if (progressLabel) progressLabel.textContent = `Module ${index} of ${panels.length - 1}`;

    if (prevBtn) prevBtn.disabled = index === 0;
    if (nextBtn) {
      nextBtn.disabled = index === panels.length - 1;
      nextBtn.textContent = index === panels.length - 1 ? 'Course Complete! 🎉' : 'Next Module →';
    }

    if (pushHash) {
      history.replaceState(null, '', `#module-${index}`);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  navBtns.forEach((btn, idx) => {
    btn.addEventListener('click', () => goToChapter(idx));
  });

  if (prevBtn) prevBtn.addEventListener('click', () => goToChapter(currentChapter - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => goToChapter(currentChapter + 1));

  // Restore chapter from URL hash if present
  const hashMatch = window.location.hash.match(/^#module-(\d+)$/);
  if (hashMatch) {
    const parsed = parseInt(hashMatch[1], 10);
    if (parsed >= 0 && parsed < panels.length) {
      goToChapter(parsed, false);
    }
  } else {
    goToChapter(0, false);
  }

  // Keyboard navigation (Left / Right arrows when not inside an input/select)
  document.addEventListener('keydown', (e) => {
    const tag = (e.target && e.target.tagName) ? e.target.tagName.toLowerCase() : '';
    if (tag === 'input' || tag === 'select' || tag === 'textarea') return;
    if (e.key === 'ArrowRight') goToChapter(currentChapter + 1);
    if (e.key === 'ArrowLeft') goToChapter(currentChapter - 1);
  });

  // Presentation Mode Toggle
  if (togglePresentBtn) {
    togglePresentBtn.addEventListener('click', () => {
      const active = document.body.classList.toggle('presentation-mode');
      togglePresentBtn.textContent = active ? '📖 Exit Presentation' : '🖥️ Presentation Mode';
    });
  }

  // Copy-to-Clipboard Buttons on Code Blocks
  document.querySelectorAll('.copy-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.code-card');
      const pre = card ? card.querySelector('pre') : null;
      if (!pre) return;
      navigator.clipboard.writeText(pre.innerText).then(() => {
        const orig = btn.textContent;
        btn.textContent = 'Copied! ✓';
        setTimeout(() => { btn.textContent = orig; }, 1400);
      });
    });
  });

  /* =========================================================
     WIDGET 1: HTML TAG ANATOMY INSPECTOR
     ========================================================= */
  const tokenParts = document.querySelectorAll('.token-part');
  const tokenExplain = document.getElementById('tokenExplain');
  const explanations = {
    open: '<strong>1. Opening Tag <code>&lt;a ...&gt;</code></strong>: Tells the browser "Start a clickable link right here!" Think of it as the top slice of bread in a sandwich.',
    attr: '<strong>2. Attribute <code>href="https://cats.com"</code></strong>: Extra settings that live <em>inside</em> the opening tag! Here, <code>href</code> tells the link WHERE to go when clicked.',
    content: '<strong>3. Content <code>Pet Mochi!</code></strong>: The actual text (or image) the human visitor sees and clicks on the webpage.',
    close: '<strong>4. Closing Tag <code>&lt;/a&gt;</code></strong>: Notice the forward slash <code>/</code>! It tells the browser "Stop the link right here!" (Otherwise the entire rest of your page would become one giant link!)'
  };

  tokenParts.forEach((part) => {
    part.addEventListener('click', () => {
      tokenParts.forEach((p) => p.classList.remove('selected'));
      part.classList.add('selected');
      const key = part.getAttribute('data-part');
      if (tokenExplain && explanations[key]) {
        tokenExplain.innerHTML = explanations[key];
      }
    });
  });

  /* =========================================================
     WIDGET 3: CSS SELECTOR PLAYGROUND
     ========================================================= */
  const selBtns = document.querySelectorAll('.sel-btn');
  const selCats = document.querySelectorAll('.sel-cat-item');
  const selExplain = document.getElementById('selectorExplain');

  const selectorNotes = {
    'article': 'Tag Selector <code>article { ... }</code> — Selects <strong>ALL 3 cats</strong> because every cat is inside an <code>&lt;article&gt;</code> tag!',
    '.sleepy': 'Class Selector <code>.sleepy { ... }</code> — Selects <strong>Mochi &amp; Luna</strong> because both wear the reusable <code>class="sleepy"</code> badge!',
    '.dapper': 'Class Selector <code>.dapper { ... }</code> — Selects <strong>Sir Whiskers</strong> because he has <code>class="dapper"</code>.',
    '#luna-vip': 'ID Selector <code>#luna-vip { ... }</code> — Targets <strong>ONLY Luna</strong> via her one-of-a-kind <code>id="luna-vip"</code> microchip!'
  };

  function applySelectorDemo(selector) {
    selBtns.forEach((b) => b.classList.toggle('active', b.getAttribute('data-sel') === selector));
    selCats.forEach((cat) => {
      const classes = (cat.getAttribute('data-classes') || '').split(' ');
      const id = cat.getAttribute('data-id') || '';
      let match = false;
      if (selector === 'article') match = true;
      else if (selector.startsWith('.') && classes.includes(selector.slice(1))) match = true;
      else if (selector.startsWith('#') && id === selector.slice(1)) match = true;
      cat.classList.toggle('matched', match);
    });
    if (selExplain && selectorNotes[selector]) {
      selExplain.innerHTML = selectorNotes[selector];
    }
  }

  selBtns.forEach((btn) => {
    btn.addEventListener('click', () => applySelectorDemo(btn.getAttribute('data-sel')));
  });
  if (selBtns.length > 0) applySelectorDemo('.sleepy');

  /* =========================================================
     WIDGET 4: BOX MODEL ("CAT IN A CARDBOARD BOX") VISUALIZER
     ========================================================= */
  const padRange = document.getElementById('bmPadding');
  const borRange = document.getElementById('bmBorder');
  const radRange = document.getElementById('bmRadius');
  const marRange = document.getElementById('bmMargin');

  const padVal = document.getElementById('bmPaddingVal');
  const borVal = document.getElementById('bmBorderVal');
  const radVal = document.getElementById('bmRadiusVal');
  const marVal = document.getElementById('bmMarginVal');

  const cardboardBox = document.getElementById('bmCardboardBox');
  const bmCodeOut = document.getElementById('bmCodeOutput');

  function updateBoxModel() {
    if (!cardboardBox || !padRange) return;
    const p = padRange.value;
    const b = borRange.value;
    const r = radRange.value;
    const m = marRange.value;

    padVal.textContent = `${p}px`;
    borVal.textContent = `${b}px`;
    radVal.textContent = `${r}px`;
    marVal.textContent = `${m}px`;

    cardboardBox.style.padding = `${p}px`;
    cardboardBox.style.borderWidth = `${b}px`;
    cardboardBox.style.borderRadius = `${r}px`;
    cardboardBox.style.margin = `${m}px`;

    if (bmCodeOut) {
      bmCodeOut.textContent =
`.cat-box {
  padding: ${p}px;        /* Soft green blanket INSIDE */
  border: ${b}px solid #8d5b4c; /* Cardboard walls */
  border-radius: ${r}px;  /* Corner roundness */
  margin: ${m}px;         /* Personal space OUTSIDE */
}`;
    }
  }

  [padRange, borRange, radRange, marRange].forEach((el) => {
    if (el) el.addEventListener('input', updateBoxModel);
  });
  updateBoxModel();

  /* =========================================================
     WIDGET 5: FLEXBOX WINDOWSILL PLAYGROUND
     ========================================================= */
  const flexJustify = document.getElementById('flexJustify');
  const flexAlign = document.getElementById('flexAlign');
  const flexDir = document.getElementById('flexDir');
  const flexGap = document.getElementById('flexGap');
  const sillStage = document.getElementById('windowsillStage');
  const flexCodeOut = document.getElementById('flexCodeOutput');

  function updateFlexDemo() {
    if (!sillStage || !flexJustify) return;
    const jc = flexJustify.value;
    const ai = flexAlign.value;
    const fd = flexDir.value;
    const g = flexGap.value;

    sillStage.style.justifyContent = jc;
    sillStage.style.alignItems = ai;
    sillStage.style.flexDirection = fd;
    sillStage.style.gap = g;

    if (flexCodeOut) {
      flexCodeOut.textContent =
`.windowsill {
  display: flex;
  flex-direction: ${fd};
  justify-content: ${jc};
  align-items: ${ai};
  gap: ${g};
}`;
    }
  }

  [flexJustify, flexAlign, flexDir, flexGap].forEach((el) => {
    if (el) el.addEventListener('change', updateFlexDemo);
  });
  updateFlexDemo();

  /* =========================================================
     INTERACTIVE LIVE CODE SANDBOXES FOR ALL 7 TASKS
     ========================================================= */
  const SANDBOX_DATA = {
    '1': {
      hasCss: false,
      defaultTab: 'html',
      starterHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <!-- TODO 1: Change the tab title below! -->
  <title>Change Me!</title>
</head>
<body>

  <!-- TODO 2: Replace this line with <h1>Meet Mochi!</h1> -->
  <p>[Replace me with an h1 heading!]</p>

  <!-- TODO 3: Add Mochi's image:
       <img src="assets/mochi.svg" alt="Mochi the calico cat" width="220"> -->


  <!-- TODO 4: Wrap this sentence in <p>...</p> and make one word
       <strong>bold</strong> and one word <em>italic</em>! -->
  Mochi is a professional napper who loves sunny windowsills.

  <!-- TODO 5: Add <h2>Mochi's Favorite Snacks</h2> -->


  <!-- TODO 6: Create a <ul> list with three <li> snack items -->


  <!-- TODO 7: Add <a href="https://en.wikipedia.org/wiki/Calico_cat" target="_blank">Learn more</a> -->

</body>
</html>`,
      solutionHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <title>Meet Mochi the Cat!</title>
</head>
<body>

  <h1>Meet Mochi!</h1>

  <img src="assets/mochi.svg" alt="Mochi the calico cat" width="220">

  <p>
    Mochi is a <strong>professional napper</strong> who believes every cardboard box belongs to <em>her</em>.
  </p>

  <h2>Mochi's Favorite Snacks</h2>
  <ul>
    <li>Crispy salmon treats</li>
    <li>Steamed chicken</li>
    <li>Anything currently on your plate</li>
  </ul>

  <p>
    <a href="https://en.wikipedia.org/wiki/Calico_cat" target="_blank">
      Learn more about Calico Cats
    </a>
  </p>

</body>
</html>`,
      starterCss: '',
      solutionCss: ''
    },

    '2': {
      hasCss: false,
      defaultTab: 'html',
      starterHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <title>Sunny Paws Cat Shelter</title>
</head>
<body>

  <!-- TODO 1: Change outer <div> to <header>, and inner link <div> to <nav> -->
  <div>
    <h1>Sunny Paws Cat Shelter</h1>
    <div>
      <a href="#about">About Us</a> |
      <a href="#residents">Our Cats</a> |
      <a href="#contact">Visit Us</a>
    </div>
  </div>

  <hr>

  <!-- TODO 2: Change wrapper <div> to <main>, topic divs to <section>, and cat divs to <article> -->
  <div>
    <div id="about">
      <h2>About Our Shelter</h2>
      <p>We rescue sleepy kitties and match them with loving forever homes.</p>
    </div>

    <div id="residents">
      <h2>Cats Looking for a Home</h2>

      <div>
        <h3>Barnaby (Age: 3)</h3>
        <img src="assets/barnaby.svg" alt="Barnaby" width="180">
        <p>Loves chasing teal yarn balls and announcing dinner time.</p>
      </div>

      <div>
        <h3>Luna (Age: 2)</h3>
        <img src="assets/luna.svg" alt="Luna" width="180">
        <p>Quiet shadow ninja who purrs when you read a book.</p>
      </div>
    </div>
  </div>

  <hr>

  <!-- TODO 3: Change bottom <div> to <footer> -->
  <div id="contact">
    <p>12 Whisker Lane &bull; &copy; 2026 Sunny Paws Cat Shelter</p>
  </div>

</body>
</html>`,
      solutionHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <title>Sunny Paws Cat Shelter</title>
</head>
<body>

  <header>
    <h1>Sunny Paws Cat Shelter</h1>
    <nav>
      <a href="#about">About Us</a> |
      <a href="#residents">Our Cats</a> |
      <a href="#contact">Visit Us</a>
    </nav>
  </header>

  <hr>

  <main>
    <section id="about">
      <h2>About Our Shelter</h2>
      <p>We rescue sleepy kitties and match them with loving forever homes.</p>
    </section>

    <section id="residents">
      <h2>Cats Looking for a Home</h2>

      <article>
        <h3>Barnaby (Age: 3)</h3>
        <img src="assets/barnaby.svg" alt="Barnaby" width="180">
        <p>Loves chasing teal yarn balls and announcing dinner time.</p>
      </article>

      <article>
        <h3>Luna (Age: 2)</h3>
        <img src="assets/luna.svg" alt="Luna" width="180">
        <p>Quiet shadow ninja who purrs when you read a book.</p>
      </article>
    </section>
  </main>

  <hr>

  <footer id="contact">
    <p>12 Whisker Lane &bull; &copy; 2026 Sunny Paws Cat Shelter</p>
  </footer>

</body>
</html>`,
      starterCss: '',
      solutionCss: ''
    },

    '3': {
      hasCss: true,
      requireLinkTag: true,
      defaultTab: 'html',
      starterHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <title>The Daily Meow</title>
  <!-- TODO 1: Connect style.css right below!
       <link rel="stylesheet" href="style.css"> -->

</head>
<body>
  <header>
    <h1>The Daily Meow</h1>
    <p class="subtitle">All the cat news that's fit to sit on.</p>
  </header>

  <div id="special-announcement">
    Breaking: Luna stares at empty wall for 14 minutes!
  </div>

  <article>
    <h2>Why Cats Knock Things Off Tables</h2>
    <img src="assets/luna.svg" alt="Luna" width="190">
    <p>
      Scientists call it curiosity. Cats call it <span class="highlight">gravity testing</span>.
    </p>
    <p class="cat-quote">
      "I tapped the pen onto the floor. 10/10 would do again." — Luna
    </p>
  </article>
</body>
</html>`,
      solutionHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <title>The Daily Meow</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <header>
    <h1>The Daily Meow</h1>
    <p class="subtitle">All the cat news that's fit to sit on.</p>
  </header>

  <div id="special-announcement">
    Breaking: Luna stares at empty wall for 14 minutes!
  </div>

  <article>
    <h2>Why Cats Knock Things Off Tables</h2>
    <img src="assets/luna.svg" alt="Luna" width="190">
    <p>
      Scientists call it curiosity. Cats call it <span class="highlight">gravity testing</span>.
    </p>
    <p class="cat-quote">
      "I tapped the pen onto the floor. 10/10 would do again." — Luna
    </p>
  </article>
</body>
</html>`,
      starterCss: `/* Switch here after adding <link rel="stylesheet" href="style.css">! */

/* TODO 2: Style body (background-color: #fff9f2; color: #2d2424; font-family: sans-serif; line-height: 1.6;) */


/* TODO 3: Style h1 (color: #d95d39; font-size: 34px; text-align: center;) */


/* TODO 4: Style .subtitle (text-align: center; color: #7a6a63;) */


/* TODO 5: Style .highlight (background-color: #ffe3cc; color: #b54222; font-weight: bold;) */


/* TODO 6: Style .cat-quote (font-style: italic; color: #5e3a8c;) */


/* TODO 7: Style #special-announcement (background-color: #231f2e; color: #ffd166; text-align: center; padding: 10px;) */
`,
      solutionCss: `body {
  background-color: #fff9f2;
  color: #2d2424;
  font-family: 'Segoe UI', system-ui, sans-serif;
  line-height: 1.6;
  padding: 16px;
}

h1 {
  color: #d95d39;
  font-size: 34px;
  text-align: center;
  margin-bottom: 4px;
}

.subtitle {
  text-align: center;
  color: #7a6a63;
  margin-top: 0;
}

.highlight {
  background-color: #ffe3cc;
  color: #b54222;
  font-weight: bold;
  padding: 2px 6px;
  border-radius: 4px;
}

.cat-quote {
  font-style: italic;
  color: #5e3a8c;
  font-size: 17px;
}

#special-announcement {
  background-color: #231f2e;
  color: #ffd166;
  text-align: center;
  font-weight: bold;
  padding: 10px;
  border-radius: 8px;
}`
    },

    '4': {
      hasCss: true,
      defaultTab: 'css',
      starterHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <title>Sir Whiskers Card</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <article class="cat-card">
    <img class="cat-photo" src="assets/whiskers.svg" alt="Sir Whiskers">
    <span class="badge">Available for Cuddles</span>
    <h1 class="cat-name">Sir Whiskers</h1>
    <p class="cat-role">Tuxedo Gentleman &bull; 4 Years Old</p>
    <p class="cat-bio">
      Always dressed for a gala. Demands chin scratches at 8:00 AM sharp.
    </p>
    <button class="adopt-btn">Apply to Adopt</button>
  </article>
</body>
</html>`,
      solutionHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <title>Sir Whiskers Card</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <article class="cat-card">
    <img class="cat-photo" src="assets/whiskers.svg" alt="Sir Whiskers">
    <span class="badge">Available for Cuddles</span>
    <h1 class="cat-name">Sir Whiskers</h1>
    <p class="cat-role">Tuxedo Gentleman &bull; 4 Years Old</p>
    <p class="cat-bio">
      Always dressed for a gala. Demands chin scratches at 8:00 AM sharp.
    </p>
    <button class="adopt-btn">Apply to Adopt</button>
  </article>
</body>
</html>`,
      starterCss: `* { box-sizing: border-box; }
body {
  background-color: #f0f4f8;
  font-family: system-ui, sans-serif;
  padding: 16px;
}

/* TODO 1: Style .cat-card!
   width: 300px; background-color: #ffffff; padding: 20px;
   border: 2px solid #d6e4f5; border-radius: 22px; margin: 16px auto;
   box-shadow: 0 12px 24px rgba(40,42,54,0.1); */
.cat-card {

}

/* TODO 2: Style .cat-photo (width: 100%; border-radius: 14px; margin-bottom: 12px;) */
.cat-photo {

}

/* TODO 3: Pill .badge (display: inline-block; background: #e3f6e8; color: #216e39; padding: 5px 12px; border-radius: 999px; font-size: 12px; font-weight: bold;) */
.badge {

}

.cat-name { margin: 10px 0 4px; font-size: 22px; }
.cat-role { margin: 0 0 10px; color: #64748b; font-size: 13px; }
.cat-bio  { margin: 0 0 16px; color: #475569; font-size: 14px; line-height: 1.5; }

/* TODO 4: Style .adopt-btn (width: 100%; padding: 12px; background: #e63946; color: #fff; border: none; border-radius: 10px; font-weight: bold;) */
.adopt-btn {

}`,
      solutionCss: `* { box-sizing: border-box; }
body {
  background-color: #f0f4f8;
  font-family: system-ui, sans-serif;
  padding: 16px;
}

.cat-card {
  width: 300px;
  background-color: #ffffff;
  padding: 20px;
  border: 2px solid #d6e4f5;
  border-radius: 22px;
  margin: 16px auto;
  box-shadow: 0 12px 24px rgba(40, 42, 54, 0.1);
}

.cat-photo {
  width: 100%;
  display: block;
  border-radius: 14px;
  margin-bottom: 12px;
}

.badge {
  display: inline-block;
  background-color: #e3f6e8;
  color: #216e39;
  padding: 5px 12px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: bold;
}

.cat-name { margin: 10px 0 4px; font-size: 22px; }
.cat-role { margin: 0 0 10px; color: #64748b; font-size: 13px; }
.cat-bio  { margin: 0 0 16px; color: #475569; font-size: 14px; line-height: 1.5; }

.adopt-btn {
  width: 100%;
  padding: 12px;
  background-color: #e63946;
  color: #ffffff;
  border: none;
  border-radius: 10px;
  font-weight: bold;
  cursor: pointer;
}`
    },

    '5': {
      hasCss: true,
      defaultTab: 'css',
      starterHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <title>WhiskerSquad</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <header class="navbar">
    <div class="logo">🐾 WhiskerSquad</div>
    <ul class="nav-links">
      <li><a href="#">Home</a></li>
      <li><a href="#">Adopt</a></li>
      <li><a href="#">Donate</a></li>
    </ul>
  </header>

  <section class="card-grid">
    <article class="cat-card">
      <img src="assets/mochi.svg" alt="Mochi">
      <h3>Mochi</h3>
      <div class="cat-stats"><span>⚡ 3/10</span><span>💖 10/10</span></div>
    </article>

    <article class="cat-card">
      <img src="assets/barnaby.svg" alt="Barnaby">
      <h3>Barnaby</h3>
      <div class="cat-stats"><span>⚡ 9/10</span><span>💖 10/10</span></div>
    </article>
  </section>
</body>
</html>`,
      solutionHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <title>WhiskerSquad</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <header class="navbar">
    <div class="logo">🐾 WhiskerSquad</div>
    <ul class="nav-links">
      <li><a href="#">Home</a></li>
      <li><a href="#">Adopt</a></li>
      <li><a href="#">Donate</a></li>
    </ul>
  </header>

  <section class="card-grid">
    <article class="cat-card">
      <img src="assets/mochi.svg" alt="Mochi">
      <h3>Mochi</h3>
      <div class="cat-stats"><span>⚡ 3/10</span><span>💖 10/10</span></div>
    </article>

    <article class="cat-card">
      <img src="assets/barnaby.svg" alt="Barnaby">
      <h3>Barnaby</h3>
      <div class="cat-stats"><span>⚡ 9/10</span><span>💖 10/10</span></div>
    </article>
  </section>
</body>
</html>`,
      starterCss: `* { box-sizing: border-box; }
body { margin: 0; font-family: system-ui, sans-serif; background: #fffaf5; }

/* TODO 1: Add display: flex; justify-content: space-between; align-items: center; */
.navbar {
  background: #ffffff;
  padding: 12px 18px;
  border-bottom: 2px solid #f0e4d7;
}
.logo { font-weight: 800; color: #d95d39; }

/* TODO 2: Add display: flex; gap: 16px; list-style: none; margin: 0; padding: 0; */
.nav-links {

}
.nav-links a { text-decoration: none; color: #4a3b37; font-weight: 600; font-size: 14px; }

/* TODO 3: Add display: flex; justify-content: center; gap: 16px; flex-wrap: wrap; */
.card-grid {
  padding: 20px;
}

.cat-card {
  width: 175px; background: #fff; border: 2px solid #f0e4d7;
  border-radius: 16px; padding: 12px;
}
.cat-card img { width: 100%; border-radius: 10px; }
.cat-card h3 { margin: 8px 0; font-size: 16px; }

/* TODO 4: Add display: flex; justify-content: space-between; */
.cat-stats {
  background: #fff4eb; padding: 6px 10px; border-radius: 8px;
  font-size: 12px; font-weight: bold; color: #9c4221;
}`,
      solutionCss: `* { box-sizing: border-box; }
body { margin: 0; font-family: system-ui, sans-serif; background: #fffaf5; }

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #ffffff;
  padding: 12px 18px;
  border-bottom: 2px solid #f0e4d7;
}
.logo { font-weight: 800; color: #d95d39; }

.nav-links {
  display: flex;
  gap: 16px;
  list-style: none;
  margin: 0;
  padding: 0;
}
.nav-links a { text-decoration: none; color: #4a3b37; font-weight: 600; font-size: 14px; }

.card-grid {
  display: flex;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
  padding: 20px;
}

.cat-card {
  width: 175px; background: #fff; border: 2px solid #f0e4d7;
  border-radius: 16px; padding: 12px;
}
.cat-card img { width: 100%; border-radius: 10px; }
.cat-card h3 { margin: 8px 0; font-size: 16px; }

.cat-stats {
  display: flex;
  justify-content: space-between;
  background: #fff4eb; padding: 6px 10px; border-radius: 8px;
  font-size: 12px; font-weight: bold; color: #9c4221;
}`
    },

    '6': {
      hasCss: true,
      defaultTab: 'css',
      starterHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <title>Hover Magic</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="stage">
    <article class="cat-card">
      <div class="photo-frame">
        <img class="cat-photo" src="assets/luna.svg" alt="Luna">
      </div>
      <h3>Luna</h3>
      <p>Hover over my card &amp; click my button!</p>
      <button class="pet-btn">🐟 Give Salmon Treat</button>
    </article>
  </div>
</body>
</html>`,
      solutionHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <title>Hover Magic</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="stage">
    <article class="cat-card">
      <div class="photo-frame">
        <img class="cat-photo" src="assets/luna.svg" alt="Luna">
      </div>
      <h3>Luna</h3>
      <p>Hover over my card &amp; click my button!</p>
      <button class="pet-btn">🐟 Give Salmon Treat</button>
    </article>
  </div>
</body>
</html>`,
      starterCss: `* { box-sizing: border-box; }
body { background: #f8f5ff; font-family: system-ui, sans-serif; padding: 24px; text-align: center; }

/* TODO 1: Add transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease; */
.cat-card {
  width: 260px; margin: 0 auto; background: #fff;
  border: 2px solid #e4dcfa; border-radius: 20px; padding: 18px;
  box-shadow: 0 6px 16px rgba(35,31,46,0.06);
}

/* TODO 2: Create .cat-card:hover { transform: translateY(-8px); border-color: #9b72cf; box-shadow: 0 18px 32px rgba(35,31,46,0.16); } */


.photo-frame { overflow: hidden; border-radius: 12px; }

/* TODO 3: Add transition: transform 0.3s ease; and .cat-card:hover .cat-photo { transform: scale(1.06); } */
.cat-photo { width: 100%; display: block; }


/* TODO 4: Add transition + .pet-btn:hover + .pet-btn:active { transform: scale(0.95); } */
.pet-btn {
  width: 100%; padding: 11px; background: #7b4ec2; color: #fff;
  border: none; border-radius: 10px; font-weight: bold; cursor: pointer;
}`,
      solutionCss: `* { box-sizing: border-box; }
body { background: #f8f5ff; font-family: system-ui, sans-serif; padding: 24px; text-align: center; }

.cat-card {
  width: 260px; margin: 0 auto; background: #fff;
  border: 2px solid #e4dcfa; border-radius: 20px; padding: 18px;
  box-shadow: 0 6px 16px rgba(35,31,46,0.06);
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
}

.cat-card:hover {
  transform: translateY(-8px);
  border-color: #9b72cf;
  box-shadow: 0 18px 32px rgba(35,31,46,0.16);
}

.photo-frame { overflow: hidden; border-radius: 12px; }

.cat-photo {
  width: 100%;
  display: block;
  transition: transform 0.3s ease;
}

.cat-card:hover .cat-photo {
  transform: scale(1.06);
}

.pet-btn {
  width: 100%; padding: 11px; background: #7b4ec2; color: #fff;
  border: none; border-radius: 10px; font-weight: bold; cursor: pointer;
  transition: background-color 0.2s ease, transform 0.15s ease;
}

.pet-btn:hover {
  background-color: #5a3494;
  transform: translateY(-2px);
}

.pet-btn:active {
  transform: scale(0.95);
}`
    },

    '7': {
      hasCss: true,
      requireLinkTag: true,
      defaultTab: 'html',
      starterHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <title>The Purrfect Cup</title>
  <!-- MILESTONE 1A: Add <link rel="stylesheet" href="style.css"> -->

</head>
<body>
  <header class="site-header">
    <a href="#" class="brand">☕ The Purrfect Cup</a>
    <!-- MILESTONE 1B: Add <nav class="main-nav"> with links to #cats and #menu -->

  </header>

  <section class="hero">
    <div class="hero-text">
      <!-- MILESTONE 2A: Add an <h1> headline and a <p> welcome text! -->

      <a href="#cats" class="btn">Meet Our Cats</a>
    </div>
    <img class="hero-img" src="assets/cafe-hero.svg" alt="Cat Cafe">
  </section>

  <section id="cats" class="cats-section">
    <h2>Resident Baristas</h2>
    <div class="cats-grid">
      <article class="cat-card">
        <img src="assets/mochi.svg" alt="Mochi">
        <h3>Mochi</h3>
        <p>Chief Nap Officer</p>
      </article>
      <!-- MILESTONE 3A: Add a 2nd <article class="cat-card"> for Barnaby or Whiskers! -->

    </div>
  </section>

  <section id="menu" class="menu-section">
    <h2>Café Menu</h2>
    <div class="menu-item">
      <span>Caramel Catpuccino</span>
      <strong>$5.20</strong>
    </div>
    <div class="menu-item">
      <span>Salmon Treat Cup (For Cats!)</span>
      <strong>$2.50</strong>
    </div>
  </section>
</body>
</html>`,
      solutionHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <title>The Purrfect Cup</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <header class="site-header">
    <a href="#" class="brand">☕ The Purrfect Cup</a>
    <nav class="main-nav">
      <a href="#cats">Cats</a>
      <a href="#menu">Menu</a>
    </nav>
  </header>

  <section class="hero">
    <div class="hero-text">
      <h1>Sip Coffee with Purring Friends.</h1>
      <p>Warm pastries, specialty lattes, and rescue cats looking for cozy laps.</p>
      <a href="#cats" class="btn">Meet Our Cats</a>
    </div>
    <img class="hero-img" src="assets/cafe-hero.svg" alt="Cat Cafe">
  </section>

  <section id="cats" class="cats-section">
    <h2>Resident Baristas</h2>
    <div class="cats-grid">
      <article class="cat-card">
        <img src="assets/mochi.svg" alt="Mochi">
        <h3>Mochi</h3>
        <p>Chief Nap Officer</p>
      </article>
      <article class="cat-card">
        <img src="assets/barnaby.svg" alt="Barnaby">
        <h3>Barnaby</h3>
        <p>Head of Yarn Chaos</p>
      </article>
    </div>
  </section>

  <section id="menu" class="menu-section">
    <h2>Café Menu</h2>
    <div class="menu-item">
      <span>Caramel Catpuccino</span>
      <strong>$5.20</strong>
    </div>
    <div class="menu-item">
      <span>Salmon Treat Cup (For Cats!)</span>
      <strong>$2.50</strong>
    </div>
  </section>
</body>
</html>`,
      starterCss: `* { box-sizing: border-box; }
body { margin: 0; font-family: system-ui, sans-serif; background: #fffdf9; color: #2d2424; }

/* MILESTONE 1C: Flex navbar (display: flex; justify-content: space-between; align-items: center;) */
.site-header { padding: 12px 18px; background: #fff; border-bottom: 2px solid #f2e6da; }
.brand { font-weight: 800; color: #7f5539; text-decoration: none; }
.main-nav { display: flex; gap: 14px; }
.main-nav a { text-decoration: none; color: #4a3b37; font-weight: 600; font-size: 14px; }

/* MILESTONE 2B: Flex hero (display: flex; align-items: center; gap: 18px; flex-wrap: wrap;) */
.hero { padding: 24px 18px; background: #fff6ec; }
.hero-text { flex: 1 1 180px; }
.hero-text h1 { font-size: 24px; margin: 0 0 8px; }
.hero-img { width: 180px; border-radius: 14px; }
.btn { display: inline-block; padding: 8px 14px; background: #d95d39; color: #fff; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 13px; }

/* MILESTONE 3B: Flex .cats-grid + Box Model & :hover on .cat-card */
.cats-section { padding: 20px 18px; text-align: center; }
.cats-grid { }
.cat-card { width: 165px; padding: 12px; background: #fff; border: 2px solid #f0e4d7; border-radius: 16px; transition: transform 0.2s ease; }
.cat-card img { width: 100%; border-radius: 10px; }

/* MILESTONE 4: Flex .menu-item (display: flex; justify-content: space-between;) */
.menu-section { padding: 20px 18px; background: #faf3eb; }
.menu-item { padding: 10px 0; border-bottom: 1px dashed #dccab8; }`,
      solutionCss: `* { box-sizing: border-box; }
body { margin: 0; font-family: system-ui, sans-serif; background: #fffdf9; color: #2d2424; }

.site-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 18px;
  background: #fff;
  border-bottom: 2px solid #f2e6da;
}
.brand { font-weight: 800; color: #7f5539; text-decoration: none; }
.main-nav { display: flex; gap: 14px; }
.main-nav a { text-decoration: none; color: #4a3b37; font-weight: 600; font-size: 14px; }

.hero {
  display: flex;
  align-items: center;
  gap: 18px;
  flex-wrap: wrap;
  padding: 24px 18px;
  background: #fff6ec;
}
.hero-text { flex: 1 1 180px; }
.hero-text h1 { font-size: 24px; margin: 0 0 8px; }
.hero-img { width: 180px; border-radius: 14px; flex-shrink: 0; }
.btn { display: inline-block; padding: 8px 14px; background: #d95d39; color: #fff; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 13px; transition: transform 0.2s ease; }
.btn:hover { transform: translateY(-2px); background: #b84727; }

.cats-section { padding: 20px 18px; text-align: center; }
.cats-grid {
  display: flex;
  justify-content: center;
  gap: 14px;
  flex-wrap: wrap;
}
.cat-card {
  width: 165px;
  padding: 12px;
  background: #fff;
  border: 2px solid #f0e4d7;
  border-radius: 16px;
  transition: transform 0.22s ease, box-shadow 0.22s ease;
}
.cat-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 22px rgba(45,36,36,0.12);
}
.cat-card img { width: 100%; border-radius: 10px; }
.cat-card h3 { margin: 8px 0 4px; font-size: 16px; }
.cat-card p { margin: 0; font-size: 12.5px; color: #6b5b55; }

.menu-section { padding: 20px 18px; background: #faf3eb; }
.menu-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px dashed #dccab8;
}`
    }
  };

  document.querySelectorAll('.live-sandbox').forEach((container) => {
    const id = container.getAttribute('data-sandbox-id');
    const cfg = SANDBOX_DATA[id];
    if (!cfg) return;

    let currentHtml = cfg.starterHtml;
    let currentCss = cfg.starterCss;
    let activeTab = cfg.defaultTab || 'html';

    container.innerHTML = `
      <div class="sandbox-toolbar">
        <div class="sandbox-tabs">
          <button type="button" class="sandbox-tab ${activeTab === 'html' ? 'active' : ''}" data-tab="html">📄 index.html</button>
          ${cfg.hasCss ? `<button type="button" class="sandbox-tab ${activeTab === 'css' ? 'active' : ''}" data-tab="css">🎨 style.css</button>` : ''}
        </div>
        <div class="sandbox-actions">
          <button type="button" class="sb-btn sb-btn-reset">↺ Reset Starter</button>
          <button type="button" class="sb-btn sb-btn-solve">✨ Load Solution</button>
        </div>
      </div>
      <div class="sandbox-split">
        <div class="sandbox-editor-pane">
          <textarea class="sandbox-textarea" spellcheck="false" aria-label="Code editor"></textarea>
        </div>
        <div class="sandbox-preview-pane">
          <div class="preview-browser-bar">
            <span>
              <span class="browser-dots">
                <i style="background:#ff5f56;"></i>
                <i style="background:#ffbd2e;"></i>
                <i style="background:#27c93f;"></i>
              </span>
              &nbsp;<span class="preview-tab-title">Live Preview</span>
            </span>
            <span class="link-status-slot"></span>
          </div>
          <div class="sandbox-preview-mount"></div>
        </div>
      </div>
    `;

    const textarea = container.querySelector('.sandbox-textarea');
    const tabBtns = container.querySelectorAll('.sandbox-tab');
    const resetBtn = container.querySelector('.sb-btn-reset');
    const solveBtn = container.querySelector('.sb-btn-solve');
    const titleSpan = container.querySelector('.preview-tab-title');
    const linkSlot = container.querySelector('.link-status-slot');
    const mount = container.querySelector('.sandbox-preview-mount');
    const shadow = mount.attachShadow({ mode: 'open' });

    function syncTextarea() {
      textarea.value = activeTab === 'html' ? currentHtml : currentCss;
    }

    function renderPreview() {
      // Extract <title> if present
      const titleMatch = currentHtml.match(/<title>([\s\S]*?)<\/title>/i);
      titleSpan.textContent = titleMatch ? `Tab: ${titleMatch[1].trim()}` : 'Live Preview';

      // Check if <link ... style.css> is required and present
      const hasLinkTag = /<link\b[^>]*href\s*=\s*["']style\.css["'][^>]*>/i.test(currentHtml);
      let applyCss = cfg.hasCss;
      if (cfg.requireLinkTag) {
        applyCss = hasLinkTag;
        linkSlot.innerHTML = hasLinkTag
          ? '<span class="link-status-ok">✓ style.css linked!</span>'
          : '<span class="link-status-warn">⚠️ Add &lt;link&gt; in &lt;head&gt;</span>';
      } else {
        linkSlot.innerHTML = '';
      }

      // Extract body innerHTML or fallback to full string
      const bodyMatch = currentHtml.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
      let bodyHtml = bodyMatch ? bodyMatch[1] : currentHtml;
      // Normalize ../../assets/ -> assets/ so both work seamlessly inside lecture1/index.html
      bodyHtml = bodyHtml.replace(/\.\.\/\.\.\/assets\//g, 'assets/');

      let scopedCss = '';
      if (applyCss && currentCss) {
        scopedCss = currentCss
          .replace(/(^|\}|\s|,)html(?=\s*\{|\s*,)/g, '$1.preview-body')
          .replace(/(^|\}|\s|,)body(?=\s*\{|\s*,)/g, '$1.preview-body');
      }

      shadow.innerHTML = `
        <style>
          .preview-body {
            min-height: 330px;
            padding: 14px;
            font-family: Times, serif;
            color: #000;
            background: #fff;
          }
          ${scopedCss}
        </style>
        <div class="preview-body">${bodyHtml}</div>
      `;
    }

    tabBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        activeTab = btn.getAttribute('data-tab');
        tabBtns.forEach((b) => b.classList.toggle('active', b === btn));
        syncTextarea();
      });
    });

    textarea.addEventListener('input', () => {
      if (activeTab === 'html') currentHtml = textarea.value;
      else currentCss = textarea.value;
      renderPreview();
    });

    // Support 2-space Tab key inside code editor
    textarea.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        e.preventDefault();
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        textarea.value = textarea.value.substring(0, start) + '  ' + textarea.value.substring(end);
        textarea.selectionStart = textarea.selectionEnd = start + 2;
        textarea.dispatchEvent(new Event('input'));
      }
    });

    resetBtn.addEventListener('click', () => {
      currentHtml = cfg.starterHtml;
      currentCss = cfg.starterCss;
      syncTextarea();
      renderPreview();
    });

    solveBtn.addEventListener('click', () => {
      currentHtml = cfg.solutionHtml;
      currentCss = cfg.solutionCss;
      syncTextarea();
      renderPreview();
    });

    syncTextarea();
    renderPreview();
  });
});
