import { Location } from "@/../orm/client";

export function stripTime(date: Date): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

export const toTitleCase = (str: String) => {
  return str
    .toLowerCase()
    .split(" ")
    .map((word: String) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
};

export const locationToText = (location: Location) => {
  switch (location) {
    case Location.ST_IVES:
      return "St Ives";
    case Location.BELROSE:
      return "Belrose";
  }
};

export function groupBy<T, K>(items: Array<T>, keySelector: (item: T) => K): Array<[K, T[]]> {
  const result = items.reduce((acc, current) => {
    const key = keySelector(current)
    const currItems = acc.get(key) || []
    currItems.push(current)

    acc.set(key, currItems)

    return acc
  }, new Map<K, T[]>)
  return [...result];
}
