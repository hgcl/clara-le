// Format dates into YYYY-MM-DD format
// Filter docs: https://www.11ty.dev/docs/languages/nunjucks/#filters
module.exports = function (eleventyConfig) {
  eleventyConfig.addFilter("formatDate", function (date, size) {
    let newDate = new Date(date);
    if (size === "short") {
      newDate = newDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    } else {
      newDate = newDate.toLocaleDateString("en-CA");
    }
    return newDate;
  });
};
