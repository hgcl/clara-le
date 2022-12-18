---
template: /templates/blog-posts.html
buildScript: "/scripts/formatPostDetails.js"
title: "My quest for true small caps"
subtitle: "A web design adventure"
dateCreated: "2021-01-07"
---

_Note: this article is based on the previous design of my website._

---

When I launched my website with Next.js, I naturally veered towards a minimal typography-based design. The idea seemed simple to implement, yet elegant. Nothing could go wrong.

My first version looked fine: white on dark gray, big bold headings and a more discreet sans serif body. But I wanted to add some _spice_. This was going to be my personal website, and it needed to have something special. How about changing links to something else? Maybe small caps?

And there began my quest to find true small caps on the web.

## Challenge \#1: Finding typefaces with small caps

It is hard finding an open source typeface that actually supports small caps. This actually made things easier for me, as I was already planning to spend hours trying out different typefaces.

I knew I wanted a simple sans serif typeface to complement the quirky Vesper Libre of my headings. Only one sans serif font was open source with small caps support: Source Sans Pro. My choice was made.

## Challenge \#2: Are those really true small caps?

Mmh... are those true small caps or fake ones? Honestly, I wasn't sure. Red flag: the supposedly small caps did look thinner than the regular letters.

![Before: example of fake small caps](/images/20210107-smallcaps-before.webp)
_Before: fake small caps_

![After: example of true small caps](/images/20210107-smallcaps-after.webp)
_After: true small caps_

What saved me was this (amazing looking) [blog post on small caps](https://www.jkorpela.fi/small-caps.html). I didn't go through everything explained there, but I learned that small caps actually have Unicode characters. I could now have "[actual true small caps](https://en.wikipedia.org/wiki/Small_caps#Unicode)" next to my "maybe true small caps" and see if they differed. They did. _Shoot_.

## Challenge \#3: Setting up true small caps

I dived into the small caps rabbit hole again and realized that small caps—and other special glyphs—were only supported by the OpenType format (OTF). That explained a lot as I was using the WOFF and WOFF2 formats so far.

I was hesitant to switch to an OTF font as the WOFF format is made for the web and loads _much_ faster. I settled on an in-between decision by keeping both of them. My main font would remain in WOFF / WOFF2, while I would load the small caps from the OTF file. I basically treated my main font and small caps as two distinct font families.

For reference, here is the `@font-face` code I used for my small caps characters:

```
@font-face {
  font-family: "SourceSansProSmallCaps";
  src: url("/fonts/SourceSansPro-Regular.otf") format("opentype");
  font-weight: 400;
  font-style: normal;
  font-display: swap; /* Avoids blank space while loading  */
  unicode-range: U+000-2AF; /* Download small caps ranges only */
}
```

Let's dive into the details:

- `font-display: swap` means that the block time is short for an infinite swap period. Your computer might take a tiny moment to load your small caps. This line of code avoids having a blank space where your small caps should be during that time.
- `unicode-range: U+000-2AF` loads the IPA Extensions Unicode range only—that's where the small caps are.

And that's how I managed to set up true small caps on my website.

Anyway.
