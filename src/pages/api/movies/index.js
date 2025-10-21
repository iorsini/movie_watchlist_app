// /src/pages/api/movies/index.js
{/* Esse bloco de código é uma API route do Next.js que permite a um usuário listar ou criar filmes 
    no banco de dados MongoDB, garantindo que cada usuário só veja ou crie filmes associados a ele.
*/}

// Importa função para obter a sessão do usuário no servidor
import { getServerSession } from 'next-auth/next';

// Importa configuração do NextAuth para validar sessão
import { authOptions } from '../auth/[...nextauth]';

// Importa função para conectar ao MongoDB
import connectDB from '../../../../lib/mongodb';

// Importa modelo Movie do Mongoose
import Movie from '../../../../models/Movie';

// Função handler da API
export default async function handler(req, res) {

  // Verifica se o usuário está autenticado
  const session = await getServerSession(req, res, authOptions);
  
  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' }); // Retorna erro se não autenticado
  }

  // Pega ID do usuário da sessão
  const userId = session.user.id;

  try {
    // Conecta ao banco de dados
    await connectDB();

    // Listar filmes (GET)
    if (req.method === 'GET') {
      // Busca apenas filmes do usuário logado, ordenados pelo mais recente
      const movies = await Movie.find({ userId }).sort({ createdAt: -1 });
      return res.status(200).json(movies); // Retorna lista de filmes
    }

    // Criar filme (POST)
    if (req.method === 'POST') {
      // Adiciona userId aos dados enviados
      const movieData = { ...req.body, userId };
      
      // Cria novo filme no banco
      const movie = await Movie.create(movieData);
      return res.status(201).json(movie); // Retorna filme criado
    }

    // Método HTTP não permitido
    return res.status(405).json({ message: 'Method not allowed' });
  } catch (error) {
    // Loga erro no servidor e retorna mensagem de erro
    console.error('Movies API error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}