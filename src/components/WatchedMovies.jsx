import { useState, useEffect } from 'react';
import { getAllMovies, deleteMovie } from '../services/api';

export default function WatchedMovies({ onEditClick }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    loadWatchedMovies();
  }, []);

  const loadWatchedMovies = async () => {
    const data = await getAllMovies();
    const watched = data.filter(movie => movie.watched === true);
    setMovies(watched);
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this movie?')) {
      await deleteMovie(id);
      loadWatchedMovies();
    }
  };

  return (
    <div className="content-section">
      <h2 className="section-title">Watched Movies</h2>
      {movies.length === 0 && <p className="empty-state">No watched movies yet!</p>}
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