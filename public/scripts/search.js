import documents from "/scripts/postIndex.js";

// Select DOM elements
export const dialogSearch = document.querySelector("#search-dialog");
export const showSearchBtn = document.querySelector("#show-search");
export const closeSearchBtn = document.querySelector(
  "#search-dialog .close-button"
);
const searchInput = document.querySelector("#search-bar");
const resultList = document.querySelector(".result-list");

// Stop words to be ignored
// prettier-ignore
let stopWords = new Set([ "a", "about", "above", "after", "again", "against", "all", "am", "an", "and", "any", "are", "as", "at", "be", "because", "been", "before", "being", "below", "between", "both", "but", "by", "could", "did", "do", "does", "doing", "down", "during", "each", "few", "for", "from", "further", "had", "has", "have", "having", "he", "he'd", "he'll", "he's", "her", "here", "here's", "hers", "herself", "him", "himself", "his", "how", "how's", "i", "i'd", "i'll", "i'm", "i've", "if", "in", "into", "is", "it", "it's", "its", "itself", "let's", "me", "more", "most", "my", "myself", "nor", "of", "on", "once", "only", "or", "other", "ought", "our", "ours", "ourselves", "out", "over", "own", "same", "she", "she'd", "she'll", "she's", "should", "so", "some", "such", "than", "that", "that's", "the", "their", "theirs", "them", "themselves", "then", "there", "there's", "these", "they", "they'd", "they'll", "they're", "they've", "this", "those", "through", "to", "too", "under", "until", "up", "very", "was", "we", "we'd", "we'll", "we're", "we've", "were", "what", "what's", "when", "when's", "where", "where's", "which", "while", "who", "who's", "whom", "why", "why's", "with", "would", "you", "you'd", "you'll", "you're", "you've", "your", "yours", "yourself", "yourselves", ]);

// Set up minisearch
let miniSearch = new MiniSearch({
  fields: ["title", "content"], // fields to index for full-text search
  storeFields: [
    "title",
    "subtitle",
    "directory",
    "slug",
    "dateCreated",
    "content",
  ], // fields to return with search results
  processTerm: (term) => (stopWords.has(term) ? null : term.toLowerCase()), // index term processing
  searchOptions: {
    boost: { title: 2 }, // Boost some fields (here "title")
    fuzzy: 0.2, // Fuzzy search, with a max edit distance of 0.2 * term length
    prefix: true, // Prefix search (so that 'moto' will match 'motorcycle')
  },
});

// Fetch and index all documents
miniSearch.addAll(documents);

const getSearchResults = (query) => {
  return miniSearch.search(query);
};

const renderSearchResults = (results) => {
  resultList.innerHTML = results
    .map(({ title, subtitle, slug, dateCreated, directory }) => {
      return `<li>
            <span class="label">${directory}</span>
              <span class="details">
                <a href="${slug}">${title}</a>
                <span class="subtle divide-list">
                  <time class="dt-duration" datetime="${dateCreated}">${dateCreated}</time>
                  ${subtitle ? `<span>${subtitle}</span>` : ""}
                </span>
              </span>
          </li>`;
    })
    .join("\n");
};

export function search(event) {
  // Typing into search bar updates search results and suggestions
  event.preventDefault(); // prevents search input being cleared on submit
  const query = searchInput.value;
  const results = query.length > 1 ? getSearchResults(query) : [];
  renderSearchResults(results);
}
