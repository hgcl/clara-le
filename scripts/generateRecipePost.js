/**
 * This script generates the recipe overview from the JSON notes.
 */

import { readdirSync, readFileSync, writeFileSync } from "fs";
import * as path from "path";

const RECIPES_DIR = "./pages/recipes/";
const PUBLIC_DIR = "./public/";
const SITE_URL = "https://clarale.com";

function generateFrontmatter(file) {
  const frontmatter = `<!--
template: /templates/recipe-posts.html
title: "${file.title}"
dateCreated: "${file.publishedOn}"
durationMin: "${file.duration}"
dataTag: "${file.dataTag.join(" ")}"
buildScript: "/scripts/formatPostDetails.js"
-->
`;
  return frontmatter;
}

function generateHtml(file) {
  const intro = file.intro ? `<p class="intro">${file.intro}</p>` : "";
  const url = file.recipeUrl
    ? `<p class="label"><a href="${file.recipeUrl}">Link to original recipe</a></p>`
    : "";
  const ingredientList = file.ingredients[1] // There is a second section in the ingredient list (= simple recipe)
    ? file.ingredients
        .map(
          (i) =>
            `<p>${i.ingTitle}</p><ul>` +
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
  <h2 class="sr-only">Ingredients</h2>
  ${ingredientList}${url}</section>`;
  const instructionsHtml = `<section class="e-instructions">
    <h2>Instructions</h2>
    ${instructionList}
    ${noteList}
  </section>`;
  const html = intro + `<div>${ingredientsHtml}${instructionsHtml}</div>`;
  return html;
}

function getRecipes(files) {
  const recipesArray = files.map((file) => {
    const str = JSON.parse(readFileSync(RECIPES_DIR + file, "utf8"));
    return {
      slug: file.replace(".json", ""),
      title: str.title,
      publishedOn: str.publishedOn,
      dataTag: str.dataTag,
      intro: str.intro,
      duration: str.duration,
      ingredients: str.ingredients,
      instructions: str.instructions,
      notes: str.notes,
      recipeUrl: str.recipeUrl,
    };
  });
  return recipesArray;
}

export default async function process() {
  const files = readdirSync(RECIPES_DIR).filter(
    (i) => path.extname(i) === ".json"
  );
  const recipes = getRecipes(files);
  recipes.forEach((file) => {
    writeFileSync(
      `${RECIPES_DIR}/${file.slug}.html`,
      generateFrontmatter(file) + generateHtml(file),
      "utf8"
    );
  });
  console.log("Generated recipes");
}
