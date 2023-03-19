import fetch from "node-fetch";

async function fetchMediaJSON(category) {
  const response = await fetch(category);
  const jsonData = await response.json();
  const toReadList = jsonData.reading_log_entries;
  const posts = await Promise.all(
    toReadList.map(async (data) => {
      return {
        title: data.work.title,
        author: data.work.author_names[0],
        addedDate: data.logged_date,
        posterUrl: `https://covers.openlibrary.org/b/olid/${data.work.cover_edition_key}-L.jpg`,
        bookUrl: `https://openlibrary.org${data.work.key}`,
      };
    })
  );
  return posts;
}

export async function buildPage(html) {
  // Get category in H1
  const h1Regex = /\<h1[^\)]+?\<\/h1\>/;
  const headline = html.match(h1Regex);
  const category =
    headline == `<h1>Books <span class="sr-only">to-read</span></h1>`
      ? `https://openlibrary.org/people/hgcl/books/want-to-read.json`
      : `https://openlibrary.org/people/hgcl/books/already-read.json`;

  try {
    const posts = await fetchMediaJSON(category);
    const postsHtml =
      `<ul class="nobullet">` +
      posts
        // JSON includes books that have been removed from the lists...
        .filter((post) => post.title !== null)
        .sort(
          (a, b) =>
            new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime()
        )
        .map(
          (post) =>
            `<li class="post-row">
            <time class="label dt-duration" datetime="${post.addedDate}">
            ${new Date(post.addedDate).toLocaleDateString("en-US", {
              month: "short",
              year: "2-digit",
            })}</time>
            <span class="tooltip">
            <a href="${post.bookUrl}">${post.title}<img src="${
              post.posterUrl
            }"/></a>
            <span class="subtle">by ${post.author}</span>
          </span></li>`
        )
        .join("") +
      `</ul>`;
    return html.replace(`<div>Data generated here</div>`, postsHtml);
  } catch (error) {
    throw new Error(`Failed to build page: ${error}`);
  }
}
