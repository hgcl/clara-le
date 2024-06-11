// Adds markdown footnote support
// https://www.alpower.com/tutorials/configuring-footnotes-with-eleventy

module.exports = function (eleventyConfig) {
  // set markdown footnote processor
  let markdownIt = require("markdown-it");
  let markdownItFootnote = require("markdown-it-footnote");

  let options = {
    html: true, // Enable HTML tags in source
    breaks: true, // Convert '\n' in paragraphs into <br>
    linkify: true, // Autoconvert URL-like text to links
  };

  // configure the library with options
  let markdownLib = markdownIt(options).use(markdownItFootnote);
  // set the library to process markdown files
  eleventyConfig.setLibrary("md", markdownLib);
};
