export const getFavorites = () => {
  return JSON.parse(localStorage.getItem("favorites")) || [];
};

export const toggleFavorite = (meal) => {
  const favorites = getFavorites();
  const exists = favorites.find((f) => f.idMeal === meal.idMeal);

  let updated;
  if (exists) {
    updated = favorites.filter((f) => f.idMeal !== meal.idMeal);
  } else {
    updated = [...favorites, meal];
  }

  localStorage.setItem("favorites", JSON.stringify(updated));
  return updated;
};

export const isFavorite = (id) => {
  const favorites = getFavorites();
  return favorites.some((f) => f.idMeal === id);
};
