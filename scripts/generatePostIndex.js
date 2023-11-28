/**
 * This script generates postIndex.js (all post index)
 * that is used for the search feature
 */

import getPosts from "./getPosts.js";
import { getRecipes } from "./generateRecipePost.js";
import { writeFileSync } from "fs";
const PUBLIC_DIR = `./public/`;
const POSTS_CAT = "posts";
const RECIPES_CAT = "recipes";
const LEARN_CAT = "learning";
const MEDIA_CAT = "media";

function htmlToJson(html) {
  return html
    .replace(/<[^>]*>?/g, " ")
    .replace(/["]/g, "")
    .replace(/[\n]/g, " ");
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function mapJson(posts, learningPosts, mediaPosts, recipes) {
  let allPosts = posts.concat(learningPosts).concat(mediaPosts); // concat all articles that follow the same original JSON structure
  let postsNumber = allPosts.length; // so that we can continue the ids from there
  allPosts = allPosts
    .map(
      (post, index) =>
        `{ id: ${index}, directory: "${
          post.directory === "posts"
            ? "Musings"
            : capitalizeFirstLetter(post.directory)
        }", title: "${post.title}", subtitle: "${post.subtitle}", slug: "${
          post.slug
        }", dateCreated: "${post.dateCreated}",  content: "${htmlToJson(
          post.content
        )}"},`
    )
    .join("");

  // TODO: get full recipe in content. For now, I only get a section of the ingredients.
  recipes = recipes
    .map(
      (recipe, index) =>
        `{ id: ${index + postsNumber}, directory: "Recipes", title: "${
          recipe.title
        }", slug: "${"/" + RECIPES_CAT + "/" + recipe.slug}", dateCreated: "${
          recipe.dateCreated
        }", content: "${recipe.intro} ${recipe.ingredients[0].ingMand.join(
          ", "
        )}"},`
    )
    .join("");
  return allPosts + recipes;
}

export default async function process() {
  try {
    const posts = await getPosts(POSTS_CAT, true);
    const learningPosts = await getPosts(LEARN_CAT, true);
    const mediaPosts = await getPosts(MEDIA_CAT, true);
    const recipes = await getRecipes(RECIPES_CAT);
    const postIndex =
      `export default [` +
      mapJson(posts, learningPosts, mediaPosts, recipes) +
      `];`;
    writeFileSync(PUBLIC_DIR + "postIndex.js", postIndex, "utf8");
    console.log("Generated postIndex.js.");
  } catch (error) {
    throw new Error(`Failed to generate data: ${error}`);
  }
}
