/**
 * This script generates an RSS2 feed from the markdown notes.
 */

import { writeFileSync } from "fs";
import getPosts from "./getPosts.js";
import { Feed } from "feed";

const NOTES_DIR = "posts";
const PUBLIC_DIR = "./public/";
const SITE_URL = "https://clarale.com";

/**
 * @typedef {Object} Note
 *
 * @property {string} title
 * @property {string} subtitle
 * @property {Date} dateCreated
 * @property {string} url
 * @property {string} content
 */

/**
 * @param {Note[]} notes An array of notes to turn into a feed
 * @return {string} RSS feed as a string
 */
function generateFeed(notes) {
  const lastNoteDate = notes[0].dateCreated;
  const feed = new Feed({
    title: "Clara Le",
    description: "Clara's RSS feed",
    id: SITE_URL,
    link: SITE_URL,
    language: "en",
    updated: new Date(lastNoteDate),
    copyright: "",
    author: {
      name: "Clara Le",
      email: "hey@clarale.com",
      link: SITE_URL,
    },
  });

  notes.forEach((note) => {
    const url = SITE_URL + note.slug;
    const content = `<a href="${url}">${note.title}</a>`;
    feed.addItem({
      title: note.title,
      id: url,
      link: url,
      description: note.subtitle,
      content: content,
      date: note.date,
      author: [
        {
          name: "Clara Le",
          email: "hey@clarale.com",
          link: SITE_URL,
        },
      ],
    });
  });
  return feed.rss2();
}

export default async function process() {
  try {
    const notes = await getPosts(NOTES_DIR);
    const filteredNotes = notes
      .filter((note) => !note.dataTag.includes("tiny")) // excludes tiny notes from RSS
      .sort(
        (a, b) =>
          new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime()
      )
      .slice(0, 15); // limit to 15 posts
    const feed = generateFeed(filteredNotes);
    writeFileSync(PUBLIC_DIR + "feed.xml", feed, "utf8");
    console.log("Generated RSS feed.");
  } catch (error) {
    throw new Error(`Failed to generate data: ${error}`);
  }
}
