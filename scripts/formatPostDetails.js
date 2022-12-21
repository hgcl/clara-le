import minToHours, { minToDurationString } from "./minToHours";

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
      .replace(
        // the closing span ensures we replace the correct occurrence of durationMin (otherwise e.g. "120" may be found in other places)
        `</span> ${frontmatter.durationMin}`,
        `</span> <time datetime="${minToDurationString(
          frontmatter.durationMin
        )}">${minToHours(frontmatter.durationMin)}</time>`
      );
  } catch (error) {
    throw new Error(`Failed to build page: ${error}`);
  }
}
