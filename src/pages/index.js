// src/pages/index.js FINAL VERSION
import { useState } from 'react';
import AllMovies from '../components/AllMovies';
import WatchedMovies from '../components/WatchedMovies';
import NotWatchedMovies from '../components/NotWatchedMovies';
import MoviesByRating from '../components/MoviesByRating';
import AddMovie from '../components/AddMovie';
import EditMovie from '../components/EditMovie';

export default function Home() {
  const [activeView, setActiveView] = useState('all');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
    setActiveView('all'); // returns to the list after adding/editing
  };

  const handleEditClick = (movie) => {
    setSelectedMovie(movie);
    setActiveView('edit');
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>🎬 Movie Watchlist App</h1>

      <nav style={{ marginBottom: '30px' }}>
        <button 
          onClick={() => setActiveView('all')}
          style={{ margin: '5px', padding: '10px' }}
        >
          All Movies
        </button>
        <button 
          onClick={() => setActiveView('watched')}
          style={{ margin: '5px', padding: '10px' }}
        >
          Watched
        </button>
        <button 
          onClick={() => setActiveView('notWatched')}
          style={{ margin: '5px', padding: '10px' }}
        >
          To Watch
        </button>
        <button 
          onClick={() => setActiveView('byRating')}
          style={{ margin: '5px', padding: '10px' }}
        >
          By Rating
        </button>
        <button 
          onClick={() => setActiveView('add')}
          style={{ margin: '5px', padding: '10px', backgroundColor: '#4CAF50', color: 'white' }}
        >
          ➕ Add Movie
        </button>
      </nav>

      <div>
        {activeView === 'all' && (
          <AllMovies 
            key={refreshKey} 
            onEditClick={handleEditClick} 
          />
        )}
        {activeView === 'watched' && <WatchedMovies key={refreshKey} />}
        {activeView === 'notWatched' && <NotWatchedMovies key={refreshKey} />}
        {activeView === 'byRating' && <MoviesByRating key={refreshKey} />}
        {activeView === 'add' && <AddMovie onMovieAdded={handleRefresh} />}
        {activeView === 'edit' && (
          <EditMovie 
            movie={selectedMovie} 
            onMovieUpdated={handleRefresh} 
          />
        )}
      </div>
    </div>
  );
}