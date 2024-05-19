import { readdir, readFile, writeFile } from "fs/promises";

const OUT_DIR = `./dist`;
const POSTS_DIR = `posts`;
const COMMENTS_DIR = `./data/comments`;

async function getBuiltPosts() {
  try {
    const blogDir = await readdir(OUT_DIR + "/" + POSTS_DIR);
    const commentDir = await readdir(COMMENTS_DIR);
    for (const blog of blogDir) {
      // Condition 1: Ignore the index.html file at the root of dist/posts
      // Condition 2: Blog posts has comments
      if (blog !== "index.html" && commentDir.includes(`posts-` + blog)) {
        injectComments(
          OUT_DIR + "/" + POSTS_DIR + "/" + blog + "/index.html",
          "<section>REPLACEMENT</section>"
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
