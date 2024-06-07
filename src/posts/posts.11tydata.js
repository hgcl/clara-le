// Applies to all files in this posts directory
// Source docs: https://www.11ty.dev/docs/data-computed/
module.exports = {
  eleventyComputed: {
    // Generate post creation year automatically from dateCreated frontmatter
    yearCreated: (data) => new Date(data.date).getFullYear(),
  },
  layout: "layout/post.njk",
  tags: "posts",
  directory: "posts",
};
