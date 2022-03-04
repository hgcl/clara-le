import { cwd } from "process";
import { readdir, readFile } from "fs/promises";
import { load } from "js-yaml";
const POSTS_DIR = `${cwd()}/pages/recipes`;
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
async function getPosts() {
  const files = await readdir(POSTS_DIR);
  const posts = await Promise.all(
    files.map(async (file) => {
      const content = await readFile(`${POSTS_DIR}/${file}`, "utf-8");
      const frontmatter = getFrontmatter(content);
      return {
        title: frontmatter.title,
        date: new Date(frontmatter.date).toLocaleDateString("fr-FR", {
          month: "2-digit",
          day: "numeric",
        }),
        slug: `/recipes/${file.replace(".md", "")}`,
      };
    })
  );
  return posts;
}
export async function buildPage(html) {
  try {
    const posts = await getPosts();
    const postsHtml = posts
      .map(
        (post) =>
          `<li><span class="label">${post.date}</span>&emsp;<a href="${post.slug}">${post.title}</a></li>`
      )
      .join("");
    return html.replace("<li>Posts go here</li>", postsHtml);
  } catch (error) {
    throw new Error(`Failed to build page: ${error}`);
  }
}
