/**
 * This script gets the data from the recipes posts in JSON
 */

import { readdir, readFile } from "fs/promises";
import * as path from "path";
const PAGES_DIR = `./pages`;

export default async function getRecipes(dirCategory) {
  const files = await readdir(PAGES_DIR + "/" + dirCategory);
  const recipes = await Promise.all(
    files
      .filter((i) => path.extname(i) === ".json")
      .map(async (file) => {
        const str = JSON.parse(
          await readFile(`${PAGES_DIR}/${dirCategory}/${file}`, "utf-8")
        );
        return {
          slug: file.replace(".json", ""),
          title: str.title,
          dateCreated: str.dateCreated,
          dataTag: str.dataTag,
          intro: str.intro,
          duration: str.duration,
          ingredients: str.ingredients,
          instructions: str.instructions,
          notes: str.notes,
          sourceUrl: str.sourceUrl,
        };
      })
  );
  return recipes;
}
