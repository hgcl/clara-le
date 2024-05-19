import getPosts from "./getPosts.js";

const NOTES_DIR = "posts";

export default async function getAllPosts() {
  try {
    let notes = await getPosts(NOTES_DIR);
    console.log("Got all posts.");
    return notes;
  } catch (error) {
    throw new Error(`Failed to get data: ${error}`);
  }
}
