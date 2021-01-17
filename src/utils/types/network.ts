import { School, Team } from "./req-types";

export type Profiles = {
  total_count: number;
  profiles: ProfilesInfo[];
};

export type ProfilesInfo = {
  id: number;
  first_name: string;
  last_name: string;
  position: string;
  position2: string;
  school: School | null;
  school_year: number | null;
  feet: number;
  inches: number;
  weight: number;
  age: number;
  events: [];
  teams: Team[];
  favorite: boolean;
};

export type ButtonState = { button: string; state: string };
