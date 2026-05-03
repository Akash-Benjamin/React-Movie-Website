import "../css/MovieCard.css";
import { useMovieContext } from "../contexts/MovieContext";

function MovieCard({ movie }) {
  const { isFavorites, addToFavorites, removeFromFavorites } = useMovieContext();
  const favorite = isFavorites(movie.id);

  function onFavoriteClick(e) {
    e.preventDefault();
    if (favorite) removeFromFavorites(movie.id);
    else addToFavorites(movie);
  }

  const year = movie.release_date?.split("-")[0];
  const rating = movie.vote_average?.toFixed(1);
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";

  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img src={posterUrl} alt={movie.title} loading="lazy" />
        <div className="movie-overlay">
          {rating && (
            <span className="movie-rating-badge">⭐ {rating}</span>
          )}
        </div>
        <button
          className={`favorite-btn ${favorite ? "active" : ""}`}
          onClick={onFavoriteClick}
          aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
          title={favorite ? "Remove from favorites" : "Add to favorites"}
        >
          {favorite ? "❤" : "🤍"}
        </button>
      </div>
      <div className="movie-info">
        <h3 title={movie.title}>{movie.title}</h3>
        {year && <p>{year}</p>}
      </div>
    </div>
  );
}

export default MovieCard;
