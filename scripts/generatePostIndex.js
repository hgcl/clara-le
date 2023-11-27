/**
 * This script generates postIndex.js (all post index)
 * that is used for the search feature
 */

import getPosts from "./getPosts.js";
import { writeFileSync } from "fs";
const NOTES_DIR = "posts";
const PUBLIC_DIR = "./public/";

export default async function process() {
  try {
    const posts = await getPosts(NOTES_DIR, true);
    const postIndex =
      `export default [` +
      posts
        .map(
          (post, index) =>
            `{ id: ${index}, title: "${post.title}", subtitle: "${post.subtitle}", slug: "${post.slug}", dateCreated: "${post.dateCreated}"},`
        )
        .join("") +
      `];`;
    console.log(postIndex);
    writeFileSync(PUBLIC_DIR + "postIndex.js", postIndex, "utf8");
    console.log("Generated postIndex.js.");
  } catch (error) {
    throw new Error(`Failed to generate data: ${error}`);
  }
}
