// /src/pages/login.jsx
{/*Esse bloco de código é a página de login da aplicação Next.js com autenticação via next-auth.
*/}

import { useState, useEffect } from 'react'; // Importa hooks do React para manipulação de estado e efeitos colaterais
import { signIn } from 'next-auth/react'; // Importa função de login do next-auth
import { useRouter } from 'next/router'; // Importa hook do Next.js para navegação programática
import Link from 'next/link'; // Importa componente Link do Next.js para navegação interna

// Objeto de traduções para suportar múltiplos idiomas
const translations = {
  en: {
    title: 'Welcome Back',
    email: 'Email',
    password: 'Password',
    signIn: 'Sign In',
    signingIn: 'Signing in...',
    noAccount: "Don't have an account?",
    signUp: 'Sign up',
    emailPlaceholder: 'your@email.com',
    passwordPlaceholder: '••••••••',
  },
  pt: {
    title: 'Bem-vindo',
    email: 'Email',
    password: 'Palavra-passe',
    signIn: 'Entrar',
    signingIn: 'A entrar...',
    noAccount: 'Não tens conta?',
    signUp: 'Criar conta',
    emailPlaceholder: 'teu@email.com',
    passwordPlaceholder: '••••••••',
  }
};

export default function Login() {
  const router = useRouter(); // Hook para navegação programática
  const [formData, setFormData] = useState({ email: '', password: '' }); // Estado para armazenar dados do formulário
  const [error, setError] = useState(''); // Estado para mensagens de erro
  const [loading, setLoading] = useState(false); // Estado para indicar carregamento do login
  const [language, setLanguage] = useState('en'); // Estado para controlar idioma da interface

  // Hook para carregar idioma salvo no localStorage ao montar o componente
  useEffect(() => {
    const savedLang = localStorage.getItem('movielist-language') || 'en';
    setLanguage(savedLang);
  }, []);

  const t = translations[language]; // Seleciona as traduções com base no idioma atual

  // Função para alterar idioma e salvar no localStorage
  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    localStorage.setItem('movielist-language', lang);
  };

  // Função que lida com envio do formulário de login
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita reload da página
    setError(''); // Reseta erros anteriores
    setLoading(true); // Indica que o login está em progresso

    try {
      const result = await signIn('credentials', { // Chama função do next-auth para login com credenciais
        redirect: false, // Evita redirecionamento automático
        email: formData.email, // Passa email do formulário
        password: formData.password, // Passa senha do formulário
      });

      if (result.error) {
        setError(result.error); // Exibe erro retornado pelo next-auth
      } else {
        router.push('/'); // Redireciona para página principal após login
      }
    } catch (err) {
      setError('Something went wrong'); // Mensagem de erro genérica
    } finally {
      setLoading(false); // Finaliza estado de carregamento
    }
  };

  return (
    <>
      <style>{`
        /* Reset e estilo global */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          background: #0a0a0a;
          color: #fff;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        /* Container centralizado da página de login */
        .auth-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(to bottom, #141414 0%, #0a0a0a 100%);
          padding: 20px;
        }

        /* Card de autenticação */
        .auth-card {
          width: 100%;
          max-width: 450px;
          background: rgba(255, 255, 255, 0.05);
          padding: 48px 40px;
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
        }

        /* Seleção de idioma */
        .language-selector {
          display: flex;
          justify-content: center;
          gap: 12px;
          margin-bottom: 24px;
        }

        /* Botões de idioma */
        .lang-btn {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #fff;
          padding: 8px 16px;
          border-radius: 6px;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .lang-btn:hover {
          background: rgba(255, 255, 255, 0.12);
        }

        .lang-btn.active {
          background: rgba(229, 9, 20, 0.2);
          border-color: #e50914;
          color: #e50914;
        }

        /* Logo da aplicação */
        .auth-logo {
          font-size: 32px;
          font-weight: 700;
          background: linear-gradient(135deg, #e50914 0%, #ff6b6b 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-align: center;
          margin-bottom: 12px;
          letter-spacing: 1px;
        }

        /* Título da página de login */
        .auth-title {
          font-size: 28px;
          font-weight: 700;
          text-align: center;
          margin-bottom: 32px;
          color: #fff;
        }

        /* Grupos de campos do formulário */
        .form-group {
          margin-bottom: 24px;
        }

        .form-group label {
          display: block;
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 8px;
          color: #b3b3b3;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        /* Inputs do formulário */
        .form-group input {
          width: 100%;
          padding: 14px 16px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 8px;
          color: #fff;
          font-size: 15px;
          transition: all 0.3s ease;
        }

        .form-group input:focus {
          outline: none;
          border-color: #e50914;
          background: rgba(255, 255, 255, 0.12);
          box-shadow: 0 0 0 3px rgba(229, 9, 20, 0.1);
        }

        /* Mensagem de erro */
        .error-message {
          background: rgba(229, 9, 20, 0.15);
          border: 1px solid rgba(229, 9, 20, 0.3);
          color: #ff6b6b;
          padding: 12px 16px;
          border-radius: 8px;
          margin-bottom: 20px;
          font-size: 14px;
          text-align: center;
        }

        /* Botão de login */
        .btn-auth {
          width: 100%;
          padding: 14px;
          background: linear-gradient(135deg, #e50914 0%, #c20812 100%);
          color: #fff;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .btn-auth:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(229, 9, 20, 0.4);
        }

        .btn-auth:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        /* Rodapé do card de login */
        .auth-footer {
          text-align: center;
          margin-top: 24px;
          color: #999;
          font-size: 14px;
        }

        .auth-footer a {
          color: #e50914;
          text-decoration: none;
          font-weight: 600;
          transition: color 0.2s;
        }

        .auth-footer a:hover {
          color: #ff6b6b;
        }
      `}</style>

      {/* Container central da página */}
      <div className="auth-container">
        <div className="auth-card">

          {/* Seleção de idioma */}
          <div className="language-selector">
            <button
              className={`lang-btn ${language === 'en' ? 'active' : ''}`}
              onClick={() => handleLanguageChange('en')}
            >
              EN
            </button>
            <button
              className={`lang-btn ${language === 'pt' ? 'active' : ''}`}
              onClick={() => handleLanguageChange('pt')}
            >
              PT
            </button>
          </div>

          {/* Logo e título */}
          <div className="auth-logo">🎬 MOVIELIST</div>
          <h1 className="auth-title">{t.title}</h1>

          {/* Mensagem de erro */}
          {error && <div className="error-message">{error}</div>}

          {/* Formulário de login */}
          <form onSubmit={handleSubmit}>
            {/* Campo de email */}
            <div className="form-group">
              <label>{t.email}</label>
              <input
                type="email"
                placeholder={t.emailPlaceholder}
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>

            {/* Campo de senha */}
            <div className="form-group">
              <label>{t.password}</label>
              <input
                type="password"
                placeholder={t.passwordPlaceholder}
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
              />
            </div>

            {/* Botão de envio */}
            <button type="submit" className="btn-auth" disabled={loading}>
              {loading ? t.signingIn : t.signIn}
            </button>
          </form>

          {/* Rodapé com link para registrar */}
          <div className="auth-footer">
            {t.noAccount} <Link href="/register">{t.signUp}</Link>
          </div>
        </div>
      </div>
    </>
  );
}