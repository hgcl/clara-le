import fetch from "node-fetch";

async function fetchBookmarksJSON() {
  const url = "https://api.hypothes.is/api/search?limit=200&group=qoP5v2Eg";
  const HYPOTHESIS_TOKEN = "6879-FnOjdqDMK99gFtdeQ3S8-oDEvXkXII3qnmgU-xYhO1k";
  const bearer = "Bearer " + HYPOTHESIS_TOKEN;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Host: "hypothes.is",
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: bearer,
    },
  });
  const jsonData = await response.json();
  return jsonData;
}

export async function buildPage(html) {
  try {
    const posts = await fetchBookmarksJSON();
    const postsHtml = posts.rows
      // .map((post) =>
      //   console.log(
      //     post.uri.replace("http://", "").replace("https://", "").split(/[/?#]/)[0]
      //   )
      // );
      .map(
        (post) =>
          `<li class="post-row"><time class="label" datetime="${
            post.created
          }">${new Date(post.created).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })}</time><span><a href="${post.uri}">${
            post.target[0].selector[2].exact
          }</a><span>${
            post.uri
              .replace("www.", "")
              .replace("http://", "")
              .replace("https://", "")
              .split(/[/?#]/)[0]
          }</span></span></li>`
      )
      .join("");
    return html.replace("<div>Data generated here</div>", postsHtml);
  } catch (error) {
    throw new Error(`Failed to build page: ${error}`);
  }
}
