// /src/components/MoviesByRating.jsx
{/* Esse bloco de código é o componente de filmes ordenados por avaliação (rating).
    Ele mostra um “ranking” dos melhores filmes que o usuário avaliou.
*/}

// Importa hooks do React para estado e efeito colateral
import { useState, useEffect } from 'react';

// Importa função para buscar todos os filmes da API
import { getAllMovies } from '../services/api';

// Importa função para traduções multilíngues
import { useTranslation } from '../utils/translations';

// Componente MoviesByRating recebe prop language (idioma, padrão 'en')
export default function MoviesByRating({ language = 'en' }) {

  // Estado local que armazena os filmes filtrados e ordenados por avaliação
  const [movies, setMovies] = useState([]);

  // Função de tradução baseada no idioma selecionado
  const t = useTranslation(language);

  // useEffect executa ao montar o componente (equivalente a componentDidMount)
  useEffect(() => {
    loadMoviesByRating(); // Carrega filmes ordenados por rating
  }, []); // Array vazio significa que executa apenas uma vez ao montar

  // Função para carregar, filtrar e ordenar filmes por avaliação
  const loadMoviesByRating = async () => {
    const data = await getAllMovies(); // Busca todos os filmes da API

    // Filtra apenas filmes que possuem rating maior que 0
    const withRating = data.filter(movie => movie.rating && movie.rating > 0);

    // Ordena os filmes do maior para o menor rating
    const sorted = withRating.sort((a, b) => b.rating - a.rating);

    // Atualiza o estado com a lista ordenada
    setMovies(sorted);
  };

  // JSX que define a interface do ranking de filmes
  return (
    <div className="content-section">
      {/* Título da seção */}
      <h2 className="section-title">{t.topRated}</h2>

      {/* Mensagem quando não há filmes avaliados */}
      {movies.length === 0 && <p className="empty-state">{t.noRatedMovies}</p>}

      {/* Lista de filmes ordenados */}
      <div className="movie-list">
        {movies.map((movie, index) => (
          <div key={movie._id} className="movie-list-item">
            
            {/* Exibe a posição do filme no ranking */}
            <div className="rank">#{index + 1}</div>

            {/* Informações do filme */}
            <div className="movie-list-info">
              <h3>{movie.title}</h3>           {/* Título do filme */}
              <p>{movie.year} • {movie.genre}</p> {/* Ano e gênero */}
            </div>

            {/* Avaliação grande do filme */}
            <div className="rating-large">★ {movie.rating}/10</div>
          </div>
        ))}
      </div>
    </div>
  );
}