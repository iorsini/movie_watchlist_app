import { useState } from 'react';

export default function StarRating({ rating, onRatingChange }) {
  const [hover, setHover] = useState(0);

  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
        <span
          key={star}
          onClick={() => onRatingChange(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          className={star <= (hover || rating) ? 'star filled' : 'star'}
        >
          ★
        </span>
      ))}
      <span className="rating-display">
        {rating ? `${rating}/10` : 'Select rating'}
      </span>
    </div>
  );
}