import minToHours from "./minToHours";
import getPosts from "./getPosts";
const dirCategory = "recipes";

// Based on buildPostList.js

export async function buildPage(html) {
  try {
    const posts = await getPosts(dirCategory);
    const postsHtml = posts
      .sort(
        (a, b) =>
          new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime()
      )
      .map(
        (post) =>
          `<li class="post-row"><a href="${post.slug}">${post.title}</a>${
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
