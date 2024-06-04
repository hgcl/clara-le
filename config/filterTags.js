// Filter out all nav tags from displayed tag lists
// Filter docs: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
module.exports = function (eleventyConfig) {
  eleventyConfig.addFilter("filterTags", function (array) {
    const wordsRemoved = ["posts", "media", "learning"];
    return array.filter((el) => !wordsRemoved.includes(el));
  });
};
