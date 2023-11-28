import generateRSS from "./generateRSS.js";
import generateRecipePost from "./generateRecipePost.js";
import generatePostIndex from "./generatePostIndex.js";

Promise.all([generateRSS(), generateRecipePost(), generatePostIndex()]);
