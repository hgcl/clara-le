// Applies to all files in this posts directory
// Source docs: https://www.11ty.dev/docs/data-computed/
const postsData = {
  eleventyComputed: {
    // Generate post creation year automatically from date frontmatter
    yearCreated: (data) => new Date(data.date).getFullYear(),
  },
  layout: "layout/post.njk",
  tags: "posts",
  directory: "posts",
};
export default postsData;
