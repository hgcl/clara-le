import fs from "fs";
import path from "path";

// Get JSON files from bookmarks directory
const bookmarkDir = path.resolve("bookmarks", "../src/bookmarks");

const bookmarks = fs
  .readdirSync(bookmarkDir)
  .filter((name) => path.extname(name) === ".json")
  .map((name) => ({
    key: path.parse(name).name,
    ...path.join(bookmarkDir, name),
  }));
export default bookmarks;
