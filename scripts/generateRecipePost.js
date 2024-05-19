/**
 * This script generates all recipes (in HTML) from the JSON notes.
 * Input: get all recipes as JSON
 * Output: generate recipes as HTML
 */
import { writeFileSync } from "fs";
const PAGES_DIR = `./pages`;
const RECIPES_DIR = "recipes";

function generateFrontmatter(file) {
  const frontmatter = `<!--
template: /templates/recipe-posts.html
title: "${file.title}"
dateCreated: "${file.dateCreated}"
durationMin: "${file.duration}"
dataTag: ["${file.dataTag.join(`","`)}"]
intro: "${file.intro}"
buildScript: "/scripts/formatPostDetails.js"
-->
`;
  return frontmatter;
}

function generateHtml(file) {
  const url = file.sourceUrl
    ? `<p class="subtle"><em>Adapted from this <a href="${file.sourceUrl}">original recipe</a></em></p>`
    : "";
  const ingredientList = file.ingredients[1] // There is a second section in the ingredient list (= simple recipe)
    ? file.ingredients
        .map(
          (i) =>
            `<h3>${i.ingTitle}</h3><ul>` +
            i.ingMand
              .map((j) => `<li class="p-ingredient">${j}</li>`)
              .join("") +
            i.ingOpt
              .map(
                (j) =>
                  `<li class="p-ingredient">${j}<span class="label">optional</span></li>`
              )
              .join("") +
            `</ul>`
        )
        .join("")
    : `<ul>` +
      file.ingredients[0].ingMand
        .map((i) => `<li class="p-ingredient">${i}</li>`)
        .join("") +
      file.ingredients[0].ingOpt
        .map(
          (i) =>
            `<li class="p-ingredient">${i}<span class="label">optional</span></li>`
        )
        .join("") +
      `</ul>`;
  const instructionList = file.instructions[1] // There is a second section in the instruction list (= simple recipe)
    ? file.instructions
        .map(
          (i) =>
            `<h3>${i.insTitle}</h3><ol>` +
            i.insSteps.map((j) => `<li>${j}</li>`).join("") +
            `</ol>`
        )
        .join("")
    : `<ol>` +
      file.instructions[0].insSteps.map((i) => `<li>${i}</li>`).join("") +
      `</ol>`;
  const noteList = file.notes
    ? file.notes.map((i) => `<p>${i}</p>`).join("")
    : "";
  const ingredientsHtml = `<section id="ingredients">
  <h2>Ingredients</h2>
  ${ingredientList}</section>`;
  const instructionsHtml = `<section class="e-instructions">
    <h2>Instructions</h2>
    ${instructionList}
    ${noteList}${url}
  </section>`;
  const html = `${ingredientsHtml}${instructionsHtml}`;
  return html;
}

export default async function process(recipes) {
  try {
    recipes.forEach((file) => {
      writeFileSync(
        `${PAGES_DIR}/${RECIPES_DIR}/${file.slug}.html`,
        generateFrontmatter(file) + generateHtml(file),
        "utf8"
      );
    });
    console.log("Generated recipes (html).");
  } catch (error) {
    throw new Error(`Failed to generate recipes posts in html: ${error}`);
  }
}
