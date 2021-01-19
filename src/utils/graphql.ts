export const GraphqlCom = {
  favoriteProfile: `mutation UpdateFavoriteProfile($form:UpdateFavoriteProfileInput!) {
  update_favorite_profile(input: $form) {
    favorite
  }
}`,
};
