import fs from "fs/promises";

// Get JSON files from relevant directory
const directory = "./src/bookmarks/";

const response = await fs.readdir(directory);

// Only keep JSON files in list
const allPostsArray = response.filter((name) => name.slice(-5) === ".json");

// Add each post data to `allPostsData` array
let allPostsData = [];
for (let fileIndex in allPostsArray) {
  const filename = allPostsArray[fileIndex];
  let post = JSON.parse(await fs.readFile(directory + filename));
  allPostsData.push({ key: filename.slice(0, -5), ...post });
}

export default allPostsData;
