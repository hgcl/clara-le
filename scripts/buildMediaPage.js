import getPosts from "./getPosts";
import yearArray from "./yearArray";
const dirCategory = "media";

export async function buildPage(html) {
  try {
    const posts = await getPosts(dirCategory);
    const orderedPosts = posts.sort(
      (a, b) =>
        new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime()
    );
    const postsHtml = Object.values(yearArray(2020))
      .map(
        (year) =>
          `<h2>${year}</h2>` +
          `<ul class="nobullet">` +
          orderedPosts
            .filter((post) => new Date(post.dateCreated).getFullYear() == year)
            .map(
              (post) =>
                `<li data-tag="${
                  post.dataTag
                }" class="post-row"><time class="label dt-duration" datetime="${
                  post.dateCreated
                }">
           ${new Date(post.dateCreated).toLocaleDateString("en-US", {
             month: "short",
             day: "numeric",
           })}
          </time><span class="details"><a href="${post.slug}">${
                  post.title
                }</a>${
                  post.subtitle
                    ? `<span class="subtle">${post.subtitle}</span>`
                    : ""
                }</span></li>`
            )
            .join("") +
          `</ul>`
      )
      .join("");
    return html.replace("<p>Posts go here</p>", postsHtml);
  } catch (error) {
    throw new Error(`Failed to build page: ${error}`);
  }
}
