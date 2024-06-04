const pluginRss = require("@11ty/eleventy-plugin-rss");

module.exports = function (eleventyConfig) {
  // LOCAL PLUGINS, see docs: https://www.11ty.dev/docs/quicktips/local-plugin/
  eleventyConfig.addPlugin(require("./config/formatDate.js"));
  eleventyConfig.addPlugin(require("./config/formatDurationAttr.js"));
  eleventyConfig.addPlugin(require("./config/filterTags.js"));

  // 11ty official RSS plugin: https://www.11ty.dev/docs/plugins/rss/
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(require("./config/markdownItPlugin.js"));

  // Copy the following folders over to _site
  eleventyConfig.addPassthroughCopy("src/styles");
  eleventyConfig.addPassthroughCopy("src/img");

  return {
    // When a passthrough file is modified, rebuild the pages:
    passthroughFileCopy: true,
    // Set custom directories for input, output, includes, and data
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
  };
};
