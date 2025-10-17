import { useState } from 'react';
import { addMovie } from '../services/api';
import StarRating from './StarRating';

export default function AddMovie({ onMovieAdded }) {
  const [formData, setFormData] = useState({
    title: '',
    year: '',
    genre: '',
    watched: false,
    rating: 0
  });

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

    await addMovie(movieData);
    alert('Filme adicionado!');
    
    setFormData({
      title: '',
      year: '',
      genre: '',
      watched: false,
      rating: 0
    });

    if (onMovieAdded) onMovieAdded();
  };

  return (
    <div>
      <h2>Adicionar Filme</h2>
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

        <button type="submit">Adicionar</button>
      </form>
    </div>
  );
}