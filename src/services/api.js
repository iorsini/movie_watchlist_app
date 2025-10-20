const API_URL = 'http://localhost:3000/api/movies';

export const getAllMovies = async () => {
  const response = await fetch(API_URL);
  return response.json();
};

export const addMovie = async (movieData) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(movieData)
  });
  return response.json();
};

export const updateMovie = async (id, movieData) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(movieData)
  });
  return response.json();
};

export const deleteMovie = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  });
  return response.json();
};