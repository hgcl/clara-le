---
title: "Word frequency"
subtitle: ""
date: "2026-01-01"
tags: ["digital"]
lang: "en"
draft: true
---

```js
import * as fs from "fs/promises";

const DIR_PATH = "./src/posts/";
const WORDS_TO_IGNORE = ["endchar"];
const WORD_MAX_LENGTH = 3;
const MIN_FREQUENCY = 7;
// set to true if we want to remove the final "s"
const REMOVE_FINAL_S = false;

async function readFiles(directoryPath) {
  const fileList = await fs.readdir(directoryPath);

  let contentArray = [];
  for await (let filename of fileList) {
    const response = await fs.readFile(directoryPath + filename, "utf-8");
    contentArray.push(response);
  }

  return contentArray.slice(0, 3);
}

function mapWordFrequency(contentArray) {
  let transformedWords = [];
  for (let index in contentArray) {
    // TODO filter out frontmatter
    transformedWords.push(
      contentArray[index]
        .replace(/(<([^>]+)>)/g, "") // remove HTML tags
        .replace(/(?<=\[.*?\])\(.*?\)/g, "") // remove Markdown links
        .toLowerCase()
        .match(/\b\w+\b/g) // divide into words
    );
  }
  transformedWords = transformedWords.flat(Infinity);

  // Count words and create frequency map object
  const frequencyMap = transformedWords.reduce((acc, word) => {
    if (word.length > WORD_MAX_LENGTH && !WORDS_TO_IGNORE.includes(word)) {
      if (word.slice(-1) === "s" && REMOVE_FINAL_S) {
        word = word.slice(0, -1);
      }
      acc[word] = (acc[word] || 0) + 1;
    }
    return acc;
  }, {});

  // Sort frequency map from word least used to most used, and shorten final list
  const sortedWords = Object.entries(frequencyMap)
    .sort(([, a], [, b]) => a - b)
    .filter(([, value]) => value >= MIN_FREQUENCY)
    .reduce((r, [key, value]) => ({ ...r, [key]: value }), {});

  console.log(sortedWords);
  return sortedWords;
}

mapWordFrequency(await readFiles(DIR_PATH));
```
