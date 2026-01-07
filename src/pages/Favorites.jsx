import { useEffect, useState } from "react";
import MealCard from "../components/MealCard";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(favs);
  }, []);

  return (
    <div className="container">
      <h2>❤️ Favorite Makanan</h2>

      {favorites.length === 0 ? (
        <p>Belum ada makanan favorit</p>
      ) : (
        <div className="grid">
          {favorites.map((meal) => (
            <MealCard key={meal.idMeal} meal={meal} />
          ))}
        </div>
      )}
    </div>
  );
}
