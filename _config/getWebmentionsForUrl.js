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
    const sanitize = (entry) => {
      const { content } = entry;
      if (content["content-type"] === "text/html") {
        content.value = sanitizeHtml(content.value);
      }
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
      .map(sanitize);
    const messagesMapped = webmentions
      .filter((entry) => entry["wm-target"] === url)
      .filter((entry) => messages.includes(entry["wm-property"]))
      .filter(hasRequiredFields)
      .map(sanitize);

    return {
      likes: likesMapped,
      repost: repostMapped,
      messages: messagesMapped,
    };
  });
}
