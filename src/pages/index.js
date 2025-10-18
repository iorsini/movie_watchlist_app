import { useState } from "react";
import AllMovies from "../components/AllMovies";
import WatchedMovies from "../components/WatchedMovies";
import NotWatchedMovies from "../components/NotWatchedMovies";
import MoviesByRating from "../components/MoviesByRating";
import AddMovie from "../components/AddMovie";
import EditMovie from "../components/EditMovie";

export default function Home() {
  const [activeView, setActiveView] = useState("all");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleEditClick = (movie) => {
    setSelectedMovie(movie);
    setActiveView("edit");
  };

  const handleUpdate = () => {
    setRefreshKey(prev => prev + 1);
    setActiveView("all");
  };

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          background: #141414;
          color: #fff;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .app-container {
          min-height: 100vh;
          background: linear-gradient(to bottom, #141414 0%, #0a0a0a 100%);
        }

        .header {
          background: rgba(20, 20, 20, 0.95);
          backdrop-filter: blur(10px);
          padding: 20px 40px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .header-content {
          max-width: 1400px;
          margin: 0 auto;
        }

        .logo {
          font-size: 28px;
          font-weight: 700;
          background: linear-gradient(135deg, #e50914 0%, #ff6b6b 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 20px;
        }

        .nav {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .nav-btn {
          background: rgba(255, 255, 255, 0.1);
          border: none;
          color: #fff;
          padding: 10px 20px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .nav-btn:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
        }

        .nav-btn.active {
          background: #e50914;
        }

        .nav-btn.add {
          background: #e50914;
          margin-left: auto;
        }

        .content {
          max-width: 1400px;
          margin: 0 auto;
          padding: 40px 40px 80px;
        }

        .section-title {
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 30px;
          color: #fff;
        }

        .movie-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 20px;
        }

        .movie-card {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 8px;
          overflow: hidden;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .movie-card:hover {
          transform: scale(1.05);
          background: rgba(255, 255, 255, 0.08);
        }

        .movie-poster {
          aspect-ratio: 2/3;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .poster-placeholder {
          font-size: 60px;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.3);
        }

        .movie-info {
          padding: 15px;
        }

        .movie-title {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 5px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .movie-year, .movie-genre {
          font-size: 13px;
          color: #999;
          margin-bottom: 3px;
        }

        .movie-meta {
          display: flex;
          gap: 8px;
          margin: 10px 0;
          flex-wrap: wrap;
        }

        .status-badge, .rating-badge {
          font-size: 11px;
          padding: 4px 8px;
          border-radius: 3px;
          font-weight: 500;
        }

        .status-badge.watched {
          background: rgba(76, 175, 80, 0.2);
          color: #4CAF50;
        }

        .status-badge.unwatched {
          background: rgba(255, 152, 0, 0.2);
          color: #FF9800;
        }

        .rating-badge {
          background: rgba(255, 193, 7, 0.2);
          color: #FFC107;
        }

        .movie-actions {
          display: flex;
          gap: 8px;
          margin-top: 10px;
        }

        .btn-secondary, .btn-danger {
          flex: 1;
          padding: 8px;
          border: none;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-secondary {
          background: rgba(255, 255, 255, 0.1);
          color: #fff;
        }

        .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        .btn-danger {
          background: rgba(229, 9, 20, 0.2);
          color: #e50914;
        }

        .btn-danger:hover {
          background: rgba(229, 9, 20, 0.3);
        }

        .movie-form {
          max-width: 600px;
          background: rgba(255, 255, 255, 0.05);
          padding: 40px;
          border-radius: 8px;
        }

        .form-group {
          margin-bottom: 24px;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .form-group label {
          display: block;
          font-size: 14px;
          font-weight: 500;
          margin-bottom: 8px;
          color: #b3b3b3;
        }

        .form-group input[type="text"],
        .form-group input[type="number"] {
          width: 100%;
          padding: 12px 16px;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 4px;
          color: #fff;
          font-size: 16px;
          transition: all 0.3s ease;
        }

        .form-group input:focus {
          outline: none;
          border-color: #e50914;
          background: rgba(255, 255, 255, 0.15);
        }

        .checkbox-group {
          margin: 24px 0;
        }

        .checkbox-label {
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
          font-size: 16px;
        }

        .checkbox-label input[type="checkbox"] {
          width: 20px;
          height: 20px;
          cursor: pointer;
        }

        .star-rating {
          display: flex;
          align-items: center;
          gap: 5px;
          margin-top: 8px;
        }

        .star {
          font-size: 32px;
          color: #333;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .star.filled {
          color: #ffc107;
          text-shadow: 0 0 10px rgba(255, 193, 7, 0.5);
        }

        .star:hover {
          transform: scale(1.1);
        }

        .rating-display {
          font-size: 14px;
          color: #999;
          margin-left: 10px;
        }

        .btn-primary {
          width: 100%;
          padding: 14px;
          background: #e50914;
          color: #fff;
          border: none;
          border-radius: 4px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 10px;
        }

        .btn-primary:hover {
          background: #f40612;
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(229, 9, 20, 0.3);
        }

        .movie-list {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .movie-list-item {
          display: flex;
          align-items: center;
          gap: 20px;
          background: rgba(255, 255, 255, 0.05);
          padding: 20px;
          border-radius: 8px;
          transition: all 0.3s ease;
        }

        .movie-list-item:hover {
          background: rgba(255, 255, 255, 0.08);
          transform: translateX(10px);
        }

        .rank {
          font-size: 32px;
          font-weight: 700;
          color: #e50914;
          min-width: 60px;
        }

        .movie-list-info {
          flex: 1;
        }

        .movie-list-info h3 {
          font-size: 20px;
          margin-bottom: 5px;
        }

        .movie-list-info p {
          color: #999;
          font-size: 14px;
        }

        .rating-large {
          font-size: 24px;
          font-weight: 600;
          color: #ffc107;
        }

        .empty-state {
          text-align: center;
          padding: 60px 20px;
          color: #666;
          font-size: 18px;
        }

        .content-section {
          animation: fadeIn 0.5s ease;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 768px) {
          .header {
            padding: 15px 20px;
          }

          .content {
            padding: 20px;
          }

          .movie-grid {
            grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
            gap: 15px;
          }

          .form-row {
            grid-template-columns: 1fr;
          }

          .movie-form {
            padding: 20px;
          }
        }
      `}</style>

      <div className="app-container">
        <header className="header">
          <div className="header-content">
            <div className="logo">MOVIELIST</div>
            <nav className="nav">
              <button
                className={`nav-btn ${activeView === "all" ? "active" : ""}`}
                onClick={() => setActiveView("all")}
              >
                All Movies
              </button>
              <button
                className={`nav-btn ${activeView === "watched" ? "active" : ""}`}
                onClick={() => setActiveView("watched")}
              >
                Watched
              </button>
              <button
                className={`nav-btn ${activeView === "notWatched" ? "active" : ""}`}
                onClick={() => setActiveView("notWatched")}
              >
                To Watch
              </button>
              <button
                className={`nav-btn ${activeView === "byRating" ? "active" : ""}`}
                onClick={() => setActiveView("byRating")}
              >
                Top Rated
              </button>
              <button
                className="nav-btn add"
                onClick={() => setActiveView("add")}
              >
                + Add Movie
              </button>
            </nav>
          </div>
        </header>

        <main className="content">
          {activeView === "all" && (
            <AllMovies onEditClick={handleEditClick} key={refreshKey} />
          )}
          {activeView === "watched" && (
            <WatchedMovies onEditClick={handleEditClick} key={refreshKey} />
          )}
          {activeView === "notWatched" && (
            <NotWatchedMovies onEditClick={handleEditClick} key={refreshKey} />
          )}
          {activeView === "byRating" && <MoviesByRating key={refreshKey} />}
          {activeView === "add" && <AddMovie onMovieAdded={handleUpdate} />}
          {activeView === "edit" && (
            <EditMovie movie={selectedMovie} onMovieUpdated={handleUpdate} />
          )}
        </main>
      </div>
    </>
  );
}