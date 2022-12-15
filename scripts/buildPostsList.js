import getPosts from "./getPosts";

export async function buildPage(html) {
  // Create year array
  const currentYear = new Date(Date.now()).getFullYear();
  const firstYear = 2020;
  let yearArray = [];
  for (let i = currentYear; i >= firstYear; i--) {
    yearArray.push(new Date(i, 1, 1).getFullYear());
  }
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
    const orderedPosts = posts.sort(
      (a, b) =>
        new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime()
    );
    const postsHtml = Object.values(yearArray)
      .map(
        (cat) =>
          `<h2>${cat}</h2>` +
          `<ul id="blog-list" class="nobullet">` +
          orderedPosts
            .filter((post) => new Date(post.dateCreated).getFullYear() == cat)
            .map(
              (post) =>
                `<li class="post-row"><time class="label dt-duration" datetime="${
                  post.dateCreated
                }">
           ${new Date(post.dateCreated).toLocaleDateString("en-US", {
             month: "short",
             day: "numeric",
           })}
          </time><span><a href="${post.slug}">${post.title}</a>${
                  post.subtitle
                    ? `<span class="subtle">${post.subtitle}</span>`
                    : ""
                }</span></li>`
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
