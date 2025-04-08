import * as sanitizeHtml from "sanitize-html";

export default function (eleventyConfig) {
  eleventyConfig.addFilter("getWebmentionsForUrl", function (webmentions, url) {
    url = `https://clarale.com${url}`;
    const likes = ["like-of"];
    const repost = ["repost-of"];
    const messages = ["mention-of", "in-reply-to"];

    const hasRequiredFields = (entry) => {
      const { author, published, content } = entry;
      return author.name && published && content;
    };
    const truncate = (entry) => {
      entry.content.text = entry.content.text.slice(0, 1000);
      delete entry.content.html;
      return entry;
    };

    // Filter and map webmentions.json
    const likesMapped = webmentions
      .filter((entry) => entry["wm-target"] === url)
      .filter((entry) => likes.includes(entry["wm-property"]));
    const repostMapped = webmentions
      .filter((entry) => entry["wm-target"] === url)
      .filter((entry) => repost.includes(entry["wm-property"]))
      .filter(hasRequiredFields)
      .map(truncate);
    const messagesMapped = webmentions
      .filter((entry) => entry["wm-target"] === url)
      .filter((entry) => messages.includes(entry["wm-property"]))
      .filter(hasRequiredFields)
      .map(truncate);

    const webmentionCount =
      likesMapped.length + repostMapped.length + messagesMapped.length;

    return {
      count: webmentionCount,
      likes: likesMapped,
      repost: repostMapped,
      messages: messagesMapped,
    };
  });
}
