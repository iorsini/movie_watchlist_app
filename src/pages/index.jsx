// /src/pages/index.jsx

{/*Comentário geral explicando que este arquivo é a página principal da aplicação React/Next.js,
integrando autenticação, visualização e edição de filmes, e configurações do usuário.*/}

import { useState } from "react"; // Importa o hook useState do React para criar estados dentro do componente
import { useSession, signOut } from "next-auth/react"; // Importa hooks do NextAuth: useSession para pegar sessão do usuário e signOut para logout
import { useRouter } from "next/router"; // Importa useRouter para navegação programática
import { useTranslation } from "../utils/translations"; // Importa função de tradução customizada
import AllMovies from "../components/AllMovies"; // Importa componente que mostra todos os filmes
import WatchedMovies from "../components/WatchedMovies"; // Importa componente que mostra filmes assistidos
import NotWatchedMovies from "../components/NotWatchedMovies"; // Importa componente que mostra filmes não assistidos
import MoviesByRating from "../components/MoviesByRating"; // Importa componente que mostra filmes por avaliação
import AddMovie from "../components/AddMovie"; // Importa componente de adicionar novo filme
import EditMovie from "../components/EditMovie"; // Importa componente de editar filme

// Componente funcional principal da página Home
export default function Home() {
  // Pega os dados da sessão e status de autenticação
  const { data: session, status } = useSession(); 
  const router = useRouter(); // Inicializa o router para navegação
  const [activeView, setActiveView] = useState("all"); // Estado que controla a aba ativa de filmes
  const [selectedMovie, setSelectedMovie] = useState(null); // Estado para armazenar filme selecionado para edição
  const [refreshKey, setRefreshKey] = useState(0); // Chave usada para forçar atualização de componentes de lista
  const [language, setLanguage] = useState("en"); // Estado de idioma da interface
  const [showSettings, setShowSettings] = useState(false); // Estado que controla exibição do modal de configurações
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Estado que controla exibição do modal de deletar conta
  const [isDeleting, setIsDeleting] = useState(false); // Estado para indicar se a conta está sendo deletada

  const t = useTranslation(language); // Inicializa objeto de traduções baseado no idioma atual

  // Redireciona se o status da sessão ainda estiver carregando
  if (status === "loading") {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0a",
          color: "#fff",
        }}
      >
        Loading...
      </div>
    );
  }

  // Redireciona para login se o usuário não estiver autenticado
  if (status === "unauthenticated") {
    router.push("/login");
    return null;
  }

  // Função chamada ao clicar para editar um filme
  const handleEditClick = (movie) => {
    setSelectedMovie(movie); // Define o filme selecionado
    setActiveView("edit"); // Muda a view para edição
  };

  // Função chamada após adicionar ou atualizar filme
  const handleUpdate = () => {
    setRefreshKey((prev) => prev + 1); // Incrementa refreshKey para atualizar listas
    setActiveView("all"); // Volta para a view de todos os filmes
  };

  // Função assíncrona para deletar a conta do usuário
  const handleDeleteAccount = async () => {
    setIsDeleting(true); // Indica que a deleção está em andamento
    try {
      const response = await fetch("/api/auth/delete-account", {
        method: "DELETE", // Requisição DELETE para API
      });

      if (response.ok) { // Se a requisição foi bem-sucedida
        alert(t.accountDeleted); // Mostra mensagem de conta deletada
        signOut({ callbackUrl: "/login" }); // Faz logout e redireciona para login
      } else {
        alert("Error deleting account"); // Mostra erro se requisição falhar
      }
    } catch (error) {
      alert("Error deleting account"); // Captura erros de rede ou outros
    } finally {
      setIsDeleting(false); // Reseta estado de deleção
    }
  };

  return (
    <>
      {/* Estilos globais e específicos da página */}
      <style>{` /* CSS em JS que estiliza toda a página e componentes */ `}</style>

      {/* Container principal da aplicação */}
      <div className="app-container">
        {/* Cabeçalho fixo da aplicação */}
        <header className="header">
          <div className="header-content">
            <div className="header-top">
              {/* Logo da aplicação */}
              <div className="logo">🎬 MOVIELIST</div>

              {/* Informações do usuário e botões de ações */}
              <div className="user-info">
                <span className="user-name">
                  {t.hi}, {session.user.name}! {/* Saudação personalizada */}
                </span>
                <button
                  onClick={() => setShowSettings(true)} // Abre modal de configurações
                  className="btn-settings"
                  title={t.settings}
                >
                  ⚙️
                </button>
                <button onClick={() => signOut()} className="btn-logout">
                  {t.logout} {/* Botão de logout */}
                </button>
              </div>
            </div>

            {/* Menu de navegação entre visualizações de filmes */}
            <nav className="nav">
              <button
                className={`nav-btn ${activeView === "all" ? "active" : ""}`} 
                onClick={() => setActiveView("all")} // Mostra todos os filmes
              >
                {t.allMovies}
              </button>
              <button
                className={`nav-btn ${activeView === "watched" ? "active" : ""}`}
                onClick={() => setActiveView("watched")} // Mostra filmes assistidos
              >
                {t.watched}
              </button>
              <button
                className={`nav-btn ${activeView === "notWatched" ? "active" : ""}`}
                onClick={() => setActiveView("notWatched")} // Mostra filmes não assistidos
              >
                {t.toWatch}
              </button>
              <button
                className={`nav-btn ${activeView === "byRating" ? "active" : ""}`}
                onClick={() => setActiveView("byRating")} // Mostra filmes por avaliação
              >
                {t.topRated}
              </button>
            </nav>
          </div>
        </header>

        {/* Conteúdo principal da página */}
        <main className="content">
          {/* Renderiza componente de acordo com a aba ativa */}
          {activeView === "all" && (
            <AllMovies
              onEditClick={handleEditClick} // Função de editar
              key={refreshKey} // Chave para forçar atualização
              language={language} // Idioma
            />
          )}
          {activeView === "watched" && (
            <WatchedMovies
              onEditClick={handleEditClick}
              key={refreshKey}
              language={language}
            />
          )}
          {activeView === "notWatched" && (
            <NotWatchedMovies
              onEditClick={handleEditClick}
              key={refreshKey}
              language={language}
            />
          )}
          {activeView === "byRating" && (
            <MoviesByRating key={refreshKey} language={language} />
          )}
          {activeView === "add" && (
            <AddMovie onMovieAdded={handleUpdate} language={language} />
          )}
          {activeView === "edit" && (
            <EditMovie
              movie={selectedMovie} // Filme a ser editado
              onMovieUpdated={handleUpdate} // Callback após atualizar
              language={language}
            />
          )}
        </main>

        {/* Botão flutuante para adicionar filme */}
        <div className="fab-container">
          <button
            className={`fab ${activeView === "add" ? "active" : ""}`}
            onClick={() => setActiveView(activeView === "add" ? "all" : "add")}
            title={t.addMovie}
          >
            +
          </button>
        </div>

        {/* Modal de configurações */}
        {showSettings && (
          <div className="modal-overlay" onClick={() => setShowSettings(false)}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <h2 className="modal-header">{t.settings}</h2>

              {/* Seção de seleção de idioma */}
              <div className="modal-section">
                <div className="modal-section-title">{t.language}</div>
                <div className="language-buttons">
                  <button
                    className={`lang-button ${language === "en" ? "active" : ""}`}
                    onClick={() => setLanguage("en")}
                  >
                    English
                  </button>
                  <button
                    className={`lang-button ${language === "pt" ? "active" : ""}`}
                    onClick={() => setLanguage("pt")}
                  >
                    Português
                  </button>
                </div>
              </div>

              {/* Seção da área de perigo (deleção de conta) */}
              <div className="modal-section">
                <div className="danger-zone">
                  <div className="danger-zone-title">{t.dangerZone}</div>
                  <div className="danger-zone-text">{t.dangerZoneWarning}</div>
                  <button
                    className="btn-danger-full"
                    onClick={() => {
                      setShowSettings(false);
                      setShowDeleteModal(true);
                    }}
                  >
                    {t.deleteAccount}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal de confirmação de deleção de conta */}
        {showDeleteModal && (
          <div
            className="modal-overlay"
            onClick={() => setShowDeleteModal(false)}
          >
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <h2 className="modal-header">⚠️ {t.deleteAccount}</h2>
              <div className="delete-modal-warning">
                {t.deleteAccountConfirm}
              </div>
              <div className="modal-footer">
                <button
                  className="btn-modal btn-cancel"
                  onClick={() => setShowDeleteModal(false)}
                >
                  {t.cancel}
                </button>
                <button
                  className="btn-modal btn-confirm-delete"
                  onClick={handleDeleteAccount}
                  disabled={isDeleting} // Desabilita botão enquanto deletando
                >
                  {isDeleting ? "Deleting..." : t.confirm}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}