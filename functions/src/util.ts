/* eslint-disable no-extend-native */
import { apps, initializeApp } from "firebase-admin";
import { getAuth } from "firebase-admin/auth";

declare global {
  interface String {
    toCamelCase(): string;
  }

  interface DateConstructor {
    parseToDate(str: string | undefined): Date;
  }
}

if (!String.prototype.toCamelCase) {
  // prettier-ignore
  String.prototype.toCamelCase = function (): string {
    return this.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
  };
}

if (!Date.parseToDate) {
  // prettier-ignore
  Date.parseToDate = function (str): Date {
    if (!str) return new Date();
    return new Date(Date.parse(str));
  };
}

export default async () => {
  if (apps.length === 0) initializeApp();

  return { auth: getAuth() };
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
};
