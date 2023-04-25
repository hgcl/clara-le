import fetch from "node-fetch";
import { load } from "cheerio";
import yearArray from "./yearArray";

async function fetchMovies(url) {
  const response = await fetch(url);
  const body = await response.text();
  let $ = load(body);
  const posts = await Promise.all(
    $(".diary-entry-row").map(async (i, movie) => {
      const dateString = $(movie)
        .find("td.td-day a")
        .attr("href")
        .slice(0, -1)
        .replace("/hgcle/films/diary/for/", "");
      const dateFormatted = new Date(dateString);
      const urlSlug = $(movie).find("h3 a").attr("href");
      return {
        media: `Movie`,
        title: $(movie).find("h3").text(),
        dateAdded: dateFormatted,
        targetUrl: `https://letterboxd.com${urlSlug}`,
      };
    })
  );
  return posts;
}

async function fetchBooks(url) {
  const response = await fetch(url);
  const jsonData = await response.json();
  const bookArray = jsonData.reading_log_entries;
  const posts = await Promise.all(
    bookArray.map(async (data) => {
      const dateFormatted = new Date(data.logged_date);
      return {
        media: `Book`,
        title: data.work.title,
        author: data.work.author_names[0],
        dateAdded: dateFormatted,
        targetUrl: `https://openlibrary.org${data.work.key}`,
        // rating: `XXXXX`,
      };
    })
  );
  return posts;
}

async function mergeMediaJson() {
  const urlWatched = "https://letterboxd.com/hgcle/films/diary/";
  const urlRead = "https://openlibrary.org/people/hgcl/books/already-read.json";
  const moviesWatched = await fetchMovies(urlWatched);
  const booksRead = await fetchBooks(urlRead);
  const mediaJson = moviesWatched.concat(booksRead);
  return mediaJson;
}

export async function buildPage(html) {
  // Choose content based on page H1
  // const h1Regex = /\<h1[^\)]+?\<\/h1\>/;
  // const h1Html = html.match(h1Regex);
  // const pageSlug = h1Html == `<h1>Media</h1>` ? "media" : "antilibrary";
  try {
    const posts = await mergeMediaJson();
    const orderedPosts = posts.sort(
      (a, b) =>
        new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
    );
    const postsHtml = Object.values(yearArray(2023))
      .map(
        (year) =>
          `<h2>${year}</h2>` +
          `<ul class="nobullet">` +
          orderedPosts
            .filter((post) => new Date(post.dateAdded).getFullYear() == year)
            .map(
              (post) =>
                `<li data-tag="${
                  post.media
                }" class="post-row"><time class="label dt-duration" datetime="${
                  post.dateAdded
                }">
       ${new Date(post.dateAdded).toLocaleDateString("en-US", {
         month: "short",
         day: "numeric",
       })}
      </time>
                    <span class="details"><a href="${post.targetUrl}">${
                  post.title
                }</a><span class="subtle">${post.media}
                </span></span></li>`
            )

            .join("") +
          `</ul>`
      )
      .join("");
    return html.replace(`<div>Data generated here</div>`, postsHtml);
  } catch (error) {
    throw new Error(`Failed to build page: ${error}`);
  }
}
