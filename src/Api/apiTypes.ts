export interface SignInResp {
  id: number;
  email: string;
  role: string;
}

export interface UpdateProfile {
  age: number;
  bats_hand: string;
  biography: string;
  facilities: { id: string; u_name: string }[];
  feet: number;
  first_name: string;
  id: string;
  inches: number;
  last_name: string;
  position: string;
  school: { id: number; name: string }[];
  school_year: string;
  teams: [];
  throws_hand: string;
  weight: number;
}
