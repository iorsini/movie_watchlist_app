// /src/components/StarRating.jsx
{/* Esse bloco de código é o componente de estrelas de avaliação.
    Ele permite que o usuário avalie um filme clicando em 1 a 10 estrelas.
*/}

// Importa hook useState do React para gerenciar estado local
import { useState } from 'react';

// Importa função para traduções multilíngues
import { useTranslation } from '../utils/translations';

// Componente StarRating recebe props:
// rating (nota atual), onRatingChange (callback quando usuário altera rating)
// language (idioma, padrão 'en')
export default function StarRating({ rating, onRatingChange, language = 'en' }) {

  // Estado local para armazenar a estrela sobre a qual o usuário está passando o mouse
  const [hover, setHover] = useState(0);

  // Função de tradução baseada no idioma selecionado
  const t = useTranslation(language);

  // JSX que define a interface das estrelas de avaliação
  return (
    <div className="star-rating">
      
      {/* Mapeia números de 1 a 10 para criar 10 estrelas clicáveis */}
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
        <span
          key={star} // Chave única para cada estrela no map
          
          // Ao clicar em uma estrela, chama callback para atualizar rating
          onClick={() => onRatingChange(star)}
          
          // Ao passar o mouse, atualiza estado hover para destacar estrelas
          onMouseEnter={() => setHover(star)}
          
          // Ao retirar o mouse, reseta hover para 0
          onMouseLeave={() => setHover(0)}
          
          // Define a classe da estrela: preenchida se for menor ou igual ao hover ou rating
          className={star <= (hover || rating) ? 'star filled' : 'star'}
        >
          ★ {/* Símbolo da estrela */}
        </span>
      ))}

      {/* Mostra a nota atual ou texto para selecionar rating */}
      <span className="rating-display">
        {rating ? `${rating}/10` : t.selectRating}
      </span>
    </div>
  );
}