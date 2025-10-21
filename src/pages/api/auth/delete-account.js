// /src/pages/api/auth/delete-account.js
{/* Esse bloco de código é uma API route do Next.js que permite ao usuário deletar sua conta e todos os filmes associados.
*/}

// Importa função para obter sessão do usuário no servidor
import { getServerSession } from 'next-auth/next';

// Importa configuração do NextAuth para validar sessão
import { authOptions } from './[...nextauth]';

// Importa função para conectar ao MongoDB
import connectDB from '../../../../lib/mongodb';

// Importa modelos do Mongoose
import User from '../../../../models/User';
import Movie from '../../../../models/Movie';

// Função handler da API
export default async function handler(req, res) {

  // Verifica se o método HTTP é DELETE
  if (req.method !== 'DELETE') {
    return res.status(405).json({ message: 'Method not allowed' }); // Retorna erro se não for DELETE
  }

  try {
    // Obtém a sessão do usuário no servidor
    const session = await getServerSession(req, res, authOptions);
    
    if (!session) {
      return res.status(401).json({ message: 'Unauthorized' }); // Retorna erro se não estiver autenticado
    }

    // Conecta ao banco de dados
    await connectDB();

    // Pega o ID do usuário da sessão
    const userId = session.user.id;

    // Deleta todos os filmes associados ao usuário
    await Movie.deleteMany({ userId });

    // Deleta o usuário do banco de dados
    await User.findByIdAndDelete(userId);

    // Retorna mensagem de sucesso
    res.status(200).json({ 
      message: 'Account deleted successfully' 
    });
  } catch (error) {
    // Loga erro no servidor e retorna mensagem de erro
    console.error('Delete account error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}