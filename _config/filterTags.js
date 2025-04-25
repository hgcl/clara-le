// Filter out all nav tags from displayed tag lists
// Filter docs: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
export default function (eleventyConfig) {
  eleventyConfig.addFilter("filterTags", function (array, onlyTagsTwo) {
    const wordsRemoved = [
      "posts",
      "media",
      "replies",
      "fall",
      "summer",
      "winter",
      "spring",
    ];
    let wordsTagsTwo = [];
    if (onlyTagsTwo == "tags-two") {
      wordsTagsTwo = ["fall", "summer", "winter", "spring"];
      // Only include the tags from "wordsTagsTwo" list in final array
      return array.filter((el) => wordsTagsTwo.includes(el));
    }
    // Remove "wordsRemoved" list in final array
    return array.filter((el) => !wordsRemoved.includes(el));
  });
}
