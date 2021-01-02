export const Queries = {
  getUserInfo:
    "{ current_profile ()\n {\n id\n first_name\n last_name\n position\n position2\n avatar\n throws_hand\n bats_hand\n biography\n school_year\n feet\n inches\n weight\n age\n school {\n id\n name\n }\n teams {\n id\n name\n }\n facilities {\n id\n email\n u_name\n }\n }\n }",
  getSchools:
    "query Schools($search:String!)\n { schools(search: $search) {\n schools {\n id\n name\n }\n }\n }",
  getTeams:
    "query Teams($search:String!)\n { teams(search: $search) {\n teams {\n id\n name\n }\n }\n }",
  getFacilities:
    "query Facilities($search:String!)\n { facilities(search: $search) {\n facilities {\n id\n email\n u_name\n }\n }\n }",
};

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
