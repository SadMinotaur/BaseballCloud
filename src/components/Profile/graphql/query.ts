export const Queries = {
  getUserInfo: `{ current_profile ()
       {
          id
          first_name
          last_name 
          position 
          position2
          avatar
          throws_hand
          bats_hand
          biography
          school_year
          feet
          inches
          weight
          age
          school {
            id
            name
          }
          teams {
            id
            name
          }
          facilities {
            id
            email
            u_name
          }
        }
      }`,
  getSchools: `query Schools($search:String!) { 
      schools(search: $search) {
        schools {
          id
          name
        }
      }
    }`,
  getTeams: `query Teams($search:String!) { teams(search: $search) {
      teams {
        id
        name
      }
    }
  }`,
  getFacilities: `query Facilities($search:String!)
     { facilities(search: $search) {
       facilities {
         id
         email
         u_name
        }
      }
    }`,
};

// export interface UpdateProfile {
//   age: number;
//   bats_hand: string;
//   biography: string;
//   facilities: { id: string; u_name: string }[];
//   feet: number;
//   first_name: string;
//   id: string;
//   inches: number;
//   last_name: string;
//   position: string;
//   school: { id: number; name: string }[];
//   school_year: string;
//   teams: [];
//   throws_hand: string;
//   weight: number;
// }
