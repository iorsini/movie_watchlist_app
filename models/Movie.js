// /models/Movie.js
{/* 
Esse bloco de código define e exporta um modelo de dados (“model”) do MongoDB chamado Movie.
Ele descreve como um filme deve ser armazenado no banco de dados.
*/}

const mongoose = require('mongoose'); 
// Importa o Mongoose, biblioteca que facilita a interação com o MongoDB.

// Definição do schema do filme
const movieSchema = new mongoose.Schema({
  // Título do filme, obrigatório
  title: { type: String, required: true },

  // Ano de lançamento do filme, obrigatório
  year: { type: Number, required: true },

  // Gênero do filme, obrigatório
  genre: { type: String, required: true },

  // Se o usuário já assistiu ao filme, padrão é false (não assistido)
  watched: { type: Boolean, default: false },

  // Avaliação do filme de 1 a 10, opcional
  rating: { type: Number, min: 1, max: 10, required: false },

  // ID do usuário que adicionou o filme
  userId: { 
    type: mongoose.Schema.Types.ObjectId, // Tipo ObjectId do MongoDB
    ref: 'User', // Relaciona este campo ao modelo "User"
    required: true // É obrigatório associar cada filme a um usuário
  },

  // Data de criação do registro, padrão é a data atual
  createdAt: { type: Date, default: Date.now }
}, {
  versionKey: false // Remove o campo __v que o Mongoose adiciona por padrão
});

// Exporta o modelo "Movie". 
// Se já existir um modelo com esse nome, reutiliza (mongoose.models.Movie) para evitar erro de redefinição.
module.exports = mongoose.models.Movie || mongoose.model('Movie', movieSchema);