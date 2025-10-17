// ===== CONSTANTES FIXAS =====
const express = require('express');
const next = require('next');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./lib/mongodb');
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();
const app = express();
app.use(cors());
app.use(express.json());

// Esta constante é relativa às coleções da tua base de dados e deves acrescentar mais se for o caso
const Movie = require('./models/Movie');



// ===== ENDPOINTS DA API =====

// GET /api/movies - Retorna todos os filmes existentes
app.get('/api/movies', async (req, res) => {
  try {
    const movies = await Movie.find().sort({ title: 1 });
    res.json(movies);
  } catch (error) {
    console.error('Failed to fetch movies:', error);
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
});

// POST /api/movies - Adiciona um novo filme
app.post('/api/movies', async (req, res) => {
  try {
    const { title, year, genre, watched, rating } = req.body;
    
    if (!title || !title.trim()) {
      return res.status(400).json({ erro: 'Título é obrigatório' });
    }

    if (!year) {
      return res.status(400).json({ erro: 'Ano é obrigatório' });
    }

    const newMovie = new Movie({ 
      title: title.trim(),
      year,
      genre: genre?.trim() || '',
      watched: watched || false,
      rating: rating || null
    });
    
    const movieSaved = await newMovie.save();
    res.status(201).json(movieSaved);
  } catch (error) {
    console.error('Erro ao criar filme:', error);
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
});

// PUT /api/movies/:id - Edita um filme existente
app.put('/api/movies/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, year, genre, watched, rating } = req.body;
    
    const movieUpdated = await Movie.findByIdAndUpdate(
      id,
      { title, year, genre, watched, rating },
      { new: true, runValidators: true }
    );

    if (!movieUpdated) {
      return res.status(404).json({ erro: 'Filme não encontrado' });
    }

    res.json(movieUpdated);
  } catch (error) {
    console.error('Erro ao atualizar filme:', error);
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
});

// DELETE /api/movies/:id - Elimina um filme
app.delete('/api/movies/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const movieDeleted = await Movie.findByIdAndDelete(id);

    if (!movieDeleted) {
      return res.status(404).json({ erro: 'Filme não encontrado' });
    }

    res.json({ mensagem: 'Filme eliminado com sucesso', movie: movieDeleted });
  } catch (error) {
    console.error('Erro ao eliminar filme:', error);
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
});



// ===== INICIALIZAÇÃO DO SERVIDOR (também não se deve mexer)=====

app.use((req, res) => {
  return handle(req, res);
});

const PORT = process.env.PORT || 3000;

const iniciarServidor = async () => {
  try {
    await connectDB();
    await nextApp.prepare();
    app.listen(PORT, () => {
      console.log(`Servidor Next.js + Express a correr em http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Erro ao iniciar servidor:', error);
    process.exit(1);
  }
};

iniciarServidor();