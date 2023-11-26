/**
 * This script generates postIndex.js (all post index)
 * that is used for the search feature
 */

import getPosts from "./getPosts";

export default async function process() {
  const posts = await getPosts("posts", true);
  console.log(posts);
}
