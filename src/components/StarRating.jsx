import { useState } from 'react';

export default function StarRating({ rating, onRatingChange }) {
  const [hover, setHover] = useState(0);

  return (
    <div style={{ fontSize: '35px' }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => onRatingChange(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          style={{
            cursor: 'pointer',
            color: star <= (hover || rating / 2) ? '#ffc107' : '#e4e5e9',
            marginRight: '5px'
          }}
        >
          ★
        </span>
      ))}
      <span style={{ fontSize: '16px', marginLeft: '10px' }}>
        {rating ? `${rating}/5` : ''}
      </span>
    </div>
  );
}