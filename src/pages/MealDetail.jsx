import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./MealDetail.css";

const MealDetail = () => {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);

  useEffect(() => {
    axios
      .get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((res) => setMeal(res.data.meals[0]));
  }, [id]);

  if (!meal) return <p style={{ textAlign: "center" }}>Loading...</p>;

  return (
    <div className="detail-container">
      <img src={meal.strMealThumb} alt={meal.strMeal} className="detail-image" />

      <div className="detail-content">
        <h1>{meal.strMeal}</h1>

        <div className="detail-meta">
          <span>🍽 {meal.strCategory}</span>
          <span>🌍 {meal.strArea}</span>
        </div>

        <h2>Ingredients</h2>
        <ul className="ingredient-list">
          {[...Array(20)].map((_, i) => {
            const ingredient = meal[`strIngredient${i + 1}`];
            const measure = meal[`strMeasure${i + 1}`];
            return (
              ingredient && (
                <li key={i}>
                  {ingredient} – {measure}
                </li>
              )
            );
          })}
        </ul>

        <h2>Instructions</h2>
        <p className="instructions">{meal.strInstructions}</p>
      </div>
    </div>
  );
};

export default MealDetail;
