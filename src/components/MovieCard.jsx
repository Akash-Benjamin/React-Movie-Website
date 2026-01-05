function MovieCard({ movie }) {
    function onLiked() {
        alert("liked")
    }
    return (
    <div className="movie-card">
        <div className="movie-poster">
            <img src={movie?.url} alt={movie?.title || "Movie poster"} />
            <div className="movie-overlay">
                <button className="favorite-btn" onClick={onLiked}>
                    ❤
                </button>
            </div>
            <div className="movie-info">
                <h3>{movie?.title}</h3>
                <p>{movie?.release_date}</p>
            </div>
        </div>
    </div>
)
}

export default MovieCard;
