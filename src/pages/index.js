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
          background: #0a0a0a;
          color: #fff;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          overflow-x: hidden;
        }

        .app-container {
          min-height: 100vh;
          background: linear-gradient(to bottom, #141414 0%, #0a0a0a 100%);
          padding-bottom: 100px;
        }

        /* HEADER OTIMIZADO */
        .header {
          background: rgba(20, 20, 20, 0.98);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(229, 9, 20, 0.2);
          position: sticky;
          top: 0;
          z-index: 100;
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.5);
        }

        .header-content {
          max-width: 1400px;
          margin: 0 auto;
          padding: 16px 20px;
        }

        .logo {
          font-size: 24px;
          font-weight: 700;
          background: linear-gradient(135deg, #e50914 0%, #ff6b6b 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 12px;
          letter-spacing: 1px;
        }

        /* NAVEGAÇÃO - TODOS OS BOTÕES NA MESMA LINHA */
        .nav {
          display: flex;
          gap: 8px;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          -ms-overflow-style: none;
          padding-bottom: 2px;
        }

        .nav::-webkit-scrollbar {
          display: none;
        }

        .nav-btn {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: rgba(255, 255, 255, 0.7);
          padding: 10px 18px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 500;
          transition: all 0.3s ease;
          white-space: nowrap;
          flex-shrink: 0;
        }

        .nav-btn:hover {
          background: rgba(255, 255, 255, 0.15);
          color: #fff;
          border-color: rgba(255, 255, 255, 0.2);
          transform: translateY(-1px);
        }

        .nav-btn.active {
          background: linear-gradient(135deg, #e50914 0%, #c20812 100%);
          border-color: #e50914;
          color: #fff;
          box-shadow: 0 4px 15px rgba(229, 9, 20, 0.4);
        }

        /* FLOATING ACTION BUTTON - CANTO INFERIOR DIREITO */
        .fab-container {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 1000;
        }

        .fab {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: linear-gradient(135deg, #e50914 0%, #c20812 100%);
          border: none;
          color: #fff;
          font-size: 28px;
          font-weight: 300;
          cursor: pointer;
          box-shadow: 0 8px 30px rgba(229, 9, 20, 0.5),
                      0 0 0 0 rgba(229, 9, 20, 0.4);
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          display: flex;
          align-items: center;
          justify-content: center;
          animation: pulse 2s infinite;
        }

        .fab:hover {
          transform: scale(1.1) rotate(90deg);
          box-shadow: 0 12px 40px rgba(229, 9, 20, 0.6),
                      0 0 0 8px rgba(229, 9, 20, 0.1);
        }

        .fab:active {
          transform: scale(0.95);
        }

        .fab.active {
          background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
          box-shadow: 0 8px 30px rgba(76, 175, 80, 0.5);
          transform: rotate(45deg);
        }

        @keyframes pulse {
          0%, 100% {
            box-shadow: 0 8px 30px rgba(229, 9, 20, 0.5),
                        0 0 0 0 rgba(229, 9, 20, 0);
          }
          50% {
            box-shadow: 0 8px 30px rgba(229, 9, 20, 0.5),
                        0 0 0 10px rgba(229, 9, 20, 0);
          }
        }

        /* CONTENT */
        .content {
          max-width: 1400px;
          margin: 0 auto;
          padding: 24px 20px 80px;
        }

        .section-title {
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 24px;
          color: #fff;
          position: relative;
          display: inline-block;
        }

        .section-title::after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 0;
          width: 60px;
          height: 3px;
          background: linear-gradient(90deg, #e50914 0%, transparent 100%);
          border-radius: 2px;
        }

        /* MOVIE GRID */
        .movie-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
          gap: 16px;
        }

        .movie-card {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          overflow: hidden;
          transition: all 0.3s ease;
          cursor: pointer;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .movie-card:hover {
          transform: translateY(-8px);
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(229, 9, 20, 0.3);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.5);
        }

        .movie-poster {
          aspect-ratio: 2/3;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        .movie-poster::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at 30% 50%, rgba(255,255,255,0.1) 0%, transparent 60%);
        }

        .poster-placeholder {
          font-size: 64px;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.4);
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
        }

        .movie-info {
          padding: 14px;
        }

        .movie-title {
          font-size: 15px;
          font-weight: 600;
          margin-bottom: 4px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          color: #fff;
        }

        .movie-year, .movie-genre {
          font-size: 12px;
          color: #999;
          margin-bottom: 2px;
        }

        .movie-meta {
          display: flex;
          gap: 6px;
          margin: 10px 0;
          flex-wrap: wrap;
        }

        .status-badge, .rating-badge {
          font-size: 10px;
          padding: 4px 8px;
          border-radius: 4px;
          font-weight: 600;
          letter-spacing: 0.3px;
        }

        .status-badge.watched {
          background: rgba(76, 175, 80, 0.15);
          color: #4CAF50;
          border: 1px solid rgba(76, 175, 80, 0.3);
        }

        .status-badge.unwatched {
          background: rgba(255, 152, 0, 0.15);
          color: #FF9800;
          border: 1px solid rgba(255, 152, 0, 0.3);
        }

        .rating-badge {
          background: rgba(255, 193, 7, 0.15);
          color: #FFC107;
          border: 1px solid rgba(255, 193, 7, 0.3);
        }

        .movie-actions {
          display: flex;
          gap: 6px;
          margin-top: 10px;
        }

        .btn-secondary, .btn-danger {
          flex: 1;
          padding: 8px;
          border: none;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-secondary {
          background: rgba(255, 255, 255, 0.1);
          color: #fff;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.15);
          border-color: rgba(255, 255, 255, 0.2);
        }

        .btn-danger {
          background: rgba(229, 9, 20, 0.15);
          color: #e50914;
          border: 1px solid rgba(229, 9, 20, 0.3);
        }

        .btn-danger:hover {
          background: rgba(229, 9, 20, 0.25);
          border-color: rgba(229, 9, 20, 0.5);
        }

        /* FORM */
        .movie-form {
          max-width: 600px;
          background: rgba(255, 255, 255, 0.05);
          padding: 32px;
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .form-group label {
          display: block;
          font-size: 13px;
          font-weight: 600;
          margin-bottom: 8px;
          color: #b3b3b3;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .form-group input[type="text"],
        .form-group input[type="number"] {
          width: 100%;
          padding: 12px 16px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 8px;
          color: #fff;
          font-size: 15px;
          transition: all 0.3s ease;
        }

        .form-group input:focus {
          outline: none;
          border-color: #e50914;
          background: rgba(255, 255, 255, 0.12);
          box-shadow: 0 0 0 3px rgba(229, 9, 20, 0.1);
        }

        .checkbox-group {
          margin: 20px 0;
        }

        .checkbox-label {
          display: flex !important;
          align-items: center;
          gap: 24px;
          cursor: pointer;
          font-size: 15px;
          padding: 12px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 8px;
          transition: all 0.2s ease;
        }

        .checkbox-label:hover {
          background: rgba(255, 255, 255, 0.08);
        }

        .checkbox-label input[type="checkbox"] {
          width: 20px;
          height: 20px;
          cursor: pointer;
          accent-color: #e50914;
        }

        .star-rating {
          display: flex;
          align-items: center;
          gap: 4px;
          margin-top: 8px;
        }

        .star {
          font-size: 32px;
          color: #333;
          cursor: pointer;
          transition: all 0.2s ease;
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
        }

        .star.filled {
          color: #ffc107;
          transform: scale(1.1);
        }

        .star:hover {
          transform: scale(1.15);
        }

        .rating-display {
          font-size: 13px;
          color: #999;
          margin-left: 10px;
          font-weight: 600;
        }

        .btn-primary {
          width: 100%;
          padding: 14px;
          background: linear-gradient(135deg, #e50914 0%, #c20812 100%);
          color: #fff;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 10px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(229, 9, 20, 0.4);
        }

        .btn-primary:active {
          transform: translateY(0);
        }

        /* MOVIE LIST */
        .movie-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .movie-list-item {
          display: flex;
          align-items: center;
          gap: 20px;
          background: rgba(255, 255, 255, 0.05);
          padding: 20px;
          border-radius: 12px;
          transition: all 0.3s ease;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .movie-list-item:hover {
          background: rgba(255, 255, 255, 0.08);
          transform: translateX(8px);
          border-color: rgba(229, 9, 20, 0.3);
        }

        .rank {
          font-size: 32px;
          font-weight: 700;
          color: #e50914;
          min-width: 60px;
          text-align: center;
        }

        .movie-list-info {
          flex: 1;
        }

        .movie-list-info h3 {
          font-size: 18px;
          margin-bottom: 4px;
        }

        .movie-list-info p {
          color: #999;
          font-size: 13px;
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
          font-size: 16px;
        }

        .content-section {
          animation: fadeIn 0.4s ease;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* RESPONSIVE - MOBILE FIRST (iPhone 14 Pro Max: 393x852) */
        @media (max-width: 480px) {
          .header-content {
            padding: 12px 16px;
          }

          .logo {
            font-size: 22px;
            margin-bottom: 10px;
          }

          .nav {
            gap: 6px;
          }

          .nav-btn {
            padding: 9px 14px;
            font-size: 13px;
          }

          .content {
            padding: 20px 16px 80px;
          }

          .movie-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
          }

          .section-title {
            font-size: 24px;
          }

          .fab-container {
            bottom: 20px;
            right: 20px;
          }

          .fab {
            width: 56px;
            height: 56px;
            font-size: 24px;
          }

          .form-row {
            grid-template-columns: 1fr;
          }

          .movie-form {
            padding: 24px 20px;
          }

          .movie-list-item {
            padding: 16px;
            gap: 16px;
          }

          .rank {
            font-size: 28px;
            min-width: 50px;
          }

          .rating-large {
            font-size: 20px;
          }
        }

        /* TABLET */
        @media (min-width: 481px) and (max-width: 768px) {
          .movie-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        /* DESKTOP */
        @media (min-width: 769px) {
          .header-content {
            padding: 20px 40px;
          }

          .logo {
            font-size: 28px;
            margin-bottom: 16px;
          }

          .nav {
            gap: 10px;
          }

          .content {
            padding: 40px 40px 80px;
          }

          .movie-grid {
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 20px;
          }

          .fab-container {
            bottom: 32px;
            right: 32px;
          }

          .fab {
            width: 72px;
            height: 72px;
            font-size: 32px;
          }
        }
      `}</style>

      <div className="app-container">
        <header className="header">
          <div className="header-content">
            <div className="logo">🎬 MOVIELIST</div>
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

        {/* FLOATING ACTION BUTTON - CANTO INFERIOR DIREITO */}
        <div className="fab-container">
          <button
            className={`fab ${activeView === "add" ? "active" : ""}`}
            onClick={() => setActiveView(activeView === "add" ? "all" : "add")}
            title="Add Movie"
          >
            +
          </button>
        </div>
      </div>
    </>
  );
}