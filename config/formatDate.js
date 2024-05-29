// Format dates into YYYY-MM-DD format
module.exports = function (eleventyConfig) {
  eleventyConfig.addFilter("formatDate", function (date) {
    return new Date(date).toLocaleDateString("en-CA");
  });
};
