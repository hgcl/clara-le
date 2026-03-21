import getJsonFiles from "../functions/getJsonFiles.js";

// Get JSON files from relevant directory
const directory = "./src/cooking-wishlist/";

const allPostsData = await getJsonFiles(directory);
export default allPostsData;
