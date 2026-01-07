import { useEffect, useState } from "react";
import MealCard from "./MealCard";
import { getMealsByCategory } from "../services/api";

export default function CategorySection({ category }) {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMealsByCategory(category).then((data) => {
      setMeals(data.slice(0, 6)); // batasi 6 biar ringan
      setLoading(false);
    });
  }, [category]);

  return (
    <section style={{ marginBottom: "48px" }}>
      <h2 className="category-title">{category}</h2>

      <div className="grid">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
              <div className="skeleton-card" key={i} />
            ))
          : meals.map((meal) => (
              <MealCard key={meal.idMeal} meal={meal} />
            ))}
      </div>
    </section>
  );
}
