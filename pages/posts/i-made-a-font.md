---
template: /templates/blog-posts.html
buildScript: "/scripts/formatPostDetails.js"
title: "I made a font"
subtitle: "Or how I created a simple font as a complete typography-noob"
dateCreated: "2023-01-10"
---

<p class="sr-only">There is some dummy text here to illustrate the font used in English, Vietnamese and French.</p>
<div style='font-family: EauDePoisson' aria-hidden="true">
<h2 style='font-family: EauDePoisson'>Sample of the <cite>Eau de poisson</cite> font</h2>
<ol>
<li>Them replenish. Doesn't dominion. Have above under seed male. Made you'll. In fifth fourth second saying of waters, tree heaven whose thing seasons let firmament from you'll great said our moved may very rule they're so whose together one.
</li>
<li>Canh chua cá lóc là món ăn từ lâu đã quen thuộc với người dân Việt Nam đặc biệt là ở vùng miền tây Nam Bộ, buổi trưa hè nắng nóng mà được ăn tô canh chua cá lóc, kèm với món cá lóc kho tộ thì mọi cảm giác mệt mỏi sẽ bay biến mất.</li>
<li>Hâtons-nous d'ajouter, en cherchant quoi ? Proprement vêtu de son accoutrement et sa barbe noire, parut. Assez loin, et il lui allongea une claque formidable sur les reins et les coeurs n'aiment pas à faire partir son fils, vous passer de moi...</li>
</ol>
</div>

## A bit of context

A year ago, I bought a [Fontself](https://www.fontself.com/) license with my company learning budget. Since then, I remember starting a project or two, but never completing them. Fast-forward to January 2023, I finally find a reason to have a typography pet project.

Robin and I wanted to bring our shared blog [Eau de poisson](https://eaudepoisson.com) back to life. In our usual knowing-how-to-prioritize fashion, we decided to first reformat and redesign the entire website. And for that, we needed a new font. A font that was casual and laid back, but that would also support Latin-extended characters—mostly French, Vietnamese and other major Latin languages.

The existing [Gaegu](https://fonts.google.com/specimen/Gaegu) typeface would have been perfect. However, it was mostly created for Korean and didn't support Latin-Extended characters. So, I decided to create my own typeface, shamelessly taking inspiration from Gaegu, but making sure to include all the characters I needed. For a first font creation, I'll give myself some leeway and say it's okay.

## The creative process

I don't really know if professionals could use Fontself. I somehow doubt it. Yet, for non-precise amateur work, it made the entire process super easy!

### 1. Draw your glyphs

You first need to install the Fontself plugin in Illustrator or Photoshop (I have the Illustrator plugin). From there, you can use Fontself's character grid template, or you can also create your own.

![Character grid template on Illustrator](/images/20230110-fontself-template.webp)

You then get into the heart of the process, either hand drawing your glyphs or using the pen tool for pixel perfect work. I drew mine with my graphic tablet, making sure to follow the guides.[^1]
[^1]: Pay extra attention to the top (ascender) and bottom (descender) guides, not going beyond them, as it might ruin the final font line-height.

![Horizontal font creation guides, from top to bottom: ascender, capital height, x height, baseline, and descender](/images/20230110-fontself-guides.webp)

### 2. Optimize your work

Once you completed your character set, make sure to duplicate it to optimize it.

1. Transform all strokes into shapes. (`Object > Expand appearance`)
2. Merge all parts of one character into one group. (`Pathfinder > Unite`)
3. For a better performance, I also simplified all the shapes, while preserving enough details. (`Right-click > Simplify...`)

### 3. Upload your characters on Fontself

You can then upload all your characters into the plugin. You will get an overview like this.

![Overview of all characters in the Fontself plugin](/images/20230110-fontself-overview.webp)

In this first screen, you check that your characters are all on the same baseline, and that the ascender and descender are correctly positioned. You make these edits by dragging the characters and guides directly.

### 4. Save hours of work with one click

We now get to the cool part:

![Fontself automatic smart spacing tool](/images/20230110-fontself-smart-spacing.webp)

In only one click, Fontself will go through your entire character set and do the base spacing / kerning work automatically. The letters g, j, or i usually have a smaller left-margin? The plugin will calculate and preset that margin for you. Of course, the result is by far not perfect, but it does save you a lot of time!

Once Fontself has done most of your work,... you still have a lot to do. Here comes the manual spacing and kerning part of the process.

### 5. Spacing and kerning, the manual way

> What is the difference between spacing and kerning?
>
> When we talk about a font's spacing, we are referring to the generic amount of space between the characters. This sets the font rhythm. We refer to kerning to talk about the adjustment of space between two specific characters.

Fontself gives you control glyphs that define the rhythm of your font. Traditionally, we use `nnnnn` and `ooooo` for lowercase, `HHHHH` and `OOOOO` for uppercase. As you scroll down, you compare the usual `ooooo` rhythm with an extra glyph in the middle. You can then adjust the spacing around these glyphs to fit the rhythm you settled for.

Make sure you spend most of your time on the spacing before getting to kerning. The process should then be fairly similar. The only difference being that you adjust a space between two specific glyphs only.

![Manual spacing in Fontself](/images/20230110-fontself-spacing.webp)

![Manual kerning in Fontself](/images/20230110-fontself-kerning.webp)

---

And that's it! It took me a day and a half to finish, even though I made the simplest font I could think of. I am really happy with the result, even though it doesn't produce the most legible body text—but who cares, I only use it for headings.

Anyway.
