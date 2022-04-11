import { categories, blogrollData } from "../data/blogroll.js";

export function buildPage(html) {
  const postsHtml = Object.values(categories)
    .map(
      (cat) =>
        `<h2 id=${cat.anchor}>${cat.title}</h2>` +
        `<ul>` +
        blogrollData
          .filter((item) => item.category.includes(cat.anchor))
          .map(
            (item) =>
              `<li><a href="${item.url}">${item.title}</a>&emsp;<span class="subtle">${item.description}</span></li>`
          )
          .join("") +
        `</ul>`
    )
    .join("");
  return html.replace("<div>Data generated here</div>", postsHtml);
}
