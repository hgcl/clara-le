export function minToHours(mins) {
  let h = Math.floor(mins / 60);
  let m = mins % 60;
  m = m < 10 ? "0" + m : m; // (or alternatively) m = String(m).padStart(2, '0')

  let finalTime;
  finalTime = h === 0 ? `${m} min` : `${h} h ${m}`;
  return finalTime;
}

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
