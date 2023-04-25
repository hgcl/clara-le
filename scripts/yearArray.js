export default function yearArray(startYear) {
  const currentYear = new Date(Date.now()).getFullYear();
  let yearArray = [];
  for (let i = currentYear; i >= startYear; i--) {
    yearArray.push(new Date(i, 1, 1).getFullYear());
  }
  return yearArray;
}
