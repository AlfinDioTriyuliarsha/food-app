import axios from "axios";

const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

// 🔍 Search meal by name
export const searchMeals = async (query) => {
  const res = await axios.get(
    `${BASE_URL}/search.php?s=${query}`
  );
  return res.data.meals || [];
};

// 📂 Get all categories
export const getCategories = async () => {
  const res = await axios.get(
    `${BASE_URL}/categories.php`
  );
  return res.data.categories || [];
};

// 🏷️ Filter by category
export const filterByCategory = async (category) => {
  const res = await axios.get(
    `${BASE_URL}/filter.php?c=${category}`
  );
  return res.data.meals || [];
};

// 📄 Detail meal
export const getMealDetail = async (id) => {
  const res = await axios.get(
    `${BASE_URL}/lookup.php?i=${id}`
  );
  return res.data.meals?.[0];
};

// 🎲 Category
export const getMealsByCategory = async (category) => {
  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
  );
  const data = await res.json();
  return data.meals || [];
};
