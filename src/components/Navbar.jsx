import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Navbar.css";

export default function Navbar() {
  const [favoriteCount, setFavoriteCount] = useState(0);
  const [open, setOpen] = useState(false);

  const updateFavoriteCount = () => {
    const favs = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavoriteCount(favs.length);
  };

  useEffect(() => {
    updateFavoriteCount();
    window.addEventListener("favoriteUpdated", updateFavoriteCount);
    window.addEventListener("storage", updateFavoriteCount);

    return () => {
      window.removeEventListener("favoriteUpdated", updateFavoriteCount);
      window.removeEventListener("storage", updateFavoriteCount);
    };
  }, []);

  return (
    <header className="nav-wrapper">
      <nav className="navbar">
        <div className="nav-left">
          <Link to="/" className="logo">
            🍔 Food
          </Link>
        </div>

        <div className={`nav-menu ${open ? "open" : ""}`}>
          <NavLink to="/" end onClick={() => setOpen(false)}>
            Home
          </NavLink>

          <NavLink to="/favorites" onClick={() => setOpen(false)}>
            Favorites
            {favoriteCount > 0 && (
              <span className="favorite-badge">{favoriteCount}</span>
            )}
          </NavLink>
        </div>

        <button
          className={`hamburger ${open ? "active" : ""}`}
          onClick={() => setOpen(!open)}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>
    </header>
  );
}
