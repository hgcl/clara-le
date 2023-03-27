import getPosts from "./getPosts";

export async function buildPage(html) {
  // Create year array
  const currentYear = new Date(Date.now()).getFullYear();
  const firstYear = 2020;
  let yearArray = [];
  for (let i = currentYear; i >= firstYear; i--) {
    yearArray.push(new Date(i, 1, 1).getFullYear());
  }
  try {
    const posts = await getPosts(`posts`);
    const orderedPosts = posts.sort(
      (a, b) =>
        new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime()
    );
    const postsHtml = Object.values(yearArray)
      .map(
        (cat) =>
          `<h2>${cat}</h2>` +
          `<ul class="nobullet">` +
          orderedPosts
            .filter((post) => new Date(post.dateCreated).getFullYear() == cat)
            .map(
              (post) =>
                `<li data-tag="${
                  post.dataTag
                }" class="post-row"><time class="label dt-duration" datetime="${
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
