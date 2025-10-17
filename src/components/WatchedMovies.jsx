import { useState, useEffect } from 'react';
import { getAllMovies } from '../services/api';

export default function WatchedMovies() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    loadWatchedMovies();
  }, []);

  const loadWatchedMovies = async () => {
    const data = await getAllMovies();
    const watched = data.filter(movie => movie.watched === true);
    setMovies(watched);
  };

  return (
    <div>
      <h2>Watched Movies</h2>
      {movies.map(movie => (
        <div key={movie._id}>
          <h3>{movie.title} ({movie.year})</h3>
          <p>Genre: {movie.genre}</p>
          {movie.rating && <p>Nota: {movie.rating}/10</p>}
        </div>
      ))}
    </div>
  );
}