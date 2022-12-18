import minToHours from "./minToHours";

export async function buildPage(html, frontmatter) {
  try {
    return html
      .replace(
        // we include the html <> tags to avoid replacing the datetime attribute value
        `>${frontmatter.dateCreated}<`,
        `>${new Date(frontmatter.dateCreated).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}<`
      )
      .replace(frontmatter.durationMin, minToHours(frontmatter.durationMin));
  } catch (error) {
    throw new Error(`Failed to build page: ${error}`);
  }
}
