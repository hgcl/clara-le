// Local plugins
import consoleLog from "./_config/consoleLog.js";
import formatDate from "./_config/formatDate.js";
import formatDurationAttr from "./_config/formatDurationAttr.js";
import filterTags from "./_config/filterTags.js";
import squash from "./_config/squash.js";
import getWebmentionsForUrl from "./_config/getWebmentionsForUrl.js";
// Other plugins
import pluginRss from "@11ty/eleventy-plugin-rss";
import markdownItPlugin from "./_config/markdownItPlugin.js";

export default function (eleventyConfig) {
  // LOCAL PLUGINS, see docs: https://www.11ty.dev/docs/quicktips/local-plugin/
  eleventyConfig.addPlugin(consoleLog);
  eleventyConfig.addPlugin(formatDate);
  eleventyConfig.addPlugin(formatDurationAttr);
  eleventyConfig.addPlugin(filterTags);
  eleventyConfig.addPlugin(squash);
  eleventyConfig.addPlugin(getWebmentionsForUrl);

  // 11ty official RSS plugin: https://www.11ty.dev/docs/plugins/rss/
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(markdownItPlugin);

  // Copy the following folders over to _site
  eleventyConfig.addPassthroughCopy("public");

  return {
    // When a passthrough file is modified, rebuild the pages:
    passthroughFileCopy: true,
    // Set custom directories for input, output, includes, and data
    dir: {
      input: "src",
      includes: "../_includes",
      data: "../_data",
      output: "_site",
    },
  };
}
