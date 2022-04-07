import getPosts from "./getPosts";

export async function buildPage(html) {
  // Get headline H1
  const h1Regex = /<([h1]+)([^<]+)*(?:>(.*)<\/\1>|\s+\/>)/gm;
  const headline = html.match(h1Regex);
  const dirCategory =
    headline == "<h1>Musings</h1>"
      ? `posts`
      : headline == "<h1>Notes</h1>"
      ? `notes`
      : "mmmh not sure what to write here";
  try {
    const posts = await getPosts(dirCategory);
    const postsHtml = posts
      .sort(
        (a, b) =>
          new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime()
      )
      .map(
        (post) =>
          `<li class="post-row"><time class="label" datetime="${
            post.dateCreated
          }">
           ${new Date(post.dateCreated).toLocaleDateString("en-US", {
             month: "short",
             day: "numeric",
           })}
          </time><a href="${post.slug}">${post.title}</a></li>`
      )
      .join("");
    return html.replace("<li>Posts go here</li>", postsHtml);
  } catch (error) {
    throw new Error(`Failed to build page: ${error}`);
  }
}
