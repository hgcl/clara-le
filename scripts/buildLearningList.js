import getPosts from "./getPosts";
const DIR_CATEGORY = "learning";

export async function buildPage(html) {
  try {
    const posts = await getPosts(DIR_CATEGORY, true);
    const orderedPosts = posts
      .sort((a, b) => (a === b ? 0 : a < b ? 1 : -1)) // reverse alphabetical
      .sort(
        (a, b) =>
          new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime()
      );
    const postsHtml = orderedPosts
      .map(
        (post) =>
          `<article data-tag="${post.dataTag}">
          <div class="post-header"><h2>${
            post.title
          }</h2><span class="label"><time class="dt-duration" datetime="${
            post.dateCreated
          }">
          ${new Date(post.dateCreated).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
         </time> \/ ${post.dataTag}</span></div>
          <span class="details">${
            post.subtitle ? `<span class="subtle">${post.subtitle}</span>` : ""
          }</span>${post.content}${
            post.sourceUrl
              ? `<p class="subtle"><em><a href="${post.sourceUrl}">Original source</a></em></p>`
              : ""
          }</article>`
      )
      .join("");
    return html.replace("<p>Posts go here</p>", postsHtml);
  } catch (error) {
    throw new Error(`Failed to build page: ${error}`);
  }
}
