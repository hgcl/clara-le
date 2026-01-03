import getJsonFiles from "../functions/getJsonFiles.js";

// Get JSON files from relevant directory
const directory = "./src/blogroll/";

const allPostsData = await getJsonFiles(directory);
export default allPostsData;
