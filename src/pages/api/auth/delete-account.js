import { getServerSession } from 'next-auth/next';
import { authOptions } from './[...nextauth]';
import connectDB from '../../../../lib/mongodb';
import User from '../../../../models/User';
import Movie from '../../../../models/Movie';

export default async function handler(req, res) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const session = await getServerSession(req, res, authOptions);
    
    if (!session) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    await connectDB();

    const userId = session.user.id;

    // Deletar todos os filmes do user
    await Movie.deleteMany({ userId });

    // Deletar o user
    await User.findByIdAndDelete(userId);

    res.status(200).json({ 
      message: 'Account deleted successfully' 
    });
  } catch (error) {
    console.error('Delete account error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}