import getAllPosts from "./getAllPosts.js";
import generateRSS from "./generateRSS.js";
import generateRecipePost from "./generateRecipePost.js";
import generatePostIndex from "./generatePostIndex.js";

// Get all posts data in one go
const { blogPosts, learningPosts, mediaPosts, recipePosts } =
  await getAllPosts();

Promise.all([
  generateRSS(blogPosts),
  generateRecipePost(recipePosts),
  generatePostIndex(blogPosts, learningPosts, mediaPosts, recipePosts),
]);
