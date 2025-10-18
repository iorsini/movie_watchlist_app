import { useState, useEffect } from 'react';
import { getAllMovies, deleteMovie } from '../services/api';

export default function NotWatchedMovies({ onEditClick }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    loadNotWatchedMovies();
  }, []);

  const loadNotWatchedMovies = async () => {
    const data = await getAllMovies();
    const unwatched = data.filter(movie => movie.watched === false);
    setMovies(unwatched);
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this movie?')) {
      await deleteMovie(id);
      loadNotWatchedMovies();
    }
  };

  return (
    <div className="content-section">
      <h2 className="section-title">To Watch</h2>
      {movies.length === 0 && <p className="empty-state">No movies to watch!</p>}
      <div className="movie-grid">
        {movies.map(movie => (
          <div key={movie._id} className="movie-card">
            <div className="movie-poster">
              <div className="poster-placeholder">{movie.title[0]}</div>
            </div>
            <div className="movie-info">
              <h3 className="movie-title">{movie.title}</h3>
              <p className="movie-year">{movie.year}</p>
              <p className="movie-genre">{movie.genre}</p>
              <div className="movie-meta">
                {movie.rating > 0 && (
                  <span className="rating-badge">★ {movie.rating}/10</span>
                )}
              </div>
              <div className="movie-actions">
                <button onClick={() => onEditClick(movie)} className="btn-secondary">Edit</button>
                <button onClick={() => handleDelete(movie._id)} className="btn-danger">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}