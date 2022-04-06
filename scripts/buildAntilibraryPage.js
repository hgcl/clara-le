import fetch from "node-fetch";

async function fetchMediaJSON() {
  const response = await fetch(
    "https://openlibrary.org/people/hgcl/books/want-to-read.json"
  );
  const jsonData = await response.json();
  const toReadList = jsonData.reading_log_entries;
  const posts = await Promise.all(
    toReadList.map(async (data) => {
      return {
        title: data.work.title,
        author: data.work.author_names[0],
        addedDate: data.logged_date,
        posterUrl: `https://covers.openlibrary.org/b/olid/${data.work.cover_edition_key}-M.jpg`,
        bookUrl: `https://openlibrary.org${data.logged_edition}`,
      };
    })
  );
  return posts;
}
export async function buildPage(html) {
  const posts = await fetchMediaJSON();
  const postsHtml = posts
    .sort(
      (a, b) =>
        new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime()
    )
    .map(
      (post) =>
        `<div class="media-card">
        <img src=${
          post.posterUrl
        } width="250" height="375" alt="" loading="lazy">
        <span>${post.title}</span>
            <div class="content">
           <time datetime="${post.addedDate}">${new Date(
          post.addedDate
        ).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        })}</time>&ensp;|&ensp;Book&ensp;|&ensp;
                <a href="${
                  post.bookUrl
                }">More&nbsp;info<span class="sr-only">of ${
          post.title
        }</span></a>
            </div>
        </div>`
    )
    .join("");
  return html.replace("<div>Data generated here</div>", postsHtml);
}
