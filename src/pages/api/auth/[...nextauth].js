// /src/pages/api/auth/[...nextauth.js]
{/* Esse bloco de código é uma configuração de autenticação usando o NextAuth.js em um projeto Next.js, 
    com login via credenciais (email e senha) e integração com um banco de dados MongoDB.
*/}

// Importa NextAuth para configuração de autenticação
import NextAuth from 'next-auth';

// Importa provider de credenciais (email e senha)
import CredentialsProvider from 'next-auth/providers/credentials';

// Importa bcrypt para comparar senhas criptografadas
import bcrypt from 'bcryptjs';

// Importa função para conectar ao MongoDB
import connectDB from '../../../../lib/mongodb';

// Importa modelo User do Mongoose
import User from '../../../../models/User';

// Configuração do NextAuth
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials', // Nome do provider
      credentials: {       // Campos de login
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      // Função que autentica o usuário
      async authorize(credentials) {
        await connectDB(); // Conecta ao banco de dados

        // Busca usuário pelo email fornecido
        const user = await User.findOne({ email: credentials.email });
        
        if (!user) {
          throw new Error('No user found with this email'); // Erro se usuário não existir
        }
        
        // Compara senha fornecida com a senha criptografada no banco
        const isValid = await bcrypt.compare(credentials.password, user.password);
        
        if (!isValid) {
          throw new Error('Invalid password'); // Erro se senha inválida
        }
        
        // Retorna dados do usuário que serão incluídos no token JWT
        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email
        };
      }
    })
  ],
  // Configuração de sessão usando JWT
  session: {
    strategy: 'jwt', // A sessão será gerenciada via JSON Web Token
  },
  // Callbacks para manipular token e sessão
  callbacks: {
    // Callback chamado ao gerar o JWT
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; // Adiciona o id do usuário ao token
      }
      return token;
    },
    // Callback chamado ao criar a sessão do usuário
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id; // Adiciona o id do usuário à sessão
      }
      return session;
    }
  },
  // Páginas customizadas
  pages: {
    signIn: '/login', // Página de login customizada
  },
  // Chave secreta para assinar tokens e sessões
  secret: process.env.NEXTAUTH_SECRET,
};

// Exporta NextAuth com as opções configuradas
export default NextAuth(authOptions);