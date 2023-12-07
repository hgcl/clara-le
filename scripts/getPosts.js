import { load } from "js-yaml";
import { readdir, readFile } from "fs/promises";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import { minify as minifier } from "html-minifier-terser";
import * as path from "path";
const PAGES_DIR = `./pages`;

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
    const frontmatter = load(match[1]);
    const content = file.slice(match[0].length);
    return { frontmatter, content };
  } else {
    return {};
  }
}

/**
 * Parse the file into an AST, transform with unified plugins,
 * and convert back into html.
 */
function processMarkdown(file) {
  return (
    unified()
      /**
       * `remark-parse` parses the markdown source to mdast.
       * https://github.com/remarkjs/remark/tree/main/packages/remark-parse
       */
      .use(remarkParse)
      /**
       * `remark-gfm` adds support for GitHub Flavored Markdown, including
       * tables and footnotes.
       * https://github.com/remarkjs/remark-gfm
       */
      .use(remarkGfm)
      /**
       * `remark-rehype` transforms the mdast into hast.
       * https://github.com/remarkjs/remark-rehype
       */
      .use(remarkRehype, { allowDangerousHtml: true })
      /**
       * `rehype-stringify` transforms the hast into HTML.
       * https://github.com/rehypejs/rehype/tree/main/packages/rehype-stringify
       */
      .use(rehypeStringify, { allowDangerousHtml: true })
      .process(file)
      .then((vfile) => String(vfile))
  );
}

/**
 * Minify an HTML string using html-minifier-terser.
 */
async function minify(html) {
  return minifier(html, {
    collapseWhitespace: true,
    removeComments: true,
    collapseBooleanAttributes: true,
    useShortDoctype: true,
    removeEmptyAttributes: true,
    removeOptionalTags: true,
    minifyJS: true,
  });
}

/**
 * Word counter
 */
function countWords(article) {
  return article.trim().split(/\s+/).length;
}

export default async function getPosts(dirCategory, withPostContent = false) {
  const files = await readdir(PAGES_DIR + "/" + dirCategory);
  const posts = await Promise.all(
    files
      .filter((i) => path.extname(i) !== ".json")
      .map(async (file) => {
        const fileContent = await readFile(
          `${PAGES_DIR}/${dirCategory}/${file}`,
          "utf-8"
        );
        let html = "";
        const { frontmatter, content } = getFrontmatter(fileContent);
        if (withPostContent == true) {
          html = await processMarkdown(content);
          html = await minify(html);
        }
        return {
          title: frontmatter.title,
          subtitle: frontmatter.subtitle,
          author: frontmatter.author,
          cover: frontmatter.cover,
          dateCreated: frontmatter.dateCreated,
          dateModified: frontmatter.dateModified,
          durationMin: frontmatter.durationMin,
          dataTag: frontmatter.dataTag,
          year: frontmatter.year,
          directory: dirCategory,
          slug: `/${dirCategory}/${file
            .replace(".md", "")
            .replace(".html", "")}`,
          content: html,
          sourceUrl: frontmatter.sourceUrl,
          wordCount: countWords(content),
        };
      })
  );
  return posts;
}
