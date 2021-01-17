import { Facilities, Team, School } from "./../types/req-types";

export type GetCurrentUserInfo = {
  current_profile: {
    avatar: string | null;
    id: string;
    first_name: string;
    last_name: string;
    position: string;
    position2: string | null;
    throws_hand: string;
    bats_hand: string;
    biography: string;
    school_year: string;
    feet: number;
    inches: number;
    weight: number;
    age: number;
    school: School;
    teams: Team[];
    facilities: Facilities[];
  };
};
