// TODO: make this remotely configurable somehow

const SundaySeasons: Term[] = [
  {
    date: new Date(2026, 1, 8), // Term 1, feb 8th, 2026
    weeks: 10,
  },
  {
    date: new Date(2026, 3, 5), // Term 2, april 5th, 2026
    weeks: 10,
  },
  {
    date: new Date(2026, 6, 4), // Term 3, july 4th, 2026
    weeks: 10,
  },
  {
    date: new Date(2026, 9, 19), // Term 4 TBC
    weeks: 10,
  },
];

// 2026 first season spans both term 1 and term 2 - second seasons dates are still TBC
const AdultSeasons: Term[] = [
  {
    date: new Date(2026, 1, 4), // Sunday Feb 8, 2026
    weeks: 10,
  },
  {
    date: new Date(2026, 6, 8), // Sunday July 4, 2026
    weeks: 10,
  },
];

function getSeason(isAdultcomp: boolean): Term[] {
  return isAdultcomp ? AdultSeasons : SundaySeasons;
}

function getTermIndex(isAdultComp: boolean) {
  const date = new Date();
  const terms = getSeason(isAdultComp);

  for (let i = 0; i < terms.length; i++) {
    if (i + 1 == terms.length) return i;

    const next = terms[i + 1].date;
    if (date < next) return i;
  }

  return terms.length - 1;
}

export function getCurrentTerm(isAdultComp: boolean) {
  const terms = getSeason(isAdultComp);
  const term = terms[getTermIndex(isAdultComp)];
  console.log(`Term found, starting on: ${term.date}`);
  return term;
}
export function getNextTerm(isAdultComp: boolean) {
  const terms = getSeason(isAdultComp);
  return terms[getTermIndex(isAdultComp) + 1];
}

export type Term = { date: Date; weeks: number };
