// TODO: make this remotely configurable somehow

const Terms2025: Term[] = [
  {
    date: new Date(2025, 1, 9), // Sunday Week 1, Term 1, 2025
    weeks: 10,
  },
  {
    date: new Date(2025, 3, 27), // Sunday Week 0, Term 2, 2025
    weeks: 10,
  },
  {
    date: new Date(2025, 6, 27), // Sunday Week 1, Term 3, 2025
    weeks: 10,
  },
  {
    date: new Date(2025, 9, 19), // Sunday Week 1, Term 4, 2025
    weeks: 10,
  },
];

function getTermIndex() {
  const date = new Date();

  for (let i = 0; i < Terms2025.length; i++) {
    if (i + 1 == Terms2025.length) return i;

    const next = Terms2025[i + 1].date;
    if (date < next) return i;
  }

  return Terms2025.length - 1;
}

export function getCurrentTerm() {
  const term = Terms2025[getTermIndex()];
  console.log(`Term found, starting on: ${term.date}`);
  return term;
}
export const getNextTerm = () => Terms2025[getTermIndex() + 1];

export type Term = { date: Date; weeks: number };
export default Terms2025;
