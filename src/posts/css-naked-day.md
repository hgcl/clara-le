---
title: "CSS Naked Day"
subtitle: "A day for websites to go nude"
date: "2025-04-11"
tags: ["digital"]
lang: "en"
---

I discovered the [CSS Naked Day](https://css-naked-day.org/) movement last year, just too late to participate. This year, I was ready for it, this website went nude on **April 9**!

The idea behind this yearly event is to promote web standards. A website should be functional without all the CSS fluff.

To do that, I added a [small JavaScript snippet](https://github.com/hgcl/clara-le/blob/main/_includes/css-naked-day-script.njk) to my base template — and that's it! On April 9, it deactivated the stylesheets, removed the inline styles, and even added a short explanatory message at the top of all pages.

```js
// Get current date
let today = new Date();
let month = today.getMonth();
let day = today.getDate();

// For testing, uncomment the following line:
// month = 3; day = 9;

if (month === 3 && day === 9) {
  // Remove all stylesheets
  const stylesheetEls = document.querySelectorAll(
    'link[rel~="stylesheet"], style'
  );
  for (const el of stylesheetEls) {
    el.parentNode.removeChild(el);
  }

  // Remove all inline styles
  let attrs = document.querySelectorAll("[style]");
  for (const el of attrs) {
    el.removeAttribute("style");
  }

  // Inject an explanation at the top of the document (after the "skip-to-content" element)
  let message = document.createElement("div");
  message.innerHTML = `<p><strong>Why is this page looking so simple?</strong></p><p>It's <a href="https://css-naked-day.github.io">CSS Naked Day</a>! The idea behind this yearly event is to promote web standards — a website should be functional without all the CSS fluff.</p><hr/>`;
  let skipToContentEl = document.getElementById("skip-to-content");
  skipToContentEl.insertAdjacentElement("afterend", message);
}
```

This script was almost entirely based on [Ben Buchanan's example](https://bitbucket.org/snippets/200ok/dKpk) (thank you!) with a few changes for my own use case.

For instance, I chose to inject the short intro message _after_ the "skip to content" element to keep the navigation easy for screen readers. I also went in 100%, without ignoring any bit of CSS. My website is fairly simple, so I don't think this no-exception rule broke anything 🤞

However, going CSS-free also made me realize that the [Media page](/media/) became harder to browse, as the images took too much space. (That sounds like another good reason to finally set specific dimensions on my `<img>` tags).

I noticed things I wanted to improve and others I wanted to delete. All in all, it was eye-opening to see the HTML code — the heart of this website — laid bare for the first time.

See you (naked) on April 9, 2026! --ENDCHAR--
