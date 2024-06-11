const categories = {
  blog: {
    title: `Blogs`,
    anchor: `blog`,
  },
  cooking: {
    title: `Cooking`,
    anchor: `cooking`,
  },
  dataViz: {
    title: `Data Visualization`,
    anchor: `data-visualization`,
  },
  exploring: {
    title: `Exploring`,
    anchor: `exploring`,
  },
  game: {
    title: `Games`,
    anchor: `game`,
  },
  newsletter: {
    title: `Newsletters`,
    anchor: `newsletter`,
  },
  article: {
    title: `Articles`,
    anchor: `article`,
  },
  reading: {
    title: `Reading`,
    anchor: `reading`,
  },
  technology: {
    title: `Technology`,
    anchor: `technology`,
  },
  thinking: {
    title: `Thinking`,
    anchor: `thinking`,
  },
  travel: {
    title: `Travel`,
    anchor: `travel`,
  },
  typography: {
    title: `Typography`,
    anchor: `typography`,
  },
  ux: {
    title: `UX`,
    anchor: `ux`,
  },
  writing: {
    title: `Writing`,
    anchor: `writing`,
  },
};

const blogrollData = [
  // >A
  {
    url: `https://notes.andymatuschak.org/About_these_notes`,
    title: `Andy Matuschak`,
    description: `Is it still necessary to talk about the digital garden guru?`,
    category: [categories.blog.anchor],
    best: false,
  },
  {
    url: `https://www.autisticasfxxk.com/`,
    title: `Autistic as fxxk`,
    description: `Rachel strong and personal blog about her experience as an autistic person. In her own words: "For autistic punks, rebels and misfits forging their own path in a neurotypical world."`,
    category: [categories.blog.anchor],
    best: false,
  },
  // >B
  {
    url: `https://beautifulwebtype.com/`,
    title: `Beautiful Web Type`,
    description: `A curated collection of open-source typefaces and pairings`,
    category: [categories.typography.anchor],
    best: false,
  },
  {
    url: `https://blogroll.org/`,
    title: `Blogroll`,
    description: `Ray is taking the blogroll concept to the next level.`,
    category: [categories.exploring.anchor],
    best: false,
  },
  {
    url: `https://brainbaking.com/post/2022/04/cool-things-people-do-with-their-blogs/`,
    title: `Brain Baking: Cool things people do with their blogs`,
    description: `In this article, Wouter lists the cool things people did with their personal websites — very inspiring.`,
    category: [categories.article.anchor],
    best: false,
  },
  {
    url: `https://brr.fyi/`,
    title: `Brr`,
    description: `A guy documenting his year working in Antartica.`,
    category: [categories.blog.anchor],
    best: false,
  },
  {
    url: `https://builtformars.com/`,
    title: `Built for Mars`,
    description: `Serious UX case-studies explained with a lot of humor`,
    category: [categories.ux.anchor],
    best: false,
  },
  // >C
  {
    url: `https://cmhb.de/`,
    title: `CMHB`,
    description: `Super cool blog about web design and technology. Bonus points: Carl is into rock-climbing.`,
    category: [categories.blog.anchor],
    best: false,
  },
  {
    url: `https://www.horsepaste.com/`,
    title: `Codenames`,
    description: `I love codenames and have the actual game at home. This online version works great for remote play.`,
    category: [categories.game.anchor],
    best: false,
  },
  {
    url: `https://www.youtube.com/c/CuisineAndChill/`,
    title: `Cuisine And Chill (in French)`,
    description: `My number one cooking channel on Youtube — I have watched all of his videos and ask for more.`,
    category: [categories.cooking.anchor],
    best: true,
  },
  // >D
  {
    url: `https://darkreader.org/`,
    title: `Dark Reader`,
    description: `Browser extension to enable dark mode on websites not supporting dark mode — this saved my eyes so many times`,
    category: [categories.technology.anchor],
    best: true,
  },
  {
    url: `https://www.densediscovery.com/`,
    title: `Dense Discovery`,
    description: `Kai's “curation newsletter” about design, productivity and society — love the personal intros and Worthy Five sections`,
    category: [categories.newsletter.anchor],
    best: false,
  },
  // >E
  {
    url: `https://www.eaudepoisson.com/`,
    title: `Eau de poisson (in French)`,
    description: `Robin and I started Eau de poisson as a travel blog to share with friends and family. We now use it as a way to document some aspects of our personal lives.`,
    category: [categories.travel.anchor],
    best: false,
  },
  {
    url: `https://existentialcomics.com/`,
    title: `Existential comics`,
    description: `A philosophy comic about the inevitable anguish of living a brief life in an absurd world. Also jokes and philosophy 101.`,
    category: [categories.thinking.anchor],
    best: false,
  },
  // >F
  {
    url: `http://feltron.com/`,
    title: `Feltron annual reports`,
    description: `Annual reports by designer Nicholas Felton (from 2005 to 2014), personalized data visualization at its finest`,
    category: [categories.dataViz.anchor],
    best: false,
  },
  {
    url: `https://flamedfury.com/`,
    title: `fLaMEdFURY`,
    description: `fLaMEd has been blogging since 1996 and is here to stay.`,
    category: [categories.blog.anchor],
    best: false,
  },
  {
    url: `https://fontpair.co/`,
    title: `FontPair`,
    description: `Collection of Google fonts pairings`,
    category: [categories.typography.anchor],
    best: false,
  },
  {
    url: `https://fontsinuse.com/`,
    title: `Fonts in Use`,
    description: `A collaborative archive of typefaces used in real life`,
    category: [categories.typography.anchor],
    best: false,
  },
  // >G
  {
    url: `https://garticphone.com/`,
    title: `Gartic Phone`,
    description: `Playing online is not just for gamers. Gartic Phone is the love child of Telephone and Pictionary — super fun and accessible!`,
    category: [categories.game.anchor],
    best: false,
  },
  // >H
  {
    url: `http://www.hemingwayapp.com/`,
    title: `Hemingway Editor`,
    description: `Online editor for simpler, bolder and clearer writing`,
    category: [categories.writing.anchor],
    best: false,
  },
  {
    url: `https://openlibrary.org/books/OL29510342M/How_to_Grow_Your_Own_Poem`,
    title: `How to grow your own poem`,
    description: `In this book, Kate Clanchy is able to break down the barriers that may stop you from writing. "How to grow your own poem" is to be read on paper, as a practical book.`,
    category: [categories.writing.anchor],
    best: false,
  },
  {
    url: `https://dev.w3.org/html5/html-author/charref`,
    title: `HTML Character Reference Chart`,
    description: `Ever wondered how to write a character in HTML? Here is a full list of them that I just can't stop looking at.`,
    category: [categories.technology.anchor],
    best: false,
  },
  {
    url: `https://100r.co/`,
    title: `Hundred Rabbits`,
    description: `When I think about inspiring people, I think about Rekka and Devine, the creators of Hundred Rabbits. They live off the grid on a sailboat, have a plant-based cooking blog, create open-source projects... Do I need to go on?`,
    category: [categories.travel.anchor],
    best: false,
  },
  {
    url: `https://hypothes.is/`,
    title: `Hypothesis`,
    description: `Highlight and annotate articles online — super cool open-source project.`,
    category: [categories.technology.anchor],
    best: false,
  },
  // >I
  {
    url: `https://ifdb.org/`,
    title: `Interactive Fiction Database`,
    description: `The home of all text adventures games!`,
    category: [categories.game.anchor],
    best: false,
  },
  // >J
  {
    url: `https://jillianblogs.com/`,
    title: `Jillian blogs`,
    description: `My good friend Jillian is starting out on the blogosphere! She writes about her life with a great deal of humor.`,
    category: [categories.blog.anchor],
    best: false,
  },
  // >K
  // >L
  {
    url: `https://labnotes.org/`,
    title: `Labnotes`,
    description: `Assan Arkin's weekly newsletter answers to my crave of random browsing without spending too much time on it. It is mostly tech-oriented.`,
    category: [categories.newsletter.anchor],
    best: false,
  },
  {
    url: `https://languagetool.org/`,
    title: `LanguageTool`,
    description: `A multilingual browser extension (and more) for grammar, style and spell checking — and it's open source`,
    category: [categories.writing.anchor],
    best: false,
  },
  {
    url: `https://lawsofux.com/`,
    title: `Laws of UX`,
    description: `Nuggets of UX knowledge beautifully presented`,
    category: [categories.ux.anchor],
    best: true,
  },
  {
    url: `https://www.overdrive.com/apps/libby`,
    title: `Libby App`,
    description: `A library reading — but in my case mostly listening — app. Their interface is great and makes borrowing audiobooks a breeze. Check if they partnered with your local library!`,
    category: [categories.reading.anchor],
    best: false,
  },
  {
    url: `https://solar.lowtechmagazine.com/`,
    title: `Low-tech Magazine`,
    description: `Low-tech Magazine underscores the potential of past and often forgotten technologies and how they can inform sustainable energy practices. The website also walks the talk, as it is solar-powered (which means it sometimes goes offline).`,
    category: [categories.technology.anchor],
    best: false,
  },
  {
    url: `https://lynnandtonic.com/`,
    title: `Lynn Fisher`,
    description: `I love Lynn's random and inspiring CSS projects.`,
    category: [categories.blog.anchor],
    best: false,
  },
  // >M
  {
    url: `https://www.youtube.com/user/Maangchi`,
    title: `Maangchi`,
    description: `If you are into Korean food, you certainly know Maangchi — the Korean mama that you always wished you had.`,
    category: [categories.cooking.anchor],
    best: false,
  },
  {
    url: `https://maggieappleton.com/garden/`,
    title: `Maggie Appleton`,
    description: `Maggie Appleton's illustration-based digital garden`,
    category: [categories.blog.anchor],
    best: false,
  },
  {
    url: `https://mariovillalobos.com/`,
    title: `Mario Villalobos`,
    description: `Mario Villalobos's blog, where he writes notes about his life`,
    category: [categories.blog.anchor],
    best: false,
  },
  {
    url: `https://macwright.com/`,
    title: `Tom MacWright`,
    description: `Tom MacWright's personal blog is minimalism at its finest.`,
    category: [categories.blog.anchor],
    best: false,
  },
  {
    url: `https://mindmeld.url/`,
    title: `Mindmeld`,
    description: `Wavelength is a social party game that fosters conversations. Mindmeld is its free online spin-off.`,
    category: [categories.game.anchor],
    best: false,
  },
  {
    url: `https://modernfontstacks.com/`,
    title: `Modern font stacks`,
    description: `System font stack CSS organized by typeface classification for every modern OS. What a lifesaver.`,
    category: [categories.typography.anchor],
    best: true,
  },
  {
    url: `https://blog.mollywhite.net/`,
    title: `Molly White`,
    description: `Molly is a software engineer by trade and writes opinionated pieces about online harassment, Web3 and more.`,
    category: [categories.blog.anchor],
    best: false,
  },
  {
    url: `https://www.youtube.com/c/mynameisandong/`,
    title: `My Name Is Andong`,
    description: `One of my favorite cooking channels on Youtube — informative, funny and dynamic`,
    category: [categories.cooking.anchor],
    best: false,
  },
  // >N
  {
    url: `https://www.nngroup.com/`,
    title: `Nielsen Norman Group`,
    description: `The number one reference for everything UX and accessibility-related`,
    category: [categories.ux.anchor],
    best: false,
  },
  {
    url: `https://neocities.org/browse`,
    title: `Neocities`,
    description: `I just love the Neocities community. They were able to foster a culture where creating a website is fun, unique and possible for non-devs as well.`,
    category: [categories.exploring.anchor],
    best: false,
  },
  // >O
  {
    url: `https://omglord.com/`,
    title: `OMGLORD`,
    description: `Designer Gabby Lord shares amazing resources on her website and through her newsletter.`,
    category: [categories.blog.anchor],
    best: false,
  },
  // >P
  {
    url: `https://practicaltypography.com/`,
    title: `Practical Typography`,
    description: `It's not really a website, it's not really a book. One thing is certain: it is a treasure chest of typographic knowledge.`,
    category: [categories.typography.anchor],
    best: false,
  },
  {
    url: `https://pudding.cool/`,
    title: `The Pudding`,
    description:
      "In their own words, The Pudding `is a digital publication that explains ideas debated in culture with visual essays.`",
    category: [categories.dataViz.anchor],
    best: false,
  },
  // >Q
  // >R
  {
    url: `https://robinmetral.com/`,
    title: `Robin Métral`,
    description: `Robin is my partner in life. He gets passionate about a lot of things, so be prepared to dive into diverse rabbit holes.`,
    category: [categories.blog.anchor],
    best: true,
  },
  {
    url: `https://robweychert.com/`,
    title: `Robwey Chert`,
    description: `Robwey Chert is a designer and artist that has been blogging since 2002.`,
    category: [categories.blog.anchor],
    best: false,
  },
  // >S
  {
    url: `https://sebastiangreger.net`,
    title: `Sebastian Greger`,
    description: `When the IndieWeb meets great design.`,
    category: [categories.blog.anchor],
    best: false,
  },
  {
    url: `https://searchmysite.net/`,
    title: `Search my site`,
    description: `Search real content by real people from the indieweb / the small web / digital gardens.`,
    category: [categories.exploring.anchor],
    best: false,
  },
  {
    url: `https://www.seat61.com/`,
    title: `Seat 61`,
    description: `Seat 61 is Mark's passion project about train travel. He has been keeping a massive amount of useful up-to-date information by himself for DECADES. A real gem on the internet.`,
    category: [categories.travel.anchor],
    best: true,
  },
  {
    url: `https://skullsinthestars.com/`,
    title: `Skulls in the stars`,
    description: `The intersection of physics, optics, history and pulp fiction`,
    category: [categories.blog.anchor],
    best: false,
  },
  // >T
  {
    url: `https://www.theydrawandtravel.com/`,
    title: `They draw and travel`,
    description: `Collection of illustrated travel map created by artists from around the world`,
    category: [categories.travel.anchor],
    best: false,
  },
  {
    url: `https://tracydurnell.com/`,
    title: `Tracy Durnell`,
    description: `Tracy's personal website and digital garden`,
    category: [categories.blog.anchor],
    best: false,
  },
  {
    url: `https://type-scale.com/`,
    title: `Type scale`,
    description: `My go-to tool whenever I need to create a new website. It just makes font size choices so much more straightforward.`,
    category: [categories.typography.anchor],
    best: true,
  },
  // >U
  // >V
  // >W
  {
    url: `https://waitbutwhy.com/`,
    title: `Wait But Why`,
    description: `Tim Urban is one of the most thoughtful thinkers on the internet. He brings complex and fascinating topics within everyone's reach through (very) long form blog posts.`,
    category: [categories.thinking.anchor],
    best: true,
  },
  {
    url: `https://web.archive.org/`,
    title: `Wayback Machine`,
    description: `I just love how this enables people to experience how the web felt decades ago.`,
    category: [categories.technology.anchor],
    best: false,
  },
  {
    url: `https://webcurios.co.uk/`,
    title: `Web Curios`,
    description: `A weekly blognewslettertypething of weird, interesting, scandalous links — all wrapped in sarcasm.`,
    category: [categories.newsletter.anchor],
    best: false,
  },
  {
    url: `https://winnielim.org/`,
    title: `Winnie Lim`,
    description: `Winnie Lim's beautifully written blog, where she documents her life.`,
    category: [categories.blog.anchor],
    best: false,
  },
  {
    url: `https://en.wikipedia.org/wiki/Wikipedia:Contents`,
    title: `Wikipedia`,
    description: `I love Wikipedia. I love that it is collaborative and that people need to discuss to find common ground on a topic (especially the controversial ones). Here, I linked the starting hub to navigate Wikipedia differently.`,
    category: [categories.thinking.anchor],
    best: true,
  },
  // >X
  {
    url: `https://xkcd.com/`,
    title: `xkcd`,
    description: `Just a guy drawing comics with stick-people. I love how this website stayed simple despite becoming quite famous.`,
    category: [categories.reading.anchor],
    best: false,
  },
  // >Y
  // >Z
];

module.exports = blogrollData;
