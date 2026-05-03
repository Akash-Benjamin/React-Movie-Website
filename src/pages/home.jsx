import MovieCard from "../components/MovieCard";
import "../css/Home.css";
import { useState, useEffect } from "react";
import { searchMovies, getPopularMovies } from "../services/api";

const INITIAL_PAGES = 3; // fetch 3 pages (60 movies) on load

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(INITIAL_PAGES);
  const [totalPages, setTotalPages] = useState(1);
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [activeQuery, setActiveQuery] = useState("");

  // Load initial popular movies (3 pages in parallel)
  useEffect(() => {
    const loadInitial = async () => {
      try {
        const pageNumbers = Array.from({ length: INITIAL_PAGES }, (_, i) => i + 1);
        const responses = await Promise.all(
          pageNumbers.map((p) => getPopularMovies(p))
        );
        const allMovies = responses.flatMap((r) => r.results);
        // Deduplicate
        const seen = new Set();
        const unique = allMovies.filter((m) => {
          if (seen.has(m.id)) return false;
          seen.add(m.id);
          return true;
        });
        setMovies(unique);
        setTotalPages(responses[0].totalPages);
        setCurrentPage(INITIAL_PAGES);
      } catch {
        setError("Failed to load movies. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    loadInitial();
  }, []);

  // Load more popular movies (next page)
  const handleLoadMore = async () => {
    const nextPage = currentPage + 1;
    if (nextPage > totalPages) return;

    setLoadingMore(true);
    try {
      if (isSearchMode) {
        const data = await searchMovies(activeQuery, nextPage);
        setMovies((prev) => {
          const ids = new Set(prev.map((m) => m.id));
          const fresh = data.results.filter((m) => !ids.has(m.id));
          return [...prev, ...fresh];
        });
        setCurrentPage(data.currentPage);
        setTotalPages(data.totalPages);
      } else {
        const data = await getPopularMovies(nextPage);
        setMovies((prev) => {
          const ids = new Set(prev.map((m) => m.id));
          const fresh = data.results.filter((m) => !ids.has(m.id));
          return [...prev, ...fresh];
        });
        setCurrentPage(data.currentPage);
        setTotalPages(data.totalPages);
      }
    } catch {
      setError("Failed to load more movies.");
    } finally {
      setLoadingMore(false);
    }
  };

  // Search
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    if (loading) return;

    setLoading(true);
    setIsSearchMode(true);
    setActiveQuery(searchQuery);
    try {
      const data = await searchMovies(searchQuery, 1);
      setMovies(data.results);
      setCurrentPage(data.currentPage);
      setTotalPages(data.totalPages);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to search movies. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Reset to popular
  const handleReset = () => {
    setSearchQuery("");
    setIsSearchMode(false);
    setActiveQuery("");
    setLoading(true);
    setMovies([]);
    const loadInitial = async () => {
      try {
        const pageNumbers = Array.from({ length: INITIAL_PAGES }, (_, i) => i + 1);
        const responses = await Promise.all(
          pageNumbers.map((p) => getPopularMovies(p))
        );
        const allMovies = responses.flatMap((r) => r.results);
        const seen = new Set();
        const unique = allMovies.filter((m) => {
          if (seen.has(m.id)) return false;
          seen.add(m.id);
          return true;
        });
        setMovies(unique);
        setTotalPages(responses[0].totalPages);
        setCurrentPage(INITIAL_PAGES);
      } catch {
        setError("Failed to load movies.");
      } finally {
        setLoading(false);
      }
    };
    loadInitial();
  };

  const sectionLabel = isSearchMode
    ? `Results for "${activeQuery}"`
    : "🔥 Popular Right Now";

  const hasMore = currentPage < totalPages;

  return (
    <div className="home">
      {/* Hero search */}
      <div className="search-hero">
        <h1>Find Your Next Favourite Film</h1>
        <p>Millions of movies, discover yours</p>
        <form onSubmit={handleSearch} className="search-form">
          <input
            id="search-input"
            type="text"
            placeholder="Search movies, actors, genres…"
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoComplete="off"
          />
          <button className="search-button" type="submit">
            Search
          </button>
        </form>
      </div>

      {error && <div className="error-message">{error}</div>}

      {!loading && (
        <div className="section-header">
          <p className="section-label">{sectionLabel}</p>
          {isSearchMode && (
            <button className="reset-btn" onClick={handleReset}>
              ✕ Clear
            </button>
          )}
          <span className="movie-count">{movies.length} movies</span>
        </div>
      )}

      {loading ? (
        <div className="loading">Loading</div>
      ) : (
        <>
          <div className="movies-grid">
            {movies.map((movie) => (
              <MovieCard movie={movie} key={movie.id} />
            ))}
          </div>

          {hasMore && (
            <div className="load-more-wrapper">
              <button
                className="load-more-btn"
                onClick={handleLoadMore}
                disabled={loadingMore}
              >
                {loadingMore ? (
                  <span className="load-more-spinner" />
                ) : null}
                {loadingMore ? "Loading…" : "Load More Movies"}
              </button>
              <p className="page-info">
                Page {currentPage} of {totalPages}
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Home;