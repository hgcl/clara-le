import * as fs from "fs";

// Define Cache Location and API Endpoint
const CACHE_DIR = "_data";
const API = "https://webmention.io/api";
const TOKEN = "-NDGL2FFSCZ-A4OCkl58fg";
const DOMAIN = "clarale.com";

// WARNING: lodash replacement
// https://youmightnotneed.com/lodash/
const unionBy = (arr, ...args) => {
  let iteratee = args.pop();
  if (typeof iteratee === "string") {
    const prop = iteratee;
    iteratee = (item) => item[prop];
  }
  return arr
    .concat(...args)
    .filter(
      (x, i, self) => i === self.findIndex((y) => iteratee(x) === iteratee(y))
    );
};

async function fetchWebmentions(since, perPage = 10000) {
  if (!DOMAIN) {
    // If we don't have a domain name, abort
    console.warn(
      ">>> unable to fetch webmentions: no domain name specified in site.json"
    );
    return false;
  }

  if (!TOKEN) {
    // If we don't have a domain access token, abort
    console.warn(
      ">>> unable to fetch webmentions: no access token specified in environment."
    );
    return false;
  }

  let url = `${API}/mentions.jf2?domain=${DOMAIN}&token=${TOKEN}&per-page=${perPage}`;
  if (since) url += `&since=${since}`;

  const response = await fetch(url);
  if (response.ok) {
    const feed = await response.json();
    console.log(
      `>>> ${feed.children.length} new webmentions fetched from ${API}`
    );
    return feed;
  }

  return null;
}

// Merge fresh webmentions with cached entries, unique per id
function mergeWebmentions(a, b) {
  return unionBy(a.children, b.children, "wm-id");
}

// save combined webmentions in the cache file
function writeToCache(data) {
  const filePath = `${CACHE_DIR}/webmentions.json`;
  const fileContent = JSON.stringify(data, null, 2);
  // create cache folder if it doesn't exist already
  if (!fs.existsSync(CACHE_DIR)) {
    fs.mkdirSync(CACHE_DIR);
  }
  // write data to cache json file
  fs.writeFile(filePath, fileContent, (err) => {
    if (err) throw err;
    console.log(`>>> webmentions cached to ${filePath}`);
  });
}

// get cache contents from json file
function readFromCache() {
  const filePath = `${CACHE_DIR}/webmentions.json`;

  if (fs.existsSync(filePath)) {
    const cacheFile = fs.readFileSync(filePath);
    const cachedWebmentions = JSON.parse(cacheFile);

    // merge cache with wms for legacy domain
    return {
      lastFetched: cachedWebmentions.lastFetched,
      children: cachedWebmentions.children,
    };
  }

  // no cache found.
  return {
    lastFetched: null,
    children: {},
  };
}

async function saveWebmentions() {
  try {
    const cache = readFromCache();

    if (cache.children.length) {
      console.log(`>>> ${cache.children.length} webmentions loaded from cache`);
    }

    const feed = await fetchWebmentions(cache.lastFetched);
    if (feed) {
      const webmentions = {
        lastFetched: new Date().toISOString(),
        children: mergeWebmentions(cache, feed),
      };
      writeToCache(webmentions);
      return webmentions;
    }
    return cache;
  } catch {}
}

await saveWebmentions();
