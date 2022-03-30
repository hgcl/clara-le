import { cwd } from "process";
import { readdir, readFile } from "fs/promises";
import { load } from "js-yaml";
const POSTS_DIR = `${cwd()}/pages/posts`;
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
        date: frontmatter.dateCreated,
        slug: `/posts/${file.replace(".md", "")}`,
      };
    })
  );
  return posts;
}
export async function buildPage(html) {
  try {
    const posts = await getPosts();
    const postsHtml = posts
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .map(
        (post) =>
          `<li class="post-row"><time class="label" datetime="${post.date}">
           ${new Date(post.date).toLocaleDateString("en-US", {
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
