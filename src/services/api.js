// /src/services/api.js
{/*Esse bloco de código é um módulo de API client em JavaScript para interagir com a rota /api/movies da app. 
  Ele define funções para realizar as operações CRUD (Create, Read, Update, Delete) de filmes.
*/}

// Define a URL base da API de filmes
const API_URL = '/api/movies';

// Função para obter todos os filmes
export const getAllMovies = async () => {
  // Faz requisição GET para a API de filmes
  const response = await fetch(API_URL);
  // Converte a resposta para JSON e retorna
  return response.json();
};

// Função para adicionar um novo filme
export const addMovie = async (movieData) => {
  // Faz requisição POST para a API, enviando os dados do filme no corpo da requisição
  const response = await fetch(API_URL, {
    method: 'POST', // Define o método HTTP como POST
    headers: { 'Content-Type': 'application/json' }, // Indica que o corpo é JSON
    body: JSON.stringify(movieData) // Converte o objeto movieData em string JSON
  });
  // Converte a resposta para JSON e retorna
  return response.json();
};

// Função para atualizar um filme existente
export const updateMovie = async (id, movieData) => {
  // Faz requisição PUT para a API, usando o id do filme na URL
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT', // Define o método HTTP como PUT
    headers: { 'Content-Type': 'application/json' }, // Indica que o corpo é JSON
    body: JSON.stringify(movieData) // Converte o objeto movieData em string JSON
  });
  // Converte a resposta para JSON e retorna
  return response.json();
};

// Função para deletar um filme
export const deleteMovie = async (id) => {
  // Faz requisição DELETE para a API, usando o id do filme na URL
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE' // Define o método HTTP como DELETE
  });
  // Converte a resposta para JSON e retorna
  return response.json();
};