const fs = require("fs");
const path = require("path");

// Get JSON files from blogroll directory
const blogrollDir = path.resolve(__dirname, "../src/blogroll");

const blogroll = fs
  .readdirSync(blogrollDir)
  .filter((name) => path.extname(name) === ".json")
  .map((name) => ({
    key: path.parse(name).name,
    ...require(path.join(blogrollDir, name)),
  }));

module.exports = blogroll;
