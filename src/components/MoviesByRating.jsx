import { useState, useEffect } from 'react';
import { getAllMovies } from '../services/api';

export default function MoviesByRating() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    loadMoviesByRating();
  }, []);

  const loadMoviesByRating = async () => {
    const data = await getAllMovies();
    const withRating = data.filter(movie => movie.rating);
    const sorted = withRating.sort((a, b) => b.rating - a.rating);
    setMovies(sorted);
  };

  return (
    <div>
      <h2>By Rating</h2>
      {movies.map(movie => (
        <div key={movie._id}>
          <h3>{movie.title} - {movie.rating}/5 ⭐</h3>
          <p>Year: {movie.year} | Genre: {movie.genre}</p>
        </div>
      ))}
    </div>
  );
}