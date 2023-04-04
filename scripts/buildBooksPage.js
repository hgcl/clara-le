import fetch from "node-fetch";

async function fetchMediaJSON(url) {
  const response = await fetch(url);
  const jsonData = await response.json();
  const toReadList = jsonData.reading_log_entries;
  const posts = await Promise.all(
    toReadList.map(async (data) => {
      return {
        title: data.work.title,
        author: data.work.author_names[0],
        addedDate: data.logged_date,
        posterUrl: `https://covers.openlibrary.org/b/olid/${data.work.cover_edition_key}-M.jpg`,
        bookUrl: `https://openlibrary.org${data.work.key}`,
      };
    })
  );
  return posts;
}

export async function buildPage(html) {
  const h1Regex = /\<h1[^\)]+?\<\/h1\>/;
  const headline = html.match(h1Regex);
  const urlRead = "https://openlibrary.org/people/hgcl/books/already-read.json";
  const urlToRead =
    "https://openlibrary.org/people/hgcl/books/want-to-read.json";
  const url = headline == `<h1>Want to read</h1>` ? urlToRead : urlRead;

  try {
    const posts = await fetchMediaJSON(url);
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
            <span class="tooltip">
            <a href="${post.bookUrl}">${post.title}<img src="${post.posterUrl}" loading="lazy"/></a>
            <span class="subtle details">by ${post.author}</span>
          </span></li>`
        )
        .join("") +
      `</ul>`;
    return html.replace(`<div>Data generated here</div>`, postsHtml);
  } catch (error) {
    throw new Error(`Failed to build page: ${error}`);
  }
}
