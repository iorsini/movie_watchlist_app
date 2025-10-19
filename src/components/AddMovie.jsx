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

  const handleWatchedChange = (checked) => {
    setFormData({
      ...formData, 
      watched: checked,
      rating: checked ? formData.rating : 0 // Reset rating se não foi visto
    });
  };

  const handleSubmit = async () => {
    if (formData.title && formData.year) {
      const movieData = {
        ...formData,
        year: parseInt(formData.year),
        rating: formData.watched ? formData.rating : null // Só salva rating se foi visto
      };
      
      await addMovie(movieData);
      alert('Movie added successfully!');
      setFormData({ title: '', year: '', genre: '', watched: false, rating: 0 });
      if (onMovieAdded) onMovieAdded();
    }
  };

  return (
    <div className="content-section">
      <h2 className="section-title">Add New Movie</h2>
      <div className="movie-form">
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            placeholder="Enter movie title"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
          />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Year</label>
            <input
              type="number"
              placeholder="2024"
              value={formData.year}
              onChange={(e) => setFormData({...formData, year: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label>Genre</label>
            <input
              type="text"
              placeholder="Action, Drama..."
              value={formData.genre}
              onChange={(e) => setFormData({...formData, genre: e.target.value})}
            />
          </div>
        </div>
        <div className="form-group checkbox-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={formData.watched}
              onChange={(e) => handleWatchedChange(e.target.checked)}
            />
            <span>Already watched</span>
          </label>
        </div>
        
        {/* SÓ MOSTRA RATING SE O FILME FOI VISTO */}
        {formData.watched && (
          <div className="form-group">
            <label>Rating</label>
            <StarRating 
              rating={formData.rating} 
              onRatingChange={(rating) => setFormData({...formData, rating})}
            />
          </div>
        )}
        
        <button onClick={handleSubmit} className="btn-primary">Add Movie</button>
      </div>
    </div>
  );
}