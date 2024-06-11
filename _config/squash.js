// Make search index JSON cleaner:
// Make lower case, remove useless spaces, remove duplicates, remove less meaningful words
module.exports = function (eleventyConfig) {
  eleventyConfig.addFilter("squash", function (text) {
    let content = new String(text);

    // all lower case, please
    content = content.toLowerCase();

    // remove all html elements and new lines
    let re = /(&lt;.*?&gt;)|(<.*?>)/gi;
    let plain = unescape(content.replace(re, ""));

    // remove duplicated words
    let words = plain.split(" ");
    let deduped = [...new Set(words)];
    let dedupedStr = deduped.join(" ");

    // remove short and less meaningful words
    let result = dedupedStr.replace(
      /\b(\.|\,|the|a|an|and|am|you|I|to|if|of|off|me|my|on|in|it|is|at|as|we|do|be|has|but|was|so|no|not|or|up|for)\b/gi,
      ""
    );
    //remove newlines, and punctuation
    result = result.replace(/\.|\,|\?|-|—|\n/g, "");
    //remove repeated spaces
    result = result.replace(/([ ]{2,}|\t+)/g, " ");

    return result;
  });
};
