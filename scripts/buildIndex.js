export function buildPage(html) {
  try {
    let statsHtml = `<p>Test here</p>`;
    return html.replace(`<p>Stats</p>`, statsHtml);
  } catch (error) {
    throw new Error(`Failed to build page: ${error}`);
  }
}
