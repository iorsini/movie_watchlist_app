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

  const handleWatchedChange = (checked) => {
    setFormData({
      ...formData, 
      watched: checked,
      rating: checked ? formData.rating : 0 // Reset rating se não foi visto
    });
  };

  const handleSubmit = async () => {
    const movieData = {
      ...formData,
      year: parseInt(formData.year),
      rating: formData.watched ? formData.rating : null // Só salva rating se foi visto
    };
    
    await updateMovie(movie._id, movieData);
    alert('Movie updated successfully!');
    if (onMovieUpdated) onMovieUpdated();
  };

  if (!movie) return <p className="empty-state">Select a movie to edit</p>;

  return (
    <div className="content-section">
      <h2 className="section-title">Edit Movie</h2>
      <div className="movie-form">
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
          />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Year</label>
            <input
              type="number"
              value={formData.year}
              onChange={(e) => setFormData({...formData, year: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label>Genre</label>
            <input
              type="text"
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
        
        <button onClick={handleSubmit} className="btn-primary">Save Changes</button>
      </div>
    </div>
  );
}