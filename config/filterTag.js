// Filter out a specified tag from an array
module.exports = function (eleventyConfig) {
  eleventyConfig.addFilter("filterTag", function (array, tag) {
    return array.filter((e) => e !== tag);
  });
};
