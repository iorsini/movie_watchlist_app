// /src/components/AddMovie.jsx
{/* Esse bloco de código define um componente React chamado AddMovie,
    que é o formulário para adicionar um novo filme à base de dados. */}

// Importa useState do React, usado para criar e gerenciar estado local do componente
import { useState } from 'react'; 

// Importa função que envia os dados do filme para a API
import { addMovie } from '../services/api'; 

// Importa componente para avaliação do filme com estrelas
import StarRating from './StarRating'; 

// Importa função para traduções multilíngues
import { useTranslation } from '../utils/translations'; 

// Componente AddMovie recebe props: 
// onMovieAdded (uma função callback para atualizar lista de filmes) e language (idioma, padrão 'en')
export default function AddMovie({ onMovieAdded, language = 'en' }) {

  // Cria o estado local do formulário, armazenando os valores dos campos
  const [formData, setFormData] = useState({ 
    title: '',      // Campo para título do filme
    year: '',       // Campo para ano de lançamento
    genre: '',      // Campo para gênero do filme
    watched: false, // Indica se o filme já foi assistido
    rating: 0       // Avaliação do filme
  }); 

  // Função de tradução, retorna um objeto com textos traduzidos
  const t = useTranslation(language); 

  // Função chamada quando o usuário marca/desmarca o checkbox "watched"
  const handleWatchedChange = (checked) => { 
    setFormData({ 
      ...formData,           // Mantém os outros dados do formulário
      watched: checked,      // Atualiza o estado watched
      rating: checked ? formData.rating : 0 // Se desmarcado, reseta avaliação para 0
    }); 
  }; 

  // Função chamada quando o usuário clica no botão "Adicionar Filme"
  const handleSubmit = async () => { 
    // Verifica se campos obrigatórios (título e ano) foram preenchidos
    if (formData.title && formData.year) { 
      // Cria objeto com dados do filme para enviar à API
      const movieData = { 
        ...formData,                    // Copia todos os dados do estado
        year: parseInt(formData.year),  // Converte o ano de string para número
        rating: formData.watched ? formData.rating : null // Avaliação somente se filme foi assistido
      }; 
      
      await addMovie(movieData); // Chama a API para adicionar o filme

      alert(t.movieAdded);       // Exibe mensagem de confirmação para o usuário

      // Reseta o formulário para os valores iniciais
      setFormData({ 
        title: '', 
        year: '', 
        genre: '', 
        watched: false, 
        rating: 0 
      }); 

      // Se a função callback onMovieAdded foi passada via props, chama-a para atualizar lista
      if (onMovieAdded) onMovieAdded(); 
    } 
  }; 

  // JSX que define a interface do formulário
  return ( 
    <div className="content-section">
      {/* Título da seção */}
      <h2 className="section-title">{t.addNewMovie}</h2> 

      <div className="movie-form">
        {/* Campo de título */}
        <div className="form-group"> 
          <label>{t.title}</label> {/* Label do campo de título */}
          <input 
            type="text" 
            placeholder={t.title}        // Texto exibido quando o campo está vazio
            value={formData.title}       // Valor controlado pelo estado formData.title
            onChange={(e) =>             // Função chamada quando usuário digita no input
              setFormData({...formData, title: e.target.value}) // Atualiza título no estado
            } 
          /> 
        </div> 

        {/* Linha com ano e gênero */}
        <div className="form-row"> 
          {/* Campo de ano */}
          <div className="form-group"> 
            <label>{t.year}</label> 
            <input 
              type="number" 
              placeholder="2024"           // Sugestão de preenchimento
              value={formData.year}        // Valor controlado pelo estado
              onChange={(e) => 
                setFormData({...formData, year: e.target.value}) // Atualiza ano no estado
              } 
            /> 
          </div> 

          {/* Campo de gênero */}
          <div className="form-group"> 
            <label>{t.genre}</label> 
            <input 
              type="text" 
              placeholder={t.genre}         // Sugestão de preenchimento
              value={formData.genre}        // Valor controlado pelo estado
              onChange={(e) => 
                setFormData({...formData, genre: e.target.value}) // Atualiza gênero no estado
              } 
            /> 
          </div> 
        </div> 

        {/* Checkbox para indicar se o filme já foi assistido */}
        <div className="form-group checkbox-group"> 
          <label className="checkbox-label"> 
            <input 
              type="checkbox" 
              checked={formData.watched} 
              onChange={(e) => handleWatchedChange(e.target.checked)} // Chama função para atualizar watched e rating
            /> 
            <span>{t.alreadyWatched}</span> {/* Texto ao lado do checkbox */}
          </label> 
        </div> 

        {/* Campo de avaliação por estrelas só aparece se o filme foi assistido */}
        {formData.watched && ( 
          <div className="form-group"> 
            <label>{t.rating}</label> 
            <StarRating 
              rating={formData.rating}                // Valor da avaliação
              onRatingChange={(rating) =>             // Função chamada ao mudar a avaliação
                setFormData({...formData, rating})   // Atualiza o estado com nova avaliação
              } 
              language={language}                     // Passa o idioma para o componente StarRating
            /> 
          </div> 
        )} 

        {/* Botão para enviar o formulário */}
        <button onClick={handleSubmit} className="btn-primary">{t.addMovie}</button> 
      </div> 
    </div> 
  ); 
}