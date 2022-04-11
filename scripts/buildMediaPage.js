import fetch from "node-fetch";

async function fetchMediaJSON() {
  // TODO: REPLACE WITH REAL DATA
  const response = await fetch("https://logger.robinmetral.workers.dev/");
  const jsonData = await response.json();
  return jsonData;
}
export async function buildPage(html) {
  try {
    const posts = await fetchMediaJSON();
    const postsHtml = posts
      .sort(
        (a, b) =>
          new Date(b.watchDate).getTime() - new Date(a.watchDate).getTime()
      )
      .map(
        (post) =>
          `<div class="media-card">
          <img src=${post.posterUrl} width="250" height="375" alt="${
            post.title
          }" loading="lazy">
            <div class="content">
              <div><time datetime="${post.watchDate}">${new Date(
            post.watchDate
          ).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })}</time>&ensp;|&ensp;Movie&ensp;|&ensp;
        <button onclick="toggleDialog('show',
        '${post.title}', '${post.directors}', '${
            post.rating
          }');">Review<span class="sr-only">of ${
            post.title
          }</span></button></div><div class="rating" style="--rating: ${
            post.rating
          };">
              </div>
            </div>
        </div>`
      )
      .join("");
    return html.replace("<div>Data generated here</div>", postsHtml);
  } catch (error) {
    throw new Error(`Failed to build page: ${error}`);
  }
}
