// Adds markdown extra support
// Footnotes: https://www.alpower.com/tutorials/configuring-footnotes-with-eleventy
// Automatic anchor on headings: https://11ty.rocks/eleventyjs/slugs-anchors/

module.exports = function (eleventyConfig) {
  const markdownIt = require("markdown-it");
  const markdownItAnchor = require("markdown-it-anchor");
  const markdownItFootnote = require("markdown-it-footnote");
  const slugify = require("slugify");

  let markdownItOptions = {
    html: true, // Enable HTML tags in source
    breaks: true, // Convert '\n' in paragraphs into <br>
    linkify: true, // Autoconvert URL-like text to links
  };

  let markdownItAnchorOptions = {
    level: 2, // minimum level header (anchors will only be applied to h2 level headers and below)
    slugify: (str) =>
      slugify(str, {
        lower: true,
        strict: true,
        remove: /["]/g,
      }),
  };

  // configure the library with options
  let markdownLib = markdownIt(markdownItOptions)
    .use(markdownItAnchor, markdownItAnchorOptions)
    .use(markdownItFootnote);
  // set the library to process markdown files
  eleventyConfig.setLibrary("md", markdownLib);
};
