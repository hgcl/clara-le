/**
 * This script generates an RSS2 feed from the markdown notes.
 */

import { readdirSync, readFileSync, writeFileSync } from "fs";
import matter from "gray-matter";
import { Feed } from "feed";

const NOTES_DIR = "./pages/posts/";
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
  const lastNoteDate = notes[0].date;
  const feed = new Feed({
    title: "Clara Le",
    description: "Clara's Feed",
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
    feed.addItem({
      title: note.title,
      id: note.url,
      link: note.url,
      description: note.subtitle,
      content: note.content,
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

function getNotes(files) {
  return files.map((file) => {
    const str = readFileSync(NOTES_DIR + file, "utf8");
    const frontmatter = matter(str).data;
    const { title, subtitle, dateCreated, dataTag } = frontmatter;
    const slug = `/posts/${file.replace(".md", "")}/`;
    const url = SITE_URL + slug;
    return {
      title,
      date: new Date(dateCreated),
      url,
      subtitle,
      content: `<a href="${url}">${frontmatter.title}</a>`,
      dataTag,
    };
  });
}

export default async function process() {
  const files = readdirSync(NOTES_DIR);
  const notes = getNotes(files);
  const filteredNotes = notes
    .filter((note) => !note.dataTag.includes("tiny")) // excludes tiny notes from RSS
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 50); // limit to 50 posts
  const feed = generateFeed(filteredNotes);
  writeFileSync(PUBLIC_DIR + "feed.xml", feed, "utf8");
  console.log("Generated RSS feed.");
}
