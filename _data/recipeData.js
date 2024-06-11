const fs = require("fs");
const path = require("path");

// Get JSON files from recipes directory
const recipesDir = path.resolve(__dirname, "../src/recipes");

const recipes = fs
  .readdirSync(recipesDir)
  .filter((name) => path.extname(name) === ".json")
  .map((name) => ({
    key: path.parse(name).name,
    ...require(path.join(recipesDir, name)),
  }));

module.exports = recipes;
