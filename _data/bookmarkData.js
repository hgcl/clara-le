import getJsonFiles from "../_functions/getJsonFiles.js";

// Get JSON files from relevant directory
const directory = "./src/bookmarks/";

const allPostsData = await getJsonFiles(directory);
export default allPostsData;
