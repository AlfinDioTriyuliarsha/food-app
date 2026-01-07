import { useEffect, useState } from "react";
import MealCard from "../components/MealCard";
import SkeletonCard from "../components/SkeletonCard";
import {
  searchMeals,
  getCategories,
  filterByCategory,
  getMealsByCategory,
} from "../services/api";

export default function Home() {
  const [meals, setMeals] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [groupedMeals, setGroupedMeals] = useState({});
  const [trendingMeals, setTrendingMeals] = useState([]);

  // fetch kategori
  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  // fetch trending
  useEffect(() => {
    searchMeals("chicken").then((data) => {
      setTrendingMeals((data || []).slice(0, 6));
    });
  }, []);

  // MODE 1: search / filter
  useEffect(() => {
    if (!search && !selectedCategory) return;

    setLoading(true);
    const delay = setTimeout(() => {
      if (selectedCategory) {
        filterByCategory(selectedCategory).then((data) => {
          setMeals(data || []);
          setLoading(false);
        });
      } else {
        searchMeals(search).then((data) => {
          setMeals(data || []);
          setLoading(false);
        });
      }
    }, 300);

    return () => clearTimeout(delay);
  }, [search, selectedCategory]);

  // MODE 2: tampil per kategori
  useEffect(() => {
    if (search || selectedCategory || categories.length === 0) return;

    const fetchByCategory = async () => {
      setLoading(true);
      const result = {};

      for (const cat of categories) {
        const data = await getMealsByCategory(cat.strCategory);
        result[cat.strCategory] = data.slice(0, 6);
      }

      setGroupedMeals(result);
      setLoading(false);
    };

    fetchByCategory();
  }, [categories, search, selectedCategory]);

  return (
    <div className="container">
      {/* FILTER BAR */}
      <div className="filter-bar">
        <input
          className="search"
          placeholder="Cari makanan..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Category</option>
          {categories.map((cat) => (
            <option key={cat.idCategory} value={cat.strCategory}>
              {cat.strCategory}
            </option>
          ))}
        </select>
      </div>

      {/* 🔥 TRENDING SECTION (FIXED POSITION) */}
      {!search && !selectedCategory && trendingMeals.length > 0 && (
        <section style={{ marginBottom: 48 }}>
          <h2 className="category-title">🔥 Trending Now</h2>

          <div className="grid">
            {trendingMeals.map((meal) => (
              <MealCard key={meal.idMeal} meal={meal} />
            ))}
          </div>
        </section>
      )}

      {/* MODE SEARCH / FILTER */}
      {(search || selectedCategory) && (
        <div className="grid">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))
            : meals.map((meal) => (
                <MealCard key={meal.idMeal} meal={meal} />
              ))}
        </div>
      )}

      {/* MODE KATEGORI */}
      {!search && !selectedCategory && (
        <>
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <div key={i} style={{ marginBottom: 40 }}>
                  <SkeletonCard />
                </div>
              ))
            : Object.entries(groupedMeals).map(([cat, items]) => (
                <section key={cat} style={{ marginBottom: 48 }}>
                  <h2 className="category-title">{cat}</h2>

                  <div className="grid">
                    {items.map((meal) => (
                      <MealCard key={meal.idMeal} meal={meal} />
                    ))}
                  </div>
                </section>
              ))}
        </>
      )}
    </div>
  );
}
