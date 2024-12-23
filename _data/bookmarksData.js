const categories = {
  accessibility: {
    title: `Accessibility`,
  },
  misc: {
    title: `Miscellaneous`,
  },
};

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
  // >T
  // >U
  // >V
  // >W
  // >X
  // >Y
  // >Z
];

module.exports = bookmarksData;
