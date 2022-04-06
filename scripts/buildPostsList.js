import { cwd } from "process";
import { readdir, readFile } from "fs/promises";
import { load } from "js-yaml";
const PAGES_DIR = `${cwd()}/pages`;

/**
 * Extracts frontmatter with `---` or `<!-- -->` delimiters from a string.
 * Inspired by vfile-matter: https://github.com/vfile/vfile-matter/
 */
function getFrontmatter(file) {
  const match =
    /^(?:---|<!--)(?:\r?\n|\r)(?:([\s\S]*?)(?:\r?\n|\r))?(?:---|-->)(?:\r?\n|\r|$)/.exec(
      file
    );
  if (match) {
    return load(match[1]);
  } else {
    return {};
  }
}
async function getPosts(dirCategory) {
  const files = await readdir(PAGES_DIR + "/" + dirCategory);
  const posts = await Promise.all(
    files.map(async (file) => {
      const content = await readFile(
        `${PAGES_DIR}/${dirCategory}/${file}`,
        "utf-8"
      );
      const frontmatter = getFrontmatter(content);
      return {
        title: frontmatter.title,
        dateCreated: frontmatter.dateCreated,
        dateModified: frontmatter.dateModified,
        slug: `/${dirCategory}/${file.replace(".md", "")}`,
      };
    })
  );
  return posts;
}
export async function buildPage(html) {
  // Get headline H1
  const h1Regex = /<([h1]+)([^<]+)*(?:>(.*)<\/\1>|\s+\/>)/gm;
  let headline = html.match(h1Regex);
  let dirCategory =
    headline == "<h1>Musings</h1>"
      ? `posts`
      : headline == "<h1>Notes</h1>"
      ? `notes`
      : headline == "<h1>Recipe book</h1>"
      ? `recipes`
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
