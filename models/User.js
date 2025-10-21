// /models/User.js
{/* 
Esse bloco de código define e exporta um modelo de dados (“model”) do MongoDB chamado User.
Ele descreve como um user deve ser armazenado no banco de dados.
*/}
const mongoose = require('mongoose'); 
// Importa o Mongoose, biblioteca que facilita a interação com o MongoDB.

// Definição do schema do usuário
const userSchema = new mongoose.Schema({
  // Nome do usuário, obrigatório
  name: { 
    type: String, 
    required: true 
  },

  // Email do usuário, obrigatório e único
  email: { 
    type: String, 
    required: true,        // Necessário para criar o usuário
    unique: true,          // Não pode haver dois usuários com o mesmo email
    lowercase: true,       // Converte o email para letras minúsculas antes de salvar
    trim: true             // Remove espaços extras no início e fim
  },

  // Senha do usuário, obrigatória
  password: { 
    type: String, 
    required: true 
  },

  // Data de criação do usuário, padrão é a data atual
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
}, {
  versionKey: false // Remove o campo __v que o Mongoose adiciona por padrão
});

// Exporta o modelo "User". 
// Se já existir um modelo com esse nome, reutiliza (mongoose.models.User) para evitar erro de redefinição.
module.exports = mongoose.models.User || mongoose.model('User', userSchema);