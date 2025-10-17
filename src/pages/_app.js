// src/pages/_app.js
export default function App({ Component, pageProps }) {
  return (
    <>
      <header style={{ 
        backgroundColor: '#333', 
        color: 'white', 
        padding: '20px',
        textAlign: 'center'
      }}>
        <h1>🎬 Movie Watchlist</h1>
      </header>
      
      <main style={{ minHeight: '80vh' }}>
        <Component {...pageProps} />
      </main>
      
      <footer style={{ 
        backgroundColor: '#333', 
        color: 'white', 
        padding: '20px',
        textAlign: 'center',
        marginTop: '40px'
      }}>
        <p>Feito com ❤️ por ti!</p>
      </footer>
    </>
  );
}