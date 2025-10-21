// /src/pages/register.jsx
{/*Esse bloco de código é a página de registro (sign up) da aplicação Next.js.
*/}

// Importa hooks do React para estado e efeitos
import { useState, useEffect } from 'react';
// Importa hook do Next.js para navegação programática
import { useRouter } from 'next/router';
// Importa componente Link do Next.js para navegação interna
import Link from 'next/link';

// Objeto de traduções para suportar múltiplos idiomas (inglês e português)
const translations = {
  en: {
    title: 'Create Account',
    name: 'Name',
    email: 'Email',
    password: 'Password',
    signUp: 'Sign Up',
    creatingAccount: 'Creating account...',
    haveAccount: 'Already have an account?',
    signIn: 'Sign in',
    namePlaceholder: 'Your name',
    emailPlaceholder: 'your@email.com',
    passwordPlaceholder: 'Min. 6 characters',
  },
  pt: {
    title: 'Criar Conta',
    name: 'Nome',
    email: 'Email',
    password: 'Password',
    signUp: 'Criar Conta',
    creatingAccount: 'A criar conta...',
    haveAccount: 'Já tens conta?',
    signIn: 'Entrar',
    namePlaceholder: 'O teu nome',
    emailPlaceholder: 'teu@email.com',
    passwordPlaceholder: 'Mín. 6 caracteres',
  }
};

// Componente principal da página de registro
export default function Register() {
  const router = useRouter(); // Hook para navegação programática
  const [formData, setFormData] = useState({ name: '', email: '', password: '' }); // Estado do formulário
  const [error, setError] = useState(''); // Estado para mensagens de erro
  const [loading, setLoading] = useState(false); // Estado para indicar carregamento do registro
  const [language, setLanguage] = useState('en'); // Estado para controlar idioma da interface

  // Carrega idioma salvo no localStorage ao montar o componente
  useEffect(() => {
    const savedLang = localStorage.getItem('movielist-language') || 'en';
    setLanguage(savedLang);
  }, []);

  const t = translations[language]; // Seleciona traduções com base no idioma atual

  // Função para alterar idioma e salvar no localStorage
  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    localStorage.setItem('movielist-language', lang);
  };

  // Função que lida com envio do formulário de registro
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita reload da página
    setError(''); // Reseta mensagens de erro anteriores
    setLoading(true); // Indica que o registro está em progresso

    try {
      // Chamada à API de registro
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData), // Envia dados do formulário
      });

      const data = await response.json(); // Converte resposta em JSON

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed'); // Lança erro se não for sucesso
      }

      router.push('/login?registered=true'); // Redireciona para login após sucesso
    } catch (err) {
      setError(err.message); // Define mensagem de erro
    } finally {
      setLoading(false); // Finaliza estado de carregamento
    }
  };

  return (
    <>
      {/* Estilos da página */}
      <style>{`
        /* Reset de margens e box-sizing */
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

        /* Container central da página */
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

        /* Título da página de registro */
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

        /* Botão de envio */
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

        /* Rodapé do card de registro */
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

      {/* Container central */}
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

          {/* Formulário de registro */}
          <form onSubmit={handleSubmit}>

            {/* Campo nome */}
            <div className="form-group">
              <label>{t.name}</label>
              <input
                type="text"
                placeholder={t.namePlaceholder}
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>

            {/* Campo email */}
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

            {/* Campo senha */}
            <div className="form-group">
              <label>{t.password}</label>
              <input
                type="password"
                placeholder={t.passwordPlaceholder}
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
                minLength={6} // Define mínimo de 6 caracteres
              />
            </div>

            {/* Botão de envio */}
            <button type="submit" className="btn-auth" disabled={loading}>
              {loading ? t.creatingAccount : t.signUp}
            </button>
          </form>

          {/* Rodapé com link para login */}
          <div className="auth-footer">
            {t.haveAccount} <Link href="/login">{t.signIn}</Link>
          </div>
        </div>
      </div>
    </>
  );
}