import { minToDurationString } from "./formatPostDetails";
import getPosts from "./getPosts";
const DIR_CATEGORY = "recipes";

// Based on buildPostList.js

export async function buildPage(html) {
  try {
    const posts = await getPosts(DIR_CATEGORY);
    const postsHtml = posts
      .map(
        (post) =>
          `<li data-tag="${post.dataTag}"><a href="${post.slug}">${
            post.title
          }</a>${
            post.durationMin > 0
              ? `<time class="label dt-duration" datetime="${minToDurationString(
                  post.durationMin
                )}">` +
                post.durationMin +
                `&nbsp;min</time>`
              : ""
          }</li>`
      )
      .join("");
    return html.replace("<li>Posts go here</li>", postsHtml);
  } catch (error) {
    throw new Error(`Failed to build page: ${error}`);
  }
}
