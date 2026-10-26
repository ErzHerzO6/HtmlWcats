# 🐾 HTML & CSS Beginner Cheat Sheet

Keep this file open whenever you are building a webpage — even professional developers look things up every day!

---

## 1. The Big Picture: HTML vs. CSS

| Language | Role | Cat Analogy |
| :--- | :--- | :--- |
| **HTML** (*HyperText Markup Language*) | **Structure & Content** (headings, text, links, images) | The wooden frame and platforms of a cat tree |
| **CSS** (*Cascading Style Sheets*) | **Visual Style & Layout** (colors, fonts, spacing, columns) | Soft plush carpet, paint colors, and cozy cushions |

---

## 2. Every HTML File Starts Like This

Tip: In VS Code, type `!` in an empty `.html` file and press **Tab** to generate this automatically!

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Browser Tab Title</title>
  <!-- Connect your CSS file here! -->
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <!-- Everything visible on your webpage goes inside <body>! -->
  <h1>Hello World!</h1>
</body>
</html>
```

---

## 3. Anatomy of an HTML Element

```text
  Opening Tag       Attribute (extra info)     Content      Closing Tag
 ┌───────────┐    ┌────────────────────────┐ ┌─────────┐   ┌────┐
 <a               href="https://cats.com"  > Click Me!     </a>
```

> **Note:** A few tags are **void / self-closing** because they don't wrap text — for example `<img>`, `<hr>`, and `<br>`. They have **no** closing tag!

---

## 4. Essential HTML Tags

### Text & Lists
```html
<h1>Main Page Title (use once per page)</h1>
<h2>Section Heading</h2>
<h3>Smaller Card Heading</h3>

<p>A normal paragraph of text with <strong>bold</strong> and <em>italic</em> words.</p>

<ul>                    <!-- Unordered (bullet) list; use <ol> for numbered lists -->
  <li>Salmon treats</li>
  <li>Cardboard boxes</li>
</ul>
```

### Links & Images
```html
<!-- External link (opens in a new tab because of target="_blank") -->
<a href="https://wikipedia.org/wiki/Cat" target="_blank">Read About Cats</a>

<!-- Jump link to <section id="menu"> on the SAME page -->
<a href="#menu">Jump to Menu</a>

<!-- Image: src = path or URL, alt = description if image fails or for screen readers -->
<img src="assets/mochi.svg" alt="Mochi the calico cat" width="250">
```

### Semantic HTML5 Layout Tags ("Labeled Rooms")
Instead of putting `<div>` everywhere, use tags that describe **what** the block is:
- `<header>` — Top banner / navigation bar
- `<nav>` — Group of main navigation links
- `<main>` — Primary content of the page (one per page)
- `<section>` — Thematic chapter/group of content (e.g., About, Menu, Contact)
- `<article>` — Standalone card/item (e.g., a Cat Profile Card or Blog Post)
- `<footer>` — Bottom bar with copyright, address, or hours
- `<div>` / `<span>` — Generic box (`<div>` = block) or inline wrapper (`<span>` = inline text) when no semantic tag fits

---

## 5. CSS Basics & Selectors

### Anatomy of a CSS Rule
```css
selector {
  property: value;   /* <-- Always end each line with a semicolon! */
}
```

### The Big 3 Selectors

| Selector Type | CSS Syntax | HTML Match | When to Use |
| :--- | :--- | :--- | :--- |
| **Element (Tag)** | `p { ... }` | `<p>...</p>` | Style **all** elements of that tag |
| **Class** (`.`) | `.card { ... }` | `<div class="card">` | Reusable style for **one or many** elements *(used 90% of the time!)* |
| **ID** (`#`) | `#hero { ... }` | `<section id="hero">` | One **unique** element on the page (also great for `#jump-links`) |

### Common Text & Color Properties
```css
.example {
  color: #2d2424;                        /* Text color (hex, rgb, or named color) */
  background-color: #fff6ec;             /* Background fill color */
  font-family: system-ui, sans-serif;    /* Font style */
  font-size: 18px;                       /* Text size */
  font-weight: bold;                     /* bold (700) or normal (400) */
  line-height: 1.6;                      /* Vertical breathing room between text lines */
  text-align: center;                    /* left | center | right */
  text-decoration: none;                 /* Removes underline from <a> links */
}
```

---

## 6. The CSS Box Model ("A Cat in a Cardboard Box")

Every single HTML element is a rectangular box made of 4 layers:

```text
┌─────────────────── MARGIN (Space OUTSIDE the box) ───────────────────┐
│  ┌────────────────── BORDER (Cardboard walls) ────────────────────┐  │
│  │  ┌────────────── PADDING (Soft blanket INSIDE) ─────────────┐  │  │
│  │  │                                                          │  │  │
│  │  │                 CONTENT (The Cat! 🐱)                    │  │  │
│  │  │                                                          │  │  │
│  │  └──────────────────────────────────────────────────────────┘  │  │
│  └────────────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────────┘
```

```css
* {
  box-sizing: border-box; /* Always include at the top of style.css! */
}

.cat-card {
  width: 320px;
  padding: 24px;                                   /* All 4 sides inside */
  padding: 12px 24px;                              /* Shorthand: Top/Bottom | Left/Right */
  border: 2px solid #e2d5c8;                       /* Thickness | Style | Color */
  border-radius: 20px;                             /* Rounded corners (999px = pill shape!) */
  margin: 40px auto;                               /* 40px top/bottom, `auto` centers horizontally! */
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);     /* X-offset | Y-offset | Blur | Color */
}
```

---

## 7. Flexbox Cheat Sheet ("Cats on a Windowsill")

Always apply `display: flex;` to the **parent container** holding the items you want to line up!

```css
.parent-container {
  display: flex;                  /* Turns direct children into a horizontal row! */
  justify-content: space-between; /* Horizontal alignment (Main Axis) */
  align-items: center;            /* Vertical alignment (Cross Axis) */
  gap: 24px;                      /* Space BETWEEN items */
  flex-wrap: wrap;                /* Lets items drop to a new row on narrow screens */
}
```

### Quick `justify-content` Values:
- `flex-start` — Pack items on the left (default)
- `center` — Pack items in the middle
- `flex-end` — Pack items on the right
- `space-between` — First item on far left, last item on far right, equal space between *(perfect for navbars & menu prices!)*

---

## 8. Hover Effects & Smooth Transitions

```css
.card {
  /* Put transition on the BASE class so both hover-in AND hover-out are smooth! */
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.card:hover {
  transform: translateY(-6px); /* Lifts the card upward by 6 pixels */
}

.button:active {
  transform: scale(0.97);      /* Slight press-down effect when clicked */
}
```

---

## 9. "Help! My CSS Isn't Showing Up!" (5-Second Checklist)

1. **Did you save both files?** Look for the unsaved dot next to `index.html` and `style.css` (`Ctrl + S`).
2. **Did you refresh the browser?** Press `F5` or `Ctrl + R`.
3. **Is `<link rel="stylesheet" href="style.css">` inside `<head>`?** Check spelling of `href`!
4. **Did you match `.` or `#`?** `class="card"` needs `.card` (with a dot!); `id="hero"` needs `#hero`.
5. **Did you forget a semicolon `;` or curly brace `}` on the line *above*?** One missing `;` breaks the very next line!
