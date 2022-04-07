export default function minToHours(mins) {
  let h = Math.floor(mins / 60);
  let m = mins % 60;
  m = m < 10 ? "0" + m : m; // (or alternatively) m = String(m).padStart(2, '0')

  let finalTime;
  finalTime = h === 0 ? `${m} min` : `${h} h ${m}`;
  return finalTime;
}
