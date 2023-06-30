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
    const postsHtml = Object.values(yearArray(2022))
      .map(
        (year) =>
          `<h2>${year}</h2>` +
          `<ul class="nobullet">` +
          orderedPosts
            .filter((post) => new Date(post.dateCreated).getFullYear() == year)
            .map(
              (post) =>
                `<li data-tag="${post.dataTag}" class="card"><img alt="" src="${post.cover}"><a class="details" href="${post.slug}">${post.title} (${post.year})</a><span class="label">${post.dataTag} <span aria-hidden="true">•</span> ${post.author}</span></li>`
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
