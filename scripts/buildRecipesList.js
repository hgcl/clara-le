import minToHours from "./minToHours";
import getPosts from "./getPosts";
const dirCategory = "recipes";

// Based on buildPostList.js

export async function buildPage(html) {
  try {
    const posts = await getPosts(dirCategory);
    const postsHtml = posts
      .map(
        (post) =>
          // TODO: data-tag to replace when real tags added to posts
          `<li data-tag="${post.dataTag}" class="post-row"><a href="${
            post.slug
          }">${post.title}</a>${
            post.durationMin > 0
              ? `<time class="label dt-duration" datetime="${minToHours(
                  post.durationMin
                )}">` + minToHours(post.durationMin)
              : "" + `</time>`
          }</li>`
      )
      .join("");
    return html.replace("<li>Posts go here</li>", postsHtml);
  } catch (error) {
    throw new Error(`Failed to build page: ${error}`);
  }
}
