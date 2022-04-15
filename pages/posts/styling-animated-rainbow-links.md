---
template: /templates/blog-posts.html
buildScript: "/scripts/formatPostDate.js"
title: "Styling animated rainbow links"
subtitle: "With CSS only"
dateCreated: "2022-04-15"
---

This new website layout is quite minimalist and mostly plays on typography styles and hierarchy. But I wanted to add some _spice_ and what better way than doing it rainbow-style on hyperlinks?[^1]

The general idea is that my hyperlinks are the same color as the body text and are underlined by default. When hovered of focused, they are animated with CSS keyframes that seamlessly transition through a list of colors. To differentiate between the `focus` and `hover` states, I removed the underline on `focus` and added an outline instead.

As you noticed, I am definitely not a web dev blogger, so I'll just drop my CSS below.

```
a {
  color: white;
  text-underline-position: under;
}

a:hover {
  animation: color-change 5s infinite;
}

a:focus {
  animation: color-change 5s infinite;
  text-decoration: none;
  outline-offset: 0.1em;
  outline: 0.1em solid;
}

@keyframes color-change {
  5% {
    color: hsl(0, 100%, 30%);
  }
  15% {
    color: hsl(41, 100%, 33%);
  }
  30% {
    color: hsl(140, 100%, 27%);
  }
  50% {
    color: hsl(230, 100%, 50%);
  }
  70% {
    color: hsl(261, 100%, 55%);
  }
  90% {
    color: hsl(320, 100%, 31%);
  }
}
```

[^1]: Please don't answer to that, this is a rhetorical question.
