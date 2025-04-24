export default function (eleventyConfig) {
  eleventyConfig.addFilter("getWebmentionsForUrl", function (webmentions, url) {
    url = `https://clarale.com${url}`;
    const likes = ["like-of"];
    const reposts = ["repost-of"];
    const messages = ["mention-of", "in-reply-to"];

    const matchingURLs = (entry) => {
      // Add "/" to the end of URLs if missing
      let wmTarget = entry["wm-target"];
      if (wmTarget.slice(-1) !== "/") {
        wmTarget = wmTarget + "/";
      }
      return wmTarget === url;
    };
    const hasRequiredFields = (entry) => {
      const { author, published, content } = entry;
      const wmReceived = entry["wm-received"];
      return author.name && content && (published || wmReceived);
    };
    const setDate = (entry) => {
      if (!entry.published) {
        entry.published = entry["wm-received"];
      }
      return entry;
    };
    const truncateContent = (entry) => {
      entry.content.text = entry.content.text.slice(0, 1000);
      delete entry.content.html;
      return entry;
    };

    // Filter and map webmentions.json
    const likesMapped = webmentions
      .filter(matchingURLs)
      .filter((entry) => likes.includes(entry["wm-property"]))
      .map(setDate);
    const repostsMapped = webmentions
      .filter(matchingURLs)
      .filter((entry) => reposts.includes(entry["wm-property"]))
      .filter(hasRequiredFields)
      .map(setDate)
      .map(truncateContent);
    const messagesMapped = webmentions
      .filter(matchingURLs)
      .filter((entry) => messages.includes(entry["wm-property"]))
      .filter(hasRequiredFields)
      .map(setDate)
      .map(truncateContent);

    const webmentionCount =
      likesMapped.length + repostsMapped.length + messagesMapped.length;

    return {
      count: webmentionCount,
      likes: likesMapped,
      reposts: repostsMapped,
      messages: messagesMapped,
    };
  });
}
