export const CommonQueries = {
  favoriteProfile: `mutation UpdateFavoriteProfile($form:UpdateFavoriteProfileInput!) {
  update_favorite_profile(input: $form) {
    favorite
  }
}`,
};
