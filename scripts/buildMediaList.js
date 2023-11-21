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
    const postsHtml = Object.values(yearArray(2021))
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
                }" class="card"><a class="card-link" href="${
                  post.slug
                }"><div><img loading="lazy" alt=""
                ${
                  post.dataTag == "movie" || post.dataTag == "tv series"
                    ? `src="https://image.tmdb.org/t/p/w1280/${post.cover}.jpg"`
                    : `src="https://covers.openlibrary.org/b/id/${post.cover}-L.jpg"`
                }
                ></div><span class="h3">${post.title}<br/>(by ${post.author
                  .toString()
                  .replace(",", " & ")})</span></a> <span class="label">${
                  post.dataTag
                } <span class="sr-only">,</span><span aria-hidden="true">&#47;</span> ${
                  post.year
                }</span></li>`
            )
            .join("") +
          `</ul>`
      )
      .join("")
      .replace("<h2>2021</h2>", "<h2>Prior</h2>");
    return html.replace("<p>Posts go here</p>", postsHtml);
  } catch (error) {
    throw new Error(`Failed to build page: ${error}`);
  }
}
