import { readdir, readFile, writeFile } from "fs/promises";
import yaml from "js-yaml";

const OUT_DIR = `./dist`;
const POSTS_DIR = `posts`;
const COMMENTS_DIR = `./data/comments`;

// This function gets built posts and injects the relevant comments in them
async function getBuiltPosts() {
  try {
    const blogDir = await readdir(OUT_DIR + "/" + POSTS_DIR);
    const commentDir = await readdir(COMMENTS_DIR);
    for (const blog of blogDir) {
      // Condition 1: Ignore the index.html file at the root of dist/posts
      // Condition 2: Blog posts has comments
      if (blog !== "index.html" && commentDir.includes(blog)) {
        const commentGroup = await readdir(COMMENTS_DIR + "/" + blog);
        let collatedComments = "";
        await Promise.all(
          commentGroup
            .map(async (file) => {
              const rawComment = await readFile(
                COMMENTS_DIR + "/" + blog + "/" + file,
                "utf-8"
              );
              let commentYAML = yaml.load(rawComment);
              collatedComments += `<article>
              <p class="label divide-list"><span>${
                commentYAML.name
              }</span><time datetime="${new Date(
                commentYAML.date
              ).toLocaleDateString("fr-CA")}" class="dt-published">${new Date(
                commentYAML.date
              ).toLocaleDateString("fr-CA")}</time></p>
              <p class="comment-message">${commentYAML.message}</p>
            </article>`;
            })
            // Sort entries by date (descending order)
            .sort((a, b) => new Date(b.date) - new Date(a.date))
        );
        injectComments(
          OUT_DIR + "/" + POSTS_DIR + "/" + blog + "/index.html",
          `<section id="comments" class="center"><h2>Comments</h2>${collatedComments}</section>`
        );
      }
    }
  } catch (error) {
    throw new Error(`Failed to get blog post files: ${error}`);
  }
}

async function injectComments(filePath, replacement) {
  try {
    const content = await readFile(filePath, "utf-8");
    const replaced = content.replace(
      "<section hidden>Comments injected here</section>",
      replacement
    );
    await writeFile(filePath, replaced);
  } catch (error) {
    throw new Error(`Failed to inject comments: ${error}`);
  }
}

getBuiltPosts();

console.log("Postbuild was run.");
