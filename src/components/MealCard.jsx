import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function MealCard({ meal }) {
  const [favorite, setFavorite] = useState(false);
  const [toast, setToast] = useState({
    show: false,
    message: "",
  });

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorite(favs.some((m) => m.idMeal === meal.idMeal));
  }, [meal.idMeal]);

  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => {
      setToast({ show: false, message: "" });
    }, 2000);
  };

  const toggleFavorite = () => {
    let favs = JSON.parse(localStorage.getItem("favorites")) || [];

    if (favorite) {
      favs = favs.filter((m) => m.idMeal !== meal.idMeal);
      showToast("💔 Dihapus dari Favorit");
    } else {
      favs.push(meal);
      showToast("❤️ Berhasil Ditambahkan ke Favorit");
    }

    localStorage.setItem("favorites", JSON.stringify(favs));
    setFavorite(!favorite);

    // 🔥 trigger realtime update (FIXED EVENT NAME)
    window.dispatchEvent(new Event("favoriteUpdated"));
  };

  return (
    <div className="card">
      <Link to={`/meal/${meal.idMeal}`}>
        <img src={meal.strMealThumb} alt={meal.strMeal} />
      </Link>

      <div className="card-body">
        <h3>{meal.strMeal}</h3>
        <button
          className={`favorite-btn ${favorite ? "active" : ""}`}
          onClick={toggleFavorite}
        >
          ❤️
        </button>
      </div>

      {toast.show && (
        <div className="toast animate">
          {toast.message}
        </div>
      )}
    </div>
  );
}
