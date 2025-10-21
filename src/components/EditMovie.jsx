// /src/components/EditMovie.jsx
{/* Esse bloco de código é responsável por editar um filme existente no aplicativo.
    Ele tem foco em atualizar um filme que já existe no banco de dados.
*/}

// Importa hooks do React para estado e efeito colateral
import { useState, useEffect } from 'react';

// Importa função para atualizar o filme na API
import { updateMovie } from '../services/api';

// Importa componente para avaliação do filme com estrelas
import StarRating from './StarRating';

// Importa função para traduções multilíngues
import { useTranslation } from '../utils/translations';

// Componente EditMovie recebe props: 
// movie (filme a ser editado), onMovieUpdated (callback ao atualizar) e language (idioma, padrão 'en')
export default function EditMovie({ movie, onMovieUpdated, language = 'en' }) {

  // Estado local do formulário, inicializado com valores vazios
  const [formData, setFormData] = useState({
    title: '',      // Título do filme
    year: '',       // Ano de lançamento
    genre: '',      // Gênero do filme
    watched: false, // Indica se o filme já foi assistido
    rating: 0       // Avaliação do filme (0 a 5)
  });

  // Função de tradução baseada no idioma selecionado
  const t = useTranslation(language);

  // useEffect para atualizar o formulário quando a prop "movie" muda
  useEffect(() => {
    if (movie) {
      setFormData({
        title: movie.title,                // Preenche o título
        year: movie.year,                  // Preenche o ano
        genre: movie.genre,                // Preenche o gênero
        watched: movie.watched,            // Preenche se já foi assistido
        rating: movie.rating || 0          // Preenche avaliação ou 0 se não existir
      });
    }
  }, [movie]); // Executa sempre que "movie" mudar

  // Função chamada quando o checkbox "watched" é alterado
  const handleWatchedChange = (checked) => {
    setFormData({
      ...formData,           // Mantém os outros dados do formulário
      watched: checked,      // Atualiza watched
      rating: checked ? formData.rating : 0 // Reseta rating se desmarcado
    });
  };

  // Função chamada ao clicar no botão "Salvar"
  const handleSubmit = async () => {
    // Prepara os dados do filme para enviar à API
    const movieData = {
      ...formData,                      // Copia todos os dados do formulário
      year: parseInt(formData.year),    // Converte o ano para número
      rating: formData.watched ? formData.rating : null // Avaliação somente se assistido
    };
    
    await updateMovie(movie._id, movieData); // Chama a API para atualizar o filme
    alert(t.movieUpdated);                   // Exibe mensagem de confirmação
    if (onMovieUpdated) onMovieUpdated();    // Chama callback para atualizar lista de filmes
  };

  // Caso não haja filme selecionado, mostra mensagem
  if (!movie) return <p className="empty-state">{t.noMovies}</p>;

  // JSX que define a interface do formulário de edição
  return (
    <div className="content-section">
      {/* Título da seção */}
      <h2 className="section-title">{t.editMovie}</h2>

      <div className="movie-form">
        {/* Campo de título */}
        <div className="form-group">
          <label>{t.title}</label>
          <input
            type="text"
            value={formData.title} // Valor controlado pelo estado
            onChange={(e) => setFormData({...formData, title: e.target.value})} // Atualiza título no estado
          />
        </div>

        {/* Linha com ano e gênero */}
        <div className="form-row">
          {/* Campo de ano */}
          <div className="form-group">
            <label>{t.year}</label>
            <input
              type="number"
              value={formData.year} // Valor controlado pelo estado
              onChange={(e) => setFormData({...formData, year: e.target.value})} // Atualiza ano no estado
            />
          </div>

          {/* Campo de gênero */}
          <div className="form-group">
            <label>{t.genre}</label>
            <input
              type="text"
              value={formData.genre} // Valor controlado pelo estado
              onChange={(e) => setFormData({...formData, genre: e.target.value})} // Atualiza gênero no estado
            />
          </div>
        </div>

        {/* Checkbox para indicar se o filme já foi assistido */}
        <div className="form-group checkbox-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={formData.watched} // Valor controlado pelo estado
              onChange={(e) => handleWatchedChange(e.target.checked)} // Chama função ao alterar
            />
            <span>{t.alreadyWatched}</span> {/* Texto ao lado do checkbox */}
          </label>
        </div>
        
        {/* Campo de avaliação por estrelas só aparece se o filme foi assistido */}
        {formData.watched && (
          <div className="form-group">
            <label>{t.rating}</label>
            <StarRating 
              rating={formData.rating} // Valor da avaliação
              onRatingChange={(rating) => setFormData({...formData, rating})} // Atualiza rating no estado
              language={language} // Passa idioma para o componente StarRating
            />
          </div>
        )}
        
        {/* Botão para salvar alterações */}
        <button onClick={handleSubmit} className="btn-primary">{t.save}</button>
      </div>
    </div>
  );
}