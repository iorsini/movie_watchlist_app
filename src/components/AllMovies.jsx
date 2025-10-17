import { useState, useEffect } from 'react';
import { getAllMovies, deleteMovie } from '../services/api';

export default function AllMovies({ onEditClick }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    loadMovies();
  }, []);

  const loadMovies = async () => {
    const data = await getAllMovies();
    setMovies(data);
  };

  const handleDelete = async (id) => {
    if (confirm('Tens a certeza que queres eliminar este filme?')) {
      await deleteMovie(id);
      loadMovies();
    }
  };

  return (
    <div>
      <h2>All Movies</h2>
      {movies.length === 0 && <p>No movies added yet!</p>}
      {movies.map(movie => (
        <div key={movie._id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
          <h3>{movie.title} ({movie.year})</h3>
          <p>Género: {movie.genre}</p>
          <p>Assistido: {movie.watched ? 'Sim ✓' : 'Não'}</p>
          {movie.rating && <p>Nota: {movie.rating}/10 ⭐</p>}
          <button onClick={() => onEditClick && onEditClick(movie)}>Editar</button>
          <button onClick={() => handleDelete(movie._id)} style={{ marginLeft: '10px' }}>Eliminar</button>
        </div>
      ))}
    </div>
  );
}