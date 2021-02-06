import API from "./api";
import { CommonGraphql } from "./common-query";

export async function MakeFavorite(
  v: boolean,
  id: number,
  success: (v: string) => void
) {
  API.graphqlPost(CommonGraphql.favorite, {
    form: {
      favorite: v,
      profile_id: id,
    },
  }).then(() => {
    success(
      `This profile ${
        v ? "added to favorite" : "removed from favorite"
      }  list successfully.`
    );
  });
}
