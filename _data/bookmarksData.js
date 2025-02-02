const categories = {
  accessibility: {
    title: `Accessibility`,
  },
  misc: {
    title: `Miscellaneous`,
  },
};

// ITEM EXAMPLE:
// {
//   url: `xxx`,
//   title: `website | xxx`,
//   description: `xxx`,
//   category: [categories.accessibility.title],
//   best: false,
// },

const bookmarksData = [
  // >A
  // >B
  {
    url: `https://brainbaking.com/post/2022/04/cool-things-people-do-with-their-blogs/`,
    title: `Brain Baking | Cool things people do with their blogs`,
    description: `In this post, Wouter lists the cool things people did with their personal websites — very inspiring.`,
    category: [categories.misc.title],
    best: false,
  },
  // >C
  // >D
  // >E
  {
    url: `https://www.edx.org/learn/web-accessibility/the-world-wide-web-consortium-w3c-introduction-to-web-accessibility/`,
    title: `edX | W3Cx: Introduction to Web Accessibility`,
    description: `A free course by W3C to gain a strong foundation in digital accessibility.`,
    category: [categories.accessibility.title],
    best: false,
  },
  // >F
  // >G
  // >H
  // >I
  // >J
  // >K
  // >L
  {
    url: `https://www.lalutineduweb.fr/ecriture-inclusive-accessibilite-solutions/`,
    title: `La Lutine du web | Écriture inclusive au point médian et accessibilité : avançons vers des solutions`,
    description: `A great summary how inclusive writing (in the French language) can be a problem for current screen readers.`,
    category: [categories.accessibility.title],
    best: false,
  },
  // >M
  // >N
  // >O
  // >P
  // >Q
  // >R
  // >S
  {
    url: `https://github.com/jackyzha0/sunlit`,
    title: `Sunlit`,
    description: `A pure CSS implementation of some sunlight streaming in through the window.`,
    category: [categories.misc.title],
    best: false,
  },
  // >T
  // >U
  // >V
  // >W
  {
    url: `https://www.w3.org/WAI/ARIA/apg/practices/read-me-first/`,
    title: `W3C | No ARIA is better than Bad ARIA`,
    description: `Why the first rule of ARIA is to avoid using ARIA.`,
    category: [categories.accessibility.title],
    best: false,
  },
  {
    url: `https://www.w3.org/WAI/tips/developing/`,
    title: `W3C | Developing for Web Accessibility `,
    description: `Basic considerations to get started developing web content that is more accessible.`,
    category: [categories.accessibility.title],
    best: false,
  },
  // >X
  // >Y
  // >Z
];

module.exports = bookmarksData;
