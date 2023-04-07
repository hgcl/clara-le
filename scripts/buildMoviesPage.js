import fetch from "node-fetch";
import { load } from "cheerio";

async function fetchMedia(url) {
  const response = await fetch(url);
  const body = await response.text();
  let $ = load(body);

  const posts = await Promise.all(
    $(".poster-container").map(async (i, movie) => {
      const movieSlug = $(movie).find("div").attr("data-target-link");
      return {
        title: $(movie).find("img").attr("alt"),
        movieUrl: `https://letterboxd.com${movieSlug}`,
        rating: $(movie).find("span.rating").text(),
        // html: $(movie).html(),
      };
    })
  );
  return posts;
}

export async function buildPage(html) {
  const h1Regex = /\<h1[^\)]+?\<\/h1\>/;
  const headline = html.match(h1Regex);
  const urlWatched = "https://letterboxd.com/hgcle/films/by/date/";
  const urlWatchlist = "https://letterboxd.com/hgcle/watchlist/";
  const url = headline == `<h1>Want to watch</h1>` ? urlWatchlist : urlWatched;
  const outro =
    headline == `<h1>Want to watch</h1>`
      ? `Go to my
  <a href="https://letterboxd.com/hgcle/watchlist/">Letterboxd account</a> for the
  complete movies watchlist.`
      : `Go to my
  <a href="https://letterboxd.com/hgcle/films/">Letterboxd account</a> for the
  complete movies list.`;
  try {
    const posts = await fetchMedia(url);
    const postsHtml =
      `<ul class="nobullet">` +
      posts
        .map(
          (post) =>
            `<li class="post-row"><span class="label rating">${post.rating}</span>
          <a href="${post.movieUrl}">${post.title}</a></li>`
        )
        .join("") +
      `<p class="intro label" style="margin-top: 3rem;">` +
      outro +
      `</p>` +
      `</ul>`;
    return html.replace(`<div>Data generated here</div>`, postsHtml);
  } catch (error) {
    throw new Error(`Failed to build page: ${error}`);
  }
}
