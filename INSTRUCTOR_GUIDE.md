# 🎓 Instructor Guide — Lecture 1: Frontend with HTML & CSS (Cat Edition!)

This guide gives you a relaxed, beginner-tested roadmap for teaching this ~2 to 2.5-hour crash course. Everything is designed for someone with **zero prior coding experience**.

---

## 🚀 Before You Start (2-Minute Setup)

1. Open `lecture1/index.html` in a browser (Chrome/Edge/Firefox). This is your **Interactive Lecture Hub** — you can present directly from it, play with the live cat visualizers together, and launch task previews in one click!
2. Open the `lecture1` folder in **VS Code** (or your preferred editor) for your learner:
   - Optional Pro-Tip: Install the **Live Server** extension in VS Code so saving (`Ctrl + S`) refreshes the browser automatically — OR keep it classic with manual `Ctrl + S` + Browser Refresh (`F5`), which helps beginners build muscle memory of *"edit file -> save -> browser reads file"*.
3. Have `CHEAT_SHEET.md` ready so your learner knows they **never have to memorize syntax**! Reassure them early: *"Coding is NOT memorizing tags — even senior engineers check cheat sheets and DevTools constantly."*

---

## ⏱️ Suggested Pacing (~2 Hours 15 Minutes)

| Time | Module | Key Analogy / "Aha!" Moment | Hands-On Task |
| :--- | :--- | :--- | :--- |
| **0:00 – 0:10** | **0. Welcome & Magic Trick** | Right-click any famous website -> **Inspect** -> change a headline to `"Cats Rule Everything"`! Shows websites aren't magic — they're just text files. | *Live DevTools icebreaker* |
| **0:10 – 0:25** | **1. HTML Skeleton & Tags** | HTML = wooden frame of a cat tree. Opening & closing tags are like sandwich bread (`<p>filling</p>`), except `<img>` which has no filling. | `tasks/task-01-html-skeleton` (*Meet Mochi!*) |
| **0:25 – 0:40** | **2. Semantic HTML5** | Labeled moving boxes (`<header>`, `<nav>`, `<main>`, `<footer>`) vs. 50 unlabeled cardboard boxes (`<div>` soup). Demo clicking `#residents` to jump down! | `tasks/task-02-semantic-html` (*Sunny Paws Shelter*) |
| **0:40 – 1:00** | **3. Hello CSS! Colors & Selectors** | Tag (`p` = all cats), Class (`.highlight` = VIP collar any cat can wear), ID (`#banner` = one unique microchip). | `tasks/task-03-css-colors-fonts` (*The Daily Meow*) |
| **1:00 – 1:10** | ☕ *Short Coffee / Stretch Break!* | Let things sink in! | — |
| **1:10 – 1:30** | **4. The CSS Box Model** | **A Cat in a Cardboard Box!** Content = Cat, `padding` = soft blanket *inside* walls, `border` = cardboard walls, `margin` = personal space *outside* so cats don't hiss! *(Use the live Box Model slider in `index.html`!)* | `tasks/task-04-box-model-card` (*Sir Whiskers' VIP Card*) |
| **1:30 – 1:50** | **5. Flexbox Layouts** | Lining cats up on a sunny windowsill. Emphasize the #1 rule: **`display: flex` always goes on the PARENT container!** *(Use the live Flexbox Windowsill playground in `index.html`!)* | `tasks/task-05-flexbox-layout` (*WhiskerSquad*) |
| **1:50 – 2:05** | **6. Hover Magic & Transitions** | Without `transition`, hovering teleports the cat instantly. With `transition: 0.25s ease` on the base class, the card floats like magic. | `tasks/task-06-hover-magic` (*Petting Simulator*) |
| **2:05 – 2:35** | **7. Capstone: Cat Café Website** | Put all the LEGO bricks together to build **The Purrfect Cup Cat Café**! Walk through Milestones 1–5 together, then let them customize colors/names! | `tasks/task-07-final-cat-cafe` (*The Purrfect Cup*) |

---

## 💡 Teaching Tips That Make Beginners Feel Confident

1. **Do the F12 "Inspect Element" Icebreaker in Minute 1!**
   Before showing a single slide of syntax, open Wikipedia or a news website, right-click the biggest headline, click **Inspect**, double-click the text inside `<h1>`, and type `"Breaking: Barnaby Demands Second Breakfast"`. Beginners immediately laugh and realize: *"Wait... every website on Earth is literally made of `<h1>`, `<p>`, and `<div>`?!"*
2. **Normalize Typos Immediately**
   Tell them upfront: 80% of frontend bugs are:
   - Forgetting to press `Ctrl + S`
   - Missing a semicolon `;` at the end of a CSS line
   - Writing `card { ... }` instead of `.card { ... }` (forgetting the dot for classes!)
   When one of these happens during a task, celebrate it: *"Awesome, you just hit the classic Rite of Passage bug!"*
3. **Never Touch Their Keyboard**
   Even if you spot a typo right away, point with words (*"Check line 18 — how does the line above it end?"*) rather than typing for them. Typing the fix themselves builds 10x more confidence!
4. **Show the Target Solution First Before Starting Tasks 4–7**
   In `index.html`, click **"Preview Target Solution"** for 10 seconds before they open the starter file so they have a clear visual goal of *what* they're building, then close it and let them code in `tasks/task-0X-.../`.
5. **End on Creative Ownership (Task 7 Bonus)**
   Once they finish Milestone 5 of **The Purrfect Cup**, give them 5 minutes to make it *theirs*: rename the café after their own pet/inside joke, change `#d95d39` to their favorite accent color, or add a hilarious item to the café menu!
