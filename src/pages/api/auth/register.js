// /src/pages/api/auth/register.js
{/* Esse bloco de código é uma API route do Next.js responsável por registrar (cadastrar) um novo usuário no banco de dados MongoDB.
*/}

// Importa bcrypt para criar hash da senha
import bcrypt from 'bcryptjs';

// Importa função para conectar ao MongoDB
import connectDB from '../../../../lib/mongodb';

// Importa modelo User do Mongoose
import User from '../../../../models/User';

// Função handler da API
export default async function handler(req, res) {

  // Verifica se o método HTTP é POST
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' }); // Retorna erro se não for POST
  }

  try {
    // Conecta ao banco de dados
    await connectDB();

    // Extrai dados do corpo da requisição
    const { name, email, password } = req.body;

    // Validações dos campos
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' }); // Campos obrigatórios
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' }); // Senha mínima
    }

    // Verifica se já existe usuário com o mesmo email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' }); // Retorna erro se email já cadastrado
    }

    // Cria hash da senha para segurança
    const hashedPassword = await bcrypt.hash(password, 12);

    // Cria novo usuário no banco
    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    // Retorna sucesso e dados do usuário criado
    res.status(201).json({
      message: 'User created successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    // Loga erro no servidor e retorna mensagem de erro
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}