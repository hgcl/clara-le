// Filter out a specified tag from an array
// TODO make a list of unchanging tags to exclude
// Filter docs: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
module.exports = function (eleventyConfig) {
  eleventyConfig.addFilter("filterTag", function (array, tag) {
    return array.filter((e) => e !== tag);
  });
};
