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
