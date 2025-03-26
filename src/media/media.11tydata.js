// Applies to all files in this posts directory
// Source docs: https://www.11ty.dev/docs/data-computed/
const mediaData = {
  eleventyComputed: {
    // Generate post creation year automatically from date frontmatter
    yearCreated: (data) => new Date(data.date).getFullYear(),
  },
  layout: "layout/post.njk",
  tags: "media",
  directory: "media",
};
export default mediaData;
