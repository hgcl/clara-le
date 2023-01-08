import generateRSS from "./generateRSS.js";
import generateRecipePost from "./generateRecipePost.js";

Promise.all([generateRSS(), generateRecipePost()]);
