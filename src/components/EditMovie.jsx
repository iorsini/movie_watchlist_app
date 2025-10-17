import { useState, useEffect } from 'react';
import { updateMovie } from '../services/api';
import StarRating from './StarRating';

export default function EditMovie({ movie, onMovieUpdated }) {
  const [formData, setFormData] = useState({
    title: '',
    year: '',
    genre: '',
    watched: false,
    rating: 0
  });

  useEffect(() => {
    if (movie) {
      setFormData({
        title: movie.title,
        year: movie.year,
        genre: movie.genre,
        watched: movie.watched,
        rating: movie.rating || 0
      });
    }
  }, [movie]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleRatingChange = (newRating) => {
    setFormData({
      ...formData,
      rating: newRating
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const movieData = {
      ...formData,
      year: parseInt(formData.year),
      rating: formData.rating || null
    };

    await updateMovie(movie._id, movieData);
    alert('Filme atualizado!');
    
    if (onMovieUpdated) onMovieUpdated();
  };

  if (!movie) return <p>Seleciona um filme para editar</p>;

  return (
    <div>
      <h2>Editar Filme</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Título"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="year"
          placeholder="Ano"
          value={formData.year}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="genre"
          placeholder="Género"
          value={formData.genre}
          onChange={handleChange}
        />
        <label>
          <input
            type="checkbox"
            name="watched"
            checked={formData.watched}
            onChange={handleChange}
          />
          Já assistido?
        </label>

        <div style={{ margin: '20px 0' }}>
          <label>Nota:</label>
          <StarRating 
            rating={formData.rating} 
            onRatingChange={handleRatingChange}
          />
        </div>

        <button type="submit">Guardar Alterações</button>
      </form>
    </div>
  );
}