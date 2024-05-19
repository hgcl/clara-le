import { readFile, writeFile } from "fs/promises";
import { readdirSync } from "fs";

const OUT_DIR = `./dist`;
const POSTS_DIR = `posts`;

function getBuiltPosts() {
  try {
    const blogDirs = readdirSync(OUT_DIR + "/" + POSTS_DIR);
    for (const blog of blogDirs) {
      // Ignore the index.html file at the root of dist/posts
      if (blog !== "index.html") {
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
      "<section>Comments injected here</section>",
      replacement
    );
    await writeFile(filePath, replaced);
  } catch (error) {
    throw new Error(`Failed to inject comments: ${error}`);
  }
}

getBuiltPosts();

console.log("Postbuild was run.");
