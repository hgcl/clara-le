export default function (eleventyConfig) {
  eleventyConfig.addFilter("log", (value) => {
    console.log(value);
  });
}
