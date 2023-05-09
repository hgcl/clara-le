// Outputs <time> datetime attribute friendly string
export function minToDurationString(mins) {
  let h = Math.floor(mins / 60);
  let m = mins % 60;

  let finalTime;
  finalTime =
    h === 0 && m > 0 ? `${m}M` : h > 0 && m === 0 ? `${h}H` : `${h}H${m}M`;
  return `PT${finalTime}`;
}

export async function buildPage(html, frontmatter) {
  try {
    return (
      html
        // we include the html <> tags to avoid replacing the datetime attribute value
        .replace(
          `>${frontmatter.dateCreated}<`,
          `>${new Date(frontmatter.dateCreated).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}<`
        )
    );
  } catch (error) {
    throw new Error(`Failed to build page: ${error}`);
  }
}
