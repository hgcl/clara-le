import fs from "fs";
import path from "path";

// Get JSON files from blogroll directory
const blogrollDir = path.resolve("blogroll", "../src/blogroll");

const blogroll = fs
  .readdirSync(blogrollDir)
  .filter((name) => path.extname(name) === ".json")
  .map((name) => ({
    key: path.parse(name).name,
    ...path.join(blogrollDir, name),
  }));
export default blogroll;
