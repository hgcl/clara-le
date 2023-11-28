/**
 * This script generates postIndex.js (all post index)
 * that is used for the search feature
 */

import getPosts from "./getPosts.js";
import { getRecipes } from "./generateRecipePost.js";
import { writeFileSync } from "fs";
const PUBLIC_DIR = `./public/`;
const POSTS_DIR = "posts";
const RECIPES_DIR = "recipes";

function htmlToJson(html) {
  return html
    .replace(/<[^>]*>?/g, " ")
    .replace(/["]/g, "")
    .replace(/[\n]/g, " ");
}

function mapJson(posts, recipes) {
  let totalPosts = posts.length; // so that we can continue the ids from there
  posts = posts
    .map(
      (post, index) =>
        `{ id: ${index}, title: "${post.title}", subtitle: "${
          post.subtitle
        }", slug: "${post.slug}", dateCreated: "${
          post.dateCreated
        }",  content: "${htmlToJson(post.content)}"},`
    )
    .join("");

  // TODO: get full recipe in content. For now, I only get a section of the ingredients.
  recipes = recipes
    .map(
      (recipe, index) =>
        `{ id: ${index + totalPosts}, title: "${recipe.title}", subtitle: "${
          recipe.subtitle
        }", slug: "${"/" + RECIPES_DIR + "/" + recipe.slug}", dateCreated: "${
          recipe.publishedOn
        }", content: "${recipe.intro} ${recipe.ingredients[0].ingMand.join(
          ", "
        )}"},`
    )
    .join("");
  return posts + recipes;
}

export default async function process() {
  try {
    const posts = await getPosts(POSTS_DIR, true);
    const recipes = await getRecipes(RECIPES_DIR);
    const postIndex = `export default [` + mapJson(posts, recipes) + `];`;
    writeFileSync(PUBLIC_DIR + "postIndex.js", postIndex, "utf8");
    console.log("Generated postIndex.js.");
  } catch (error) {
    throw new Error(`Failed to generate data: ${error}`);
  }
}
