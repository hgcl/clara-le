# Documenting how clarale.com is built within Eleventy

## eleventy.config.js

`eleventy.config` is kept at the root of the project. It is the main configuration file of an Eleventy project. It defines which directories are made public, which are used for input and output data.

## src

The `src` directory at the root of the project is defined as the main input directory. All pages that are built are kept in it or in one of its subdirectories.

### Pages built under `src` directly

Nav-related:

- `src/about.njk`
- `src/blogroll.njk`: paginates data in `_data/blogrollData.js` as one final page
- `src/colophon.njk`
- `src/index.njk`: homepage
- `src/learning.njk`: shows all learning posts as one final page
- `src/media.njk`
- `src/now.njk`
- `src/posts.njk`
- `src/recipes.njk`: paginates links to individual recipe posts
- `src/uses.njk`

Other special cases:

- `src/search.njk`: fallback search page used if the user disabled Javascript
- `src/search-index.njk`: template creating the search index JSON file
- `src/feed.njk`: template creating the RSS feed `/feed.xml`

### Subdirectories of `src`

Content-related directories:

- `src/learning`: includes all learning posts that make up `clarale.com/learning/`
- `src/media`: includes all media posts that are linked in `clarale.com/media/`
- `src/posts`: includes all blog posts that are linked in `clarale.com/posts/`
- `src/recipes`: includes all recipe posts that are linked in `clarale.com/recipes/`. The original files are in JSON. They are read by `_data/recipeData.js` and paginated through the `src/recipes/recipe-layout.njk` template.

Special directories:

- `src/_data`: stores [global data files](https://www.11ty.dev/docs/data-global/) that we can access from anywhere in the project
- `src/_includes`: stores everything that is template-related.
  - `layout`: a layout is a template that wraps other content
  - `macro`: a macro is a snippet that can be injected in a page or template, its content can be defined when injecting it
  - regular includes files: similar to macros, but their content cannot be changed
- `src/img`: stores all images
- `src/styles`: stores all CSS files

## Layouts

Eleventy **Layouts** are special templates that can be used to wrap other content. This website uses two layouts:

- `_includes/layout/base.njk`: The top level HTML structure that wraps all pages.
- `_includes/layout/post.njk`: The post template (wrapped inside of `base.njk`). It is used for generic posts with a `post-header.njk` at the top, footnotes support and a comment section at the bottom.
