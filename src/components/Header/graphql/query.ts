export const Graphql = {
  getCurrentUserInfo: `{ current_profile ()
       {
          avatar
          id
          first_name
          last_name
          position
          position2
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
};
