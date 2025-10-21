// /src/components/AllMovies.jsx
{/* Esse bloco de código é responsável por listar todos os filmes cadastrados, 
    além de permitir editar ou deletar cada um.
*/}

// Importa hooks do React para estado e efeito colateral
import { useState, useEffect } from 'react';

// Importa funções para buscar e deletar filmes da API
import { getAllMovies, deleteMovie } from '../services/api';

// Importa função para traduções multilíngues
import { useTranslation } from '../utils/translations';

// Componente AllMovies recebe props:
// onEditClick (callback quando o usuário clica em "Editar") e language (idioma, padrão 'en')
export default function AllMovies({ onEditClick, language = 'en' }) {

  // Estado local que armazena a lista de filmes
  const [movies, setMovies] = useState([]); 

  // Função de tradução baseada no idioma selecionado
  const t = useTranslation(language); 

  // useEffect executa ao montar o componente (equivalente a componentDidMount)
  useEffect(() => {
    loadMovies(); // Carrega a lista de filmes da API
  }, []); // Array vazio significa que executa apenas uma vez ao montar

  // Função para carregar todos os filmes da API
  const loadMovies = async () => {
    const data = await getAllMovies(); // Busca filmes da API
    setMovies(data); // Atualiza estado com a lista de filmes
  };

  // Função chamada ao clicar no botão "Deletar"
  const handleDelete = async (id) => {
    // Pergunta ao usuário se deseja realmente deletar o filme
    if (confirm(t.deleteMovieConfirm)) {
      await deleteMovie(id); // Chama a API para deletar o filme pelo ID
      loadMovies();          // Recarrega a lista de filmes atualizada
    }
  };

  // JSX que define a interface da lista de filmes
  return (
    <div className="content-section">
      {/* Título da seção */}
      <h2 className="section-title">{t.allMovies}</h2>

      {/* Mensagem quando não há filmes cadastrados */}
      {movies.length === 0 && <p className="empty-state">{t.noMovies}</p>}

      {/* Grid que exibe cada filme como um cartão */}
      <div className="movie-grid">
        {movies.map(movie => (
          <div key={movie._id} className="movie-card">
            
            {/* Espaço para o pôster do filme */}
            <div className="movie-poster">
              <div className="poster-placeholder">🎬</div> {/* Ícone placeholder */}
            </div>

            {/* Informações do filme */}
            <div className="movie-info">
              <h3 className="movie-title">{movie.title}</h3> {/* Título */}
              <p className="movie-year">{movie.year}</p>    {/* Ano */}
              <p className="movie-genre">{movie.genre}</p>  {/* Gênero */}

              {/* Meta informações: status assistido e avaliação */}
              <div className="movie-meta">
                {/* Badge mostrando se o filme foi assistido */}
                <span className={`status-badge ${movie.watched ? 'watched' : 'unwatched'}`}>
                  {movie.watched ? `✓ ${t.watched}` : t.toWatch}
                </span>

                {/* Badge de avaliação, aparece somente se rating > 0 */}
                {movie.rating > 0 && (
                  <span className="rating-badge">★ {movie.rating}/10</span>
                )}
              </div>

              {/* Ações do usuário: editar ou deletar */}
              <div className="movie-actions">
                {/* Botão de editar */}
                <button onClick={() => onEditClick(movie)} className="btn-secondary">
                  {t.edit}
                </button>

                {/* Botão de deletar */}
                <button onClick={() => handleDelete(movie._id)} className="btn-danger">
                  {t.delete}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}