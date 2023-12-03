import { categories, blogrollData } from "../data/blogroll.js";

export function buildPage(html) {
  try {
    const postsHtml = Object.values(categories)
      .map(
        (cat) =>
          `<h2 id=${cat.anchor}>${cat.title}</h2>` +
          `<ul class="post-rows">` +
          blogrollData
            .filter((item) => item.category.includes(cat.anchor))
            .map(
              (item) =>
                `<li><a href="${item.url}">${item.title}</a><span class="subtle">${item.description}</span></li>`
            )
            .join("") +
          `</ul>`
      )
      .join("");
    const linkArray = Object.values(blogrollData)
      .map((item) => `${item.url}`)
      .join(`","`);
    return html
      .replace("<div>Data generated here</div>", postsHtml)
      .replace(`<script>`, `<script>let linkArray = ["` + linkArray + `"];`);
  } catch (error) {
    throw new Error(`Failed to build page: ${error}`);
  }
}
