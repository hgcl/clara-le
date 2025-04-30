export default function (eleventyConfig) {
  eleventyConfig.addFilter("getWebmentionsForUrl", function (webmentions, url) {
    url = `https://clarale.com${url}`;
    const likes = ["like-of"];
    const reposts = ["repost-of"];
    const messages = ["mention-of", "in-reply-to"];

    const matchesURLs = (entry) => {
      // Add "/" to the end of URLs if missing
      let wmTarget = entry["wm-target"];
      if (wmTarget.slice(-1) !== "/") {
        wmTarget = wmTarget + "/";
      }
      return wmTarget === url;
    };
    const hasRequiredFields = (entry) => {
      const { url, published } = entry;
      const wmReceived = entry["wm-received"];
      return url && (published || wmReceived);
    };
    const setsDate = (entry) => {
      if (!entry.published) {
        entry.published = entry["wm-received"];
      }
      return entry;
    };
    const truncatesContent = (entry) => {
      if (entry.content.text.length > 1000) {
        entry.content.text = entry.content.text.slice(0, 1000) + ` [...]`;
        entry.content.truncated = true;
      }
      delete entry.content.html;
      return entry;
    };

    // Filter and map webmentions.json
    const likesMapped = webmentions
      .filter(matchesURLs)
      .filter((entry) => likes.includes(entry["wm-property"]))
      .filter(hasRequiredFields)
      .map(setsDate);
    const repostsMapped = webmentions
      .filter(matchesURLs)
      .filter((entry) => reposts.includes(entry["wm-property"]))
      .filter(hasRequiredFields)
      .map(setsDate)
      .map(truncatesContent);
    const messagesMapped = webmentions
      .filter(matchesURLs)
      .filter((entry) => messages.includes(entry["wm-property"]))
      .filter(hasRequiredFields)
      .map(setsDate)
      .map(truncatesContent);

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
