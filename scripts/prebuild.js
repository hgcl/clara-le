import getAllPosts from "./getAllPosts.js";

import generateRSS from "./generateRSS.js";
import generateRecipePost from "./generateRecipePost.js";
import generatePostIndex from "./generatePostIndex.js";

const { posts, learn, media, recipes } = await getAllPosts();
console.log(recipes);

Promise.all([
  generateRSS(posts),
  // , generateRecipePost()
  generatePostIndex(posts, learn, media, recipes),
]);
