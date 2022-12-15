export const categories = {
  berlin: {
    title: "Berlin",
    anchor: "berlin",
  },
  blog: {
    title: "Blog",
    anchor: "blog",
  },
  cooking: {
    title: "Cooking",
    anchor: "cooking",
  },
  dataViz: {
    title: "Data Visualization",
    anchor: "data-visualization",
  },
  digitalGarden: {
    title: "Digital Garden",
    anchor: "digital-garden",
  },
  game: {
    title: "Game",
    anchor: "game",
  },
  map: {
    title: "Map",
    anchor: "map",
  },
  newsletter: {
    title: "Newsletter",
    anchor: "newsletter",
  },
  tech: {
    title: "Tech",
    anchor: "tech",
  },
  thinking: {
    title: "Thinking",
    anchor: "thinking",
  },
  travel: {
    title: "Travel",
    anchor: "travel",
  },
  typography: {
    title: "Typography",
    anchor: "typography",
  },
  writing: {
    title: "Writing",
    anchor: "writing",
  },
};

export const blogrollData = [
  // >A
  {
    url: "https://notes.andymatuschak.org/About_these_notes",
    title: "Andy Matuschak",
    description: "Is it still necessary to talk about the digital garden guru?",
    category: [categories.digitalGarden.anchor],
    best: false,
  },
  // >B
  {
    url: "https://beautifulwebtype.com/",
    title: "Beautiful Web Type",
    description: "A curated collection of open-source typefaces and pairings",
    category: [categories.typography.anchor],
    best: false,
  },
  {
    url: "https://berlinfoodstories.com/",
    title: "Berlin Food Stories",
    description:
      "Per shares amazing food and restaurants recommendations in Berlin.",
    category: [categories.berlin.anchor],
    best: false,
  },
  {
    url: "https://builtformars.com/",
    title: "Built for Mars",
    description: "Serious UX case-studies explained with a lot of humor",
    category: [categories.tech.anchor],
    best: false,
  },
  // >C
  {
    url: "https://cmhb.de/",
    title: "CMHB",
    description:
      "Super cool blog about web design and technology. Bonus points: Carl is into rock-climbing.",
    category: [categories.blog.anchor],
    best: false,
  },
  {
    url: "https://www.horsepaste.com/",
    title: "Codenames",
    description:
      "I love codenames and have the actual game at home. This online version works great for remote play.",
    category: [categories.game.anchor],
    best: false,
  },
  {
    url: "https://www.youtube.com/c/CuisineAndChill/",
    title: "Cuisine And Chill (in French)",
    description:
      "My number one cooking channel on Youtube—I have watched all of his videos and ask for more.",
    category: [categories.cooking.anchor],
    best: true,
  },
  // >D
  {
    url: "https://darkreader.org/",
    title: "Dark Reader",
    description:
      "Browser extension to enable dark mode on websites not supporting dark mode—this saved my eyes so many times",
    category: [categories.tech.anchor],
    best: true,
  },
  {
    url: "https://www.densediscovery.com/",
    title: "Dense Discovery",
    description:
      "Kai's “curation newsletter” about design, productivity and society—love the personal intros and Worthy Five sections",
    category: [categories.newsletter.anchor],
    best: false,
  },
  // >E
  {
    url: "https://www.eaudepoisson.com/",
    title: "eau de poisson (in French)",
    description: "Yep, sometimes Robin and I travel blog when we feel like it.",
    category: [categories.travel.anchor],
    best: false,
  },
  // >F
  {
    url: "http://feltron.com/",
    title: "Feltron annual reports",
    description:
      "Annual reports by designer Nicholas Felton (from 2005 to 2014), personalized data visualization at its finest",
    category: [categories.dataViz.anchor],
    best: false,
  },
  {
    url: "https://fontpair.co/",
    title: "FontPair",
    description: "Collection of Google fonts pairings",
    category: [categories.typography.anchor],
    best: false,
  },
  {
    url: "https://fontsinuse.com/",
    title: "Fonts in Use",
    description: "A collaborative archive of typefaces used in real life",
    category: [categories.typography.anchor],
    best: false,
  },
  // >G
  {
    url: "https://garticphone.com/",
    title: "Gartic Phone",
    description:
      "Playing online is not just for gamers. Gartic Phone is the love child of Telephone and Pictionary—super fun and accessible!",
    category: [categories.game.anchor],
    best: false,
  },
  // >H
  {
    url: "http://www.hemingwayapp.com/",
    title: "Hemingway Editor",
    description: "Online editor for simpler, bolder and clearer writing",
    category: [categories.writing.anchor],
    best: false,
  },
  {
    url: "https://dev.w3.org/html5/html-author/charref",
    title: "HTML Character Reference Chart",
    description:
      "Ever wondered how to write a character in HTML? Here is a full list of them that I just can't stop looking at.",
    category: [categories.tech.anchor],
    best: false,
  },
  {
    url: "https://100r.co/",
    title: "Hundred Rabbits",
    description:
      "When I think about inspiring people, I think about Rekka and Devine, the creators of Hundred Rabbits. They live off the grid on a sailboat, have a plant-based cooking blog, create open-source projects... Do I need to go on?",
    category: [categories.travel.anchor, categories.blog.anchor],
    best: false,
  },
  {
    url: "https://hypothes.is/",
    title: "Hypothesis",
    description:
      "Highlight and annotate articles online—super cool open-source project.",
    category: [categories.tech.anchor],
    best: true,
  },
  // >I
  {
    url: "https://ifdb.org/",
    title: "Interactive Fiction Database",
    description: "The home of all text adventures games!",
    category: [categories.game.anchor],
    best: false,
  },
  // >J
  // >K
  // >L
  {
    url: "https://languagetool.org/",
    title: "LanguageTool",
    description:
      "A multilingual browser extension (and more) for grammar, style and spell checking—and it's open source",
    category: [categories.writing.anchor, categories.tech.anchor],
    best: false,
  },
  {
    url: "https://www.overdrive.com/apps/libby",
    title: "Libby App",
    description:
      "A library reading—but in my case mostly listening—app. Their interface is great and makes borrowing audiobooks a breeze. Check if they partnered with your local library!",
    category: [categories.tech.anchor],
    best: false,
  },
  // >M
  {
    url: "https://www.youtube.com/user/Maangchi",
    title: "Maangchi",
    description:
      "If you are into Korean food, you certainly know Maangchi—the Korean mama that you always wished you had.",
    category: [categories.cooking.anchor],
    best: false,
  },
  {
    url: "https://maggieappleton.com/garden/",
    title: "Maggie Appleton",
    description: "Maggie Appleton's illustration-based digital garden",
    category: [categories.digitalGarden.anchor],
    best: false,
  },
  {
    url: "https://macwright.com/",
    title: "Tom MacWright",
    description: "Tom MacWright's personal blog is minimalism at its finest.",
    category: [categories.blog.anchor],
    best: false,
  },
  {
    url: "https://mindmeld.url/",
    title: "Mindmeld",
    description:
      "Wavelength is a social party game that fosters conversations. Mindmeld is its free online spin-off.",
    category: [categories.game.anchor],
    best: false,
  },
  {
    url: "https://blog.mollywhite.net/",
    title: "Molly White",
    description:
      "Molly is a software engineer by trade and writes opinionated pieces about online harassment, Web3 and more.",
    category: [categories.blog.anchor],
    best: false,
  },
  {
    url: "https://www.youtube.com/c/mynameisandong/",
    title: "My Name Is Andong",
    description:
      "One of my favorite cooking channels on Youtube—informative, funny and dynamic",
    category: [categories.cooking.anchor],
    best: false,
  },
  // >N
  {
    url: "https://www.nngroup.com/",
    title: "Nielsen Norman Group",
    description:
      "The number one reference for everything UX and accessibility-related",
    category: [categories.tech.anchor],
    best: false,
  },
  // >O
  {
    url: "https://omglord.com/",
    title: "OMGLORD",
    description:
      "Designer Gabby Lord shares amazing resources on her website and through her newsletter.",
    category: [categories.blog.anchor],
    best: false,
  },
  // >P
  {
    url: "https://practicaltypography.com/",
    title: "Practical Typography",
    description:
      "It's not really a website, it's not really a book. One thing is certain: it is a treasure chest of typographic knowledge.",
    category: [categories.typography.anchor],
    best: false,
  },
  {
    url: "https://pudding.cool/",
    title: "The Pudding",
    description:
      'In their own words, The Pudding "is a digital publication that explains ideas debated in culture with visual essays."',
    category: [categories.dataViz.anchor],
    best: false,
  },
  // >Q
  // >R
  // >S
  {
    url: "https://sebastiangreger.net",
    title: "Sebastian Greger",
    description: "When the IndieWeb meets great design.",
    category: [categories.tech.anchor],
    best: false,
  },
  // >T
  {
    url: "https://www.theydrawandtravel.com/",
    title: "They draw and travel",
    description:
      "Collection of illustrated travel map created by artists from around the world",
    category: [categories.map.anchor],
    best: false,
  },
  {
    url: "https://type-scale.com/",
    title: "Type scale",
    description:
      "My go-to tool whenever I need to create a new website. It just makes font size choices so much more straightforward.",
    category: [categories.tech.anchor],
    best: false,
  },
  // >U
  // >V
  // >W
  {
    url: "https://waitbutwhy.com/",
    title: "Wait But Why",
    description:
      "Tim Urban is one of the most thoughtful thinkers on the internet. He brings complex and fascinating topics within everyone's reach through (very) long form blog posts.",
    category: [categories.thinking.anchor],
    best: true,
  },
  // >X
  // >Y
  // >Z
];
