import { Link, useLocation } from "react-router-dom";
import "../css/Navbar.css";

function NavBar() {
  const { pathname } = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">🎬 CineVault</Link>
      </div>
      <div className="navbar-links">
        <Link to="/" className={`nav-link ${pathname === "/" ? "active" : ""}`}>
          Home
        </Link>
        <Link
          to="/favorites"
          className={`nav-link ${pathname === "/favorites" ? "active" : ""}`}
        >
          ❤ Favorites
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;