import { readdir, readFile, writeFile } from "fs/promises";

const OUT_DIR = `./dist`;
const POSTS_DIR = `posts`;
const TEMP_PATH = `46-three-thousand-kilometers/index.html`;

// const files = await readdir(OUT_DIR + "/" + POSTS_DIR);

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

injectComments(
  OUT_DIR + "/" + POSTS_DIR + "/" + TEMP_PATH,
  "<section>NEW TEXT HERE</section>"
);

console.log("Postbuild was run.");
