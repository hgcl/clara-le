const fs = require("fs");
const path = require("path");

// Get JSON files from recipes directory
const bookmarkDir = path.resolve(__dirname, "../src/bookmarks");

const recipes = fs
  .readdirSync(bookmarkDir)
  .filter((name) => path.extname(name) === ".json")
  .map((name) => ({
    key: path.parse(name).name,
    ...require(path.join(bookmarkDir, name)),
  }));

module.exports = recipes;
