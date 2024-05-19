/** This script get all posts data in one go to avoid running
 * through all posts multiple times during prebuild
 */

import getPosts from "./getPosts.js";
import getRecipes from "./getRecipes.js";

const POSTS_DIR = "posts";
const LEARN_DIR = "learning";
const MEDIA_DIR = "media";
const RECIPES_DIR = "recipes";

export default async function getAllPosts() {
  try {
    let blogPosts = await getPosts(POSTS_DIR);
    let learningPosts = await getPosts(LEARN_DIR);
    let mediaPosts = await getPosts(MEDIA_DIR);
    let recipePosts = await getRecipes(RECIPES_DIR);
    console.log(
      "Got all blog posts, learning posts, media posts and recipe posts data."
    );
    return { blogPosts, learningPosts, mediaPosts, recipePosts };
  } catch (error) {
    throw new Error(`Failed to get data: ${error}`);
  }
}
