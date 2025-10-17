import { useState, useEffect } from 'react';
import { getAllMovies } from '../services/api';

export default function NotWatchedMovies() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    loadNotWatchedMovies();
  }, []);

  const loadNotWatchedMovies = async () => {
    const data = await getAllMovies();
    const notWatched = data.filter(movie => movie.watched === false);
    setMovies(notWatched);
  };

  return (
    <div>
      <h2>Unwatched Movies</h2>
      {movies.map(movie => (
        <div key={movie._id}>
          <h3>{movie.title} ({movie.year})</h3>
          <p>Genre: {movie.genre}</p>
        </div>
      ))}
    </div>
  );
}