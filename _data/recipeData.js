import fs from "fs";
import path from "path";

// Get JSON files from recipes directory
const recipesDir = path.resolve("recipes", "../src/recipes");

const recipes = fs
  .readdirSync(recipesDir)
  .filter((name) => path.extname(name) === ".json")
  .map((name) => ({
    key: path.parse(name).name,
    ...path.join(recipesDir, name),
  }));
export default recipes;
