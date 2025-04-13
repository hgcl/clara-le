---
title: "Creating beautiful ebooks: from webpage to ePub"
subtitle: "Generating a clean ePub with Percollate and Calibre"
date: "2026-01-01"
tags: ["digital"]
lang: "en"
draft: true
---

Sources:

- example to use: https://saigoneer.com/saigon-culture/18178-on-the-cusp-of-a-modern-new-year,-reflections-on-a-simpler-tet-past
- https://manual.calibre-ebook.com/faq.html#what-formats-does-calibre-support-conversion-to-from
- Clean base html
  - https://htmlmarkdown.com/
  - https://markdowntohtml.com/
- https://standardebooks.org/contribute/producing-an-ebook-step-by-step
- https://www.npmjs.com/package/percollate
- split: https://manual.calibre-ebook.com/conversion.html#structure-detection

---

Intro:

- goal: from HTML to ebook, clean conversion, keep a nice layout, pay attention to typography.
- searching aroung the internet, Percollate sounded like a simple and good option, creating an ePub file (with images!) from a URL
- Only issue with Percollate: the raw result left quite some bits of "dirty HTML" around
- Let's see how to produce a super clean ePub, using Percollate and Calibre
- prerequisites: Unix environment, Percollate, Calibre, some manual work on the code involved

## Percollate

- https://www.npmjs.com/package/percollate
- Run it: `npx percollate epub https://waitbutwhy.com/2014/05/fermi-paradox.html -o "Wait But Why - The Fermi Paradox.epub"`
  - Fetches the page and strips unnecessary elements with `mozilla/readability`, keeps the hyperlinks
  - Generates an ePub with basic CSS
  - Adds the author name and source URL to the top of the file

<!-- ŦODO can we create one ePub from multiple URLs? -->

<aside>

Note: I only use Percollate as it fetches all the post images for me. If the webpage you want to save doesn't have any images, you could manually copy your webpage HTML (with the browser Inspect tool), and go straight to the "Clean up the HTML" step.

</aside>

Limited by readability that retains quite a bit of useless HTML attributes or tags. If you don't mind a slightly dirty ePub, you could stop here. I am maniac enough to need to clean it up properly. My solution? HTML > Markdown > HTML

## Clean up the HTML

Open in Calibre, select everything that is under the `<body>` HTML wrapper.

- HTML to Markdown:
  - e.g. https://htmlmarkdown.com/
  - Clean up file
- Markdown to HTML
  - e.g. https://htmlmarkdown.com/markdown-to-html/
  - Copy the final HTML and paste it back into Calibre, under the initial `<body>` wrapper

This way, we don't lose the image links, while removing most (or all?) useless attributes or unnecessary HTML wrappers.

## Calibre edits

<aside>

Throughout the Calibre edit process, you can save your work in `Edit > Create checkpoint`. If something breaks, you'll be able to restore your ebook to the checkpoints you created.

</aside>

- Separate title page from rest of the text with the `Split` feature
  - for instance, right after the automatic source paragraph added by Percollate
- Quick manual check:
  - `Tools > Beautify all files` first to make the file code more scannable (you can run this tool throughout the process, when you need the file to be more readable)
  - Quickly scan through the files to remove the big no-nos
- `Search > Find/replace` recurring patterns you have noticed. For instance, make sure that:
  - the book title is an `<h1>` heading tag
  - chapter titles use the `<h2>` heading tags
  - subheadings are numbered accordingly (`<h3>` under `<h2>`, `<h4>` under `<h3>`, etc.)
- Rename files by right-clicking on them in the left sidebar, make sure to keep the part before the automatic "OEBPS/" prefix to avoid breaking links.
- `Tools > Smartening punctuation`: works better with English, other languages beware
- `Tools > Beautify all files` a final time to make it pretty
- Add more manual splits if needed (I usually add them before all `<h2>`)

CSS:

- Replace the CSS stylesheet

Minify:

- `Tools > Remove unused CSS rules`
- `Tools > Compress images losslessly`

## Metadata

- Edit metadata
- Add a cover
