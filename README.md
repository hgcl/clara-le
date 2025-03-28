# Documenting how clarale.com is built within Eleventy

Among other things, here are some important directories and files at the root of the repo:

- `eleventy.config.js`
- `src`
- `public`
- `_data`
- `_config`
- `_includes`

## `eleventy.config.js` file

`eleventy.config` is kept at the root of the project. It is the main configuration file of an Eleventy project. It defines which directories are made public, which are used for input and output data.

## `src` directory

The `src` directory at the root of the project is defined as the main input directory. All pages that are built are kept in it or in one of its subdirectories.

### Pages built under `src` directly

Nav-related:

- `src/index.njk`: homepage
- `src/about.njk`
- `src/colophon.njk`
- `src/now.njk`
- `src/uses.njk`
- `src/media.njk`
- `src/posts.njk`
- `src/blogroll.njk`: paginates individual files in `src/blogroll` as one final page (data collated through `_data_/blogrollData.js`)
- `src/bookmarks.njk`: paginates individual files in `src/bookmarks` as one final page (data collated through `_data_/bookmarkData.js`)
- `src/recipes.njk`: paginates individual files in `src/bookmarks` as one final page (data collated through `_data_/recipeData.js`)

Other special cases:

- `src/search.njk`: fallback search page used if the user disabled Javascript
- `src/search-data.njk`: template creating the search data JSON file
- `src/feed.njk`: template creating the RSS feed `/feed.xml`

### Subdirectories of `src`

- `src/media`: includes all media posts that are linked in `clarale.com/media/`
- `src/posts`: includes all blog posts that are linked in `clarale.com/posts/`
- `src/recipes`: includes all recipe posts that are linked in `clarale.com/recipes/`. The original files are in JSON. They are read by `_data/recipeData.js` and paginated through the `src/recipes/recipe-layout.njk` template.
- `src/bookmarks` and `src/blogroll` contain the individual post files that will be collated to create the "Bookmarks" and "Blogroll" pages

## `public` directory

The `public` directory is published as-is and can be accessed from the client.

- `public/img`: stores all images
- `public/styles`: stores all CSS files

## `_data`, `_config`, `_functions` directories

- `_data`: stores [global data files](https://www.11ty.dev/docs/data-global/) that we can access from anywhere in the project
  - The contained files `recipeData.js`, `blogrollData.js`, `bookmarkData.js` use the same code
- `_config`: stores custom-made filters and plugins used in the project
- `_functions`: stores functions that are used during the project build

## `_includes` directory

The `_includes` directory stores everything that is template-related. It contains regular NJK files that can be injected in pages and templates. It also has two subdirectories of more specialized template-files:

- `layout`: a layout is a template that wraps other content. This website uses two different layouts:
  - `_includes/layout/base.njk`: The top level HTML structure that wraps all pages.
  - `_includes/layout/post.njk`: The post template (wrapped inside of `base.njk`). It is used for generic posts with a `post-header.njk` at the top, footnotes support and a comment section at the bottom.
- `macro`: a macro is a snippet that can be injected in a page or template, its content can be defined when injecting it
