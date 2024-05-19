import getAllPosts from "./getAllPosts.js";

import generateRSS from "./generateRSS.js";
import generateRecipePost from "./generateRecipePost.js";
import generatePostIndex from "./generatePostIndex.js";

const posts = await getAllPosts();

Promise.all([
  generateRSS(posts),
  // , generateRecipePost(), generatePostIndex()
]);
