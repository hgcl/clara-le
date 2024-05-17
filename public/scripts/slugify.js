export function slugify(str) {
  return (
    str
      .toLowerCase()
      .trim()
      // remove accents from charaters
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      // replace invalid chars with spaces
      .replace(/[^a-z0-9\s-]/g, " ")
      .trim()
      // replace multiple spaces or hyphens with a single hyphen
      .replace(/[\s-]+/g, "-")
  );
}
