import getPosts from "./getPosts.js";
import getRecipes from "./getRecipes.js";

const POSTS_DIR = "posts";
const LEARN_DIR = "learning";
const MEDIA_DIR = "media";
const RECIPES_DIR = "recipes";

export default async function getAllPosts() {
  try {
    let posts = await getPosts(POSTS_DIR);
    let learn = await getPosts(LEARN_DIR);
    let media = await getPosts(MEDIA_DIR);
    let recipes = await getRecipes(RECIPES_DIR);
    console.log("Got all posts data.");
    return { posts, learn, media, recipes };
  } catch (error) {
    throw new Error(`Failed to get data: ${error}`);
  }
}
