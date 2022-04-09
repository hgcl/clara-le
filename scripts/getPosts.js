import { load } from "js-yaml";
import { cwd } from "process";
import { readdir, readFile } from "fs/promises";
const PAGES_DIR = `${cwd()}/pages`;

/**
 * Extracts frontmatter with `---` or `<!-- -->` delimiters from a string.
 * Inspired by vfile-matter: https://github.com/vfile/vfile-matter/
 */
function getFrontmatter(file) {
  const match =
    /^(?:---|<!--)(?:\r?\n|\r)(?:([\s\S]*?)(?:\r?\n|\r))?(?:---|-->)(?:\r?\n|\r|$)/.exec(
      file
    );
  if (match) {
    return load(match[1]);
  } else {
    return {};
  }
}

export default async function getPosts(dirCategory) {
  const files = await readdir(PAGES_DIR + "/" + dirCategory);
  const posts = await Promise.all(
    files.map(async (file) => {
      const content = await readFile(
        `${PAGES_DIR}/${dirCategory}/${file}`,
        "utf-8"
      );
      const frontmatter = getFrontmatter(content);
      return {
        title: frontmatter.title,
        subtitle: frontmatter.subtitle,
        dateCreated: frontmatter.dateCreated,
        dateModified: frontmatter.dateModified,
        durationMin: frontmatter.durationMin,
        slug: `/${dirCategory}/${file.replace(".md", "").replace(".html", "")}`,
      };
    })
  );
  return posts;
}
