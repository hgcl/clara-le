export async function buildPage(html, frontmatter) {
  try {
    return html.replace(
      `>${frontmatter.dateCreated}<`,
      `>${new Date(frontmatter.dateCreated).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })}<`
    );
  } catch (error) {
    throw new Error(`Failed to build page: ${error}`);
  }
}
