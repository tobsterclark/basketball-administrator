import { Location } from "@tobsterclark/prisma-orm";

export type Team = {
  id: string;
  name: string;
  division: number | null;
};

export type Game = {
  id: string;
  lightScore: number;
  darkScore: number;
  darkTeam: Team;
  lightTeam: Team;
};

export type Timeslot = {
  game: Game | null;
  id: string;
  court: number;
  location: Location;
  ageGroupId: string | null;
  date: Date;
};
