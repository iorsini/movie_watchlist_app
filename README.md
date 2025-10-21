🎬 MOVIELIST

Uma aplicação fullstack moderna para gerenciar sua lista de filmes favoritos

[Demo ao Vivo](https://movie-watchlist-app-cu4r.vercel.app/)

✨ Sobre o Projeto
MOVIELIST é uma aplicação fullstack que permite criar e gerenciar sua lista pessoal de filmes de forma intuitiva e eficiente. 
Construída com as tecnologias mais modernas do ecossistema JavaScript, oferece uma experiência fluida tanto no frontend quanto no backend.

🎯 Principais Funcionalidades
✅ Adicionar filmes à sua watchlist de forma rápida
👀 Visualizar todos os filmes cadastrados em tempo real
🎨 Interface moderna e responsiva com TailwindCSS
⚡ Performance otimizada com Next.js e SSR
🔄 API RESTful robusta com Express.js
💾 Persistência de dados com MongoDB Atlas
🛠️ Stack Tecnológica

Frontend
Next.js - Framework React com SSR e otimizações automáticas
React - Biblioteca para construção de interfaces
TailwindCSS - Framework CSS utilitário para estilização rápida

Backend
Express.js - Framework minimalista para Node.js
Node.js - Runtime JavaScript server-side
Mongoose - ODM para MongoDB

Database
MongoDB Atlas - Banco de dados NoSQL em nuvem

DevTools
Nodemon - Auto-reload durante desenvolvimento
ESLint - Linter para qualidade de código

📁 Estrutura do Projeto
movie_watchlist_app/
├── lib/
│   └── mongodb.js              # Configuração da conexão MongoDB
├── models/
│   └── Nome.js                 # Schema Mongoose
├── src/
│   ├── components/
│   │   ├── AdicionarNomes.jsx  # Componente para adicionar filmes
│   │   └── VerNomes.jsx        # Componente para visualizar filmes
│   ├── pages/
│   │   ├── index.js            # Página principal
│   │   ├── _app.js             # Configuração global do app
│   │   └── _document.js        # Configuração do documento HTML
│   ├── services/
│   │   └── api.js              # Funções de comunicação com API
│   └── styles/
│       └── globals.css         # Estilos globais
├── server.js                   # Servidor Express
├── package.json
└── README.md

🚀 Getting Started
Pré-requisitos
Antes de começar, certifique-se de ter instalado:

Node.js (versão 18 ou superior)
npm ou yarn
Conta no MongoDB Atlas (gratuita)
Instalação
Clone o repositório
bash
   git clone https://github.com/iorsini/movie_watchlist_app.git
   cd movie_watchlist_app
Instale as dependências
bash
   npm install
Configure as variáveis de ambiente Crie um arquivo .env na raiz do projeto:
env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
   NODE_ENV=development
   PORT=3000
💡 Dica: Obtenha sua connection string no MongoDB Atlas

Inicie o servidor de desenvolvimento
bash
   npm run dev

Acesse a aplicação
Interface: http://localhost:3000
API: http://localhost:3000/api/nomes

🔌 API Endpoints
GET /api/nomes
Retorna todos os filmes cadastrados.

Resposta:

json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "nome": "Inception"
  }
]
POST /api/nomes
Adiciona um novo filme à lista.

Body:

json
{
  "nome": "Interstellar"
}
Resposta:

json
{
  "_id": "507f1f77bcf86cd799439012",
  "nome": "Interstellar"
}

🚢 Deploy
Este projeto está configurado para deploy fácil na Vercel.

Deploy Manual
Instale a Vercel CLI:
bash
   npm i -g vercel
Faça o deploy:
bash
   vercel
Configure as variáveis de ambiente no dashboard da Vercel

👨‍💻 Autora
Isadora Orsini Barradas

GitHub: @iorsini
LinkedIn: [LinkedIn](https://www.linkedin.com/in/isadora-barradas/)

⭐ Mostre seu Apoio
Se este projeto foi útil para você, considere dar uma ⭐️!

<div align="center">
Feito com ❤️ e muitas xícaras de ☕
</div>
