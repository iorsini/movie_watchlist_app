// /src/components/WatchedMovies.jsx
{/* Esse bloco de código é o que mostra a lista de filmes que o usuário já assistiu
*/}

// Importa hooks do React para estado e efeito colateral
import { useState, useEffect } from 'react';

// Importa funções para buscar e deletar filmes da API
import { getAllMovies, deleteMovie } from '../services/api';

// Importa função para traduções multilíngues
import { useTranslation } from '../utils/translations';

// Componente WatchedMovies recebe props:
// onEditClick (callback quando o usuário clica em "Editar") e language (idioma, padrão 'en')
export default function WatchedMovies({ onEditClick, language = 'en' }) {

  // Estado local que armazena os filmes que já foram assistidos
  const [movies, setMovies] = useState([]);

  // Função de tradução baseada no idioma selecionado
  const t = useTranslation(language);

  // useEffect executa ao montar o componente (equivalente a componentDidMount)
  useEffect(() => {
    loadWatchedMovies(); // Carrega filmes assistidos
  }, []); // Array vazio significa que executa apenas uma vez ao montar

  // Função para buscar filmes assistidos da API
  const loadWatchedMovies = async () => {
    const data = await getAllMovies(); // Busca todos os filmes
    const watched = data.filter(movie => movie.watched === true); // Filtra apenas os assistidos
    setMovies(watched); // Atualiza estado com a lista filtrada
  };

  // Função chamada ao clicar no botão "Deletar"
  const handleDelete = async (id) => {
    if (confirm(t.deleteMovieConfirm)) { // Confirmação do usuário
      await deleteMovie(id);             // Deleta o filme na API
      loadWatchedMovies();               // Recarrega a lista atualizada
    }
  };

  // JSX que define a interface da lista de filmes assistidos
  return (
    <div className="content-section">
      {/* Título da seção */}
      <h2 className="section-title">{t.watched}</h2>

      {/* Mensagem quando não há filmes assistidos */}
      {movies.length === 0 && <p className="empty-state">{t.noWatchedMovies}</p>}

      {/* Grid de filmes */}
      <div className="movie-grid">
        {movies.map(movie => (
          <div key={movie._id} className="movie-card">
            
            {/* Espaço para pôster */}
            <div className="movie-poster">
              <div className="poster-placeholder">🎬</div> {/* Placeholder */}
            </div>

            {/* Informações do filme */}
            <div className="movie-info">
              <h3 className="movie-title">{movie.title}</h3>   {/* Título */}
              <p className="movie-year">{movie.year}</p>      {/* Ano */}
              <p className="movie-genre">{movie.genre}</p>    {/* Gênero */}

              {/* Meta informações: rating */}
              <div className="movie-meta">
                {movie.rating > 0 && (  // Mostra rating apenas se maior que 0
                  <span className="rating-badge">★ {movie.rating}/10</span>
                )}
              </div>

              {/* Ações do usuário: editar ou deletar */}
              <div className="movie-actions">
                <button onClick={() => onEditClick(movie)} className="btn-secondary">
                  {t.edit}  {/* Botão editar */}
                </button>
                <button onClick={() => handleDelete(movie._id)} className="btn-danger">
                  {t.delete} {/* Botão deletar */}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}