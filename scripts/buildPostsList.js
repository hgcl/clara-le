import getPosts from "./getPosts";
import yearArray from "./yearArray";
const DIR_CATEGORY = "posts";

export async function buildPage(html) {
  try {
    const posts = await getPosts(DIR_CATEGORY);
    const orderedPosts = posts.sort(
      (a, b) =>
        new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime()
    );
    let totalWords = 0;
    posts.forEach((post) => (totalWords += post.wordCount));
    const totalPosts = posts.length;
    const postsHtml = Object.values(yearArray(2019))
      .map(
        (year) =>
          `<h2>${year}</h2>` +
          `<ul class="nobullet post-rows">` +
          orderedPosts
            .filter((post) => new Date(post.dateCreated).getFullYear() == year)
            .map(
              (post) =>
                `<li data-tag="${
                  post.dataTag
                }"><time class="label dt-duration" datetime="${
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
    return html
      .replace("<p>Posts go here</p>", postsHtml)
      .replace("<span>word count here</span>", totalWords)
      .replace("<span>post number here</span>", totalPosts);
  } catch (error) {
    throw new Error(`Failed to build page: ${error}`);
  }
}
