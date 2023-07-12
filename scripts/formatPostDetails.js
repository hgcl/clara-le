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
    function linkReplacer(match, p1, p2, p3, p4, p5, p6, offset, string) {
      let newString = `class="${p1}-data-tags"><a href="/${p1}s/?q=${p2}">${p2}</a>`;
      const capturingGroups = [p3, p4, p5, p6];
      capturingGroups.forEach(function (p) {
        if (p) {
          newString = newString + `, <a href="/${p1}s/?q=${p}">${p}</a>`;
        }
      });
      return newString;
    }
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
        // Make footnotes label visible
        .replace(
          `<h2 id="footnote-label" class="sr-only">Footnotes</h2>`,
          `<h2 id="footnote-label" class="label">Footnotes</h2>`
        )
        // Make sure all commas are followed by a whitespace
        .replace(/(,(?=\S))/g, ", ")
        // Add links to data tags (max 5)
        .replace(
          /class\="(recipe|post)-data-tags"\>(\w+)(?:.\s)?(\w+)?(?:.\s)?(\w+)?(?:.\s)?(\w+)?(?:.\s)?(\w+)?/g,
          linkReplacer
        )
    );
  } catch (error) {
    throw new Error(`Failed to build page: ${error}`);
  }
}
