/**
 * This script generates scripts/postIndex.js (all post index) that is used for the search feature
 * Input: all posts data
 * Output: postIndex.js
 */

import { writeFileSync } from "fs";
const POST_INDEX_PATH = `./public/scripts/postIndex.js`;
const RECIPES_DIR = `recipes`;

function htmlToJson(html) {
  return html
    .replace(/<[^>]*>?/g, " ")
    .replace(/["]/g, "")
    .replace(/[\n]/g, " ");
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function mapJson(blogPosts, learningPosts, mediaPosts, recipePosts) {
  let allPosts = blogPosts.concat(learningPosts).concat(mediaPosts); // concat all articles that follow the same original JSON structure
  let postsNumber = allPosts.length; // so that we can continue the ids from there
  allPosts = allPosts
    .map(
      (post, index) =>
        `{ id: ${index}, directory: "${
          post.directory === "posts"
            ? "Musings"
            : capitalizeFirstLetter(post.directory)
        }", title: "${post.title}", ${
          post.subtitle ? `subtitle: "${post.subtitle}", ` : ""
        }slug: "${post.slug}", dateCreated: "${
          post.dateCreated
        }",  content: "${htmlToJson(post.content)}"},`
    )
    .join("");

  // TODO: get full recipe in content. For now, I only get a section of the ingredients.
  recipePosts = recipePosts
    .map(
      (recipe, index) =>
        `{ id: ${index + postsNumber}, directory: "Recipes", title: "${
          recipe.title
        }", slug: "${"/" + RECIPES_DIR + "/" + recipe.slug}", dateCreated: "${
          recipe.dateCreated
        }", content: "${recipe.intro} ${recipe.ingredients[0].ingMand.join(
          ", "
        )}"},`
    )
    .join("");
  return allPosts + recipePosts;
}

export default async function process(
  blogPosts,
  learningPosts,
  mediaPosts,
  recipePosts
) {
  try {
    const postIndex =
      `export default [` +
      mapJson(blogPosts, learningPosts, mediaPosts, recipePosts) +
      `];`;
    writeFileSync(POST_INDEX_PATH, postIndex, "utf8");
    console.log("Generated postIndex.js.");
  } catch (error) {
    throw new Error(`Failed to generate postIndex.js data: ${error}`);
  }
}
