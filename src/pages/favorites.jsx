import "../css/Favorites.css";
import { useMovieContext } from "../contexts/MovieContext";
import MovieCard from "../components/MovieCard";

function Favorites() {
  const { favorites } = useMovieContext();

  if (!favorites || favorites.length === 0) {
    return (
      <div className="favorites">
        <div className="favorites-empty">
          <span className="empty-icon">🎬</span>
          <h2>No Favourites Yet</h2>
          <p>
            Start exploring movies and tap the heart icon to save your
            favourites here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="favorites">
      <div className="favorites-header">
        <h1>Your Favourites</h1>
        <p>{favorites.length} movie{favorites.length !== 1 ? "s" : ""} saved</p>
      </div>
      <div className="movies-grid">
        {favorites.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>
    </div>
  );
}

export default Favorites;
