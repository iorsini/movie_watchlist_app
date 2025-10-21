// /src/pages/api/movies/[id].js
{/* Esse bloco de código é uma API route do Next.js que permite a um usuário atualizar ou deletar um filme específico no banco de dados MongoDB, desde que o filme pertença a ele.
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

  // Obtém sessão do usuário a partir da requisição
  const session = await getServerSession(req, res, authOptions);
  
  // Verifica se usuário está autenticado
  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' }); // Retorna erro se não autenticado
  }

  // Pega ID do usuário da sessão
  const userId = session.user.id;

  // Extrai ID do filme da URL
  const { id } = req.query;

  try {
    // Conecta ao banco de dados
    await connectDB();

    // Atualiza filme (PUT)
    if (req.method === 'PUT') {
      // Só atualiza se o filme pertencer ao usuário
      const movie = await Movie.findOneAndUpdate(
        { _id: id, userId }, // Filtra pelo ID do filme e do usuário
        req.body,            // Atualiza com os dados enviados no corpo da requisição
        { new: true }        // Retorna o documento atualizado
      );
      
      if (!movie) {
        return res.status(404).json({ message: 'Movie not found' }); // Retorna erro se filme não encontrado
      }
      
      return res.status(200).json(movie); // Retorna filme atualizado
    }

    // Deleta filme (DELETE)
    if (req.method === 'DELETE') {
      // Só deleta se o filme pertencer ao usuário
      const movie = await Movie.findOneAndDelete({ _id: id, userId });
      
      if (!movie) {
        return res.status(404).json({ message: 'Movie not found' }); // Retorna erro se filme não encontrado
      }
      
      return res.status(200).json({ message: 'Movie deleted' }); // Retorna sucesso na deleção
    }

    // Método HTTP não permitido
    return res.status(405).json({ message: 'Method not allowed' });
  } catch (error) {
    // Loga erro no servidor e retorna mensagem de erro
    console.error('Movie API error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}