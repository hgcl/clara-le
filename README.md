# Documenting how clarale.com is built within Eleventy

## eleventy.config.js

`eleventy.config` is kept at the root of the project. It is the main configuration file of an Eleventy project. It defines which directories are made public, which are used for input and output data.

## Layouts

Eleventy **Layouts** are special templates that can be used to wrap other content. This website uses two layouts:

- `_includes/layout/base.njk`: The top level HTML structure that wraps all pages.
- `_includes/layout/post.njk`: The post template (wrapped inside of `base.njk`). It is used for generic posts with a `post-header.njk` at the top, footnotes support and a comment section at the bottom.

<!-- TODO complete readme -->
