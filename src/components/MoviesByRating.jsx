import { useState, useEffect } from 'react';
import { getAllMovies } from '../services/api';

export default function MoviesByRating() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    loadMoviesByRating();
  }, []);

  const loadMoviesByRating = async () => {
    const data = await getAllMovies();
    const withRating = data.filter(movie => movie.rating && movie.rating > 0);
    const sorted = withRating.sort((a, b) => b.rating - a.rating);
    setMovies(sorted);
  };

  return (
    <div className="content-section">
      <h2 className="section-title">Top Rated</h2>
      {movies.length === 0 && <p className="empty-state">No rated movies yet!</p>}
      <div className="movie-list">
        {movies.map((movie, index) => (
          <div key={movie._id} className="movie-list-item">
            <div className="rank">#{index + 1}</div>
            <div className="movie-list-info">
              <h3>{movie.title}</h3>
              <p>{movie.year} • {movie.genre}</p>
            </div>
            <div className="rating-large">★ {movie.rating}/10</div>
          </div>
        ))}
      </div>
    </div>
  );
}