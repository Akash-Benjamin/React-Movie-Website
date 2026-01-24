import MovieCard from "../components/MovieCard";
import "../css/Home.css";
import { useState, useEffect } from "react";
import { searchMovies, getPopularMovies } from "../services/api";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadPopulerMovies = async () => {
      try {
        const populerMovies = await getPopularMovies()
        setMovies(populerMovies)
      } catch (error) {
        setError("failed to load movies....")
      }
      finally {
        setLoading(false)
      }
    }
    loadPopulerMovies()
  }, [])


  const handleSearch = (e) => {
    e.preventDefault()
    alert(searchQuery)
    setSearchQuery("")
  }

  return (
    <div className="home">
      <form onSubmit={handleSearch} className="search-form">
        <input type="text"
          placeholder="Search Movies...."
          className="Search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="search-button " type="submit">search</button>
      </form>

      {error && <div className ="error-message">{error}</div>}

      {loading ? (<div className="loading">Loading</div>) : <div className="movies-grid">
        {movies.map((movie) => (<MovieCard movie={movie} key={movie.id} />))}
      </div>}
    </div>
  );
}

export default Home 