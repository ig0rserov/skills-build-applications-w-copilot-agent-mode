import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function App() {
  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img src={process.env.PUBLIC_URL + '/octofitapp-small.png'} alt="OctoFit Logo" />
            OctoFit Tracker
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  <span role="img" aria-label="home">🏠</span> Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/activities">
                  <span role="img" aria-label="activities">🏃</span> Activities
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/leaderboard">
                  <span role="img" aria-label="leaderboard">🏆</span> Leaderboard
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/teams">
                  <span role="img" aria-label="teams">👥</span> Teams
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/users">
                  <span role="img" aria-label="users">👤</span> Users
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/workouts">
                  <span role="img" aria-label="workouts">💪</span> Workouts
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container mt-4">
        <Routes>
          <Route path="/" element={
            <div>
              <div className="hero-section text-center">
                <img 
                  src={process.env.PUBLIC_URL + '/octofitapp-small.png'} 
                  alt="OctoFit Logo" 
                  style={{ height: '80px', marginBottom: '1rem', borderRadius: '15px', boxShadow: '0 8px 25px rgba(0,0,0,0.3)' }} 
                />
                <h1>Welcome to OctoFit Tracker</h1>
                <p className="lead">Track your fitness activities and compete with your team!</p>
                <div className="mt-4">
                  <Link to="/activities" className="btn btn-light btn-lg me-2">
                    Get Started
                  </Link>
                  <Link to="/leaderboard" className="btn btn-outline-light btn-lg">
                    View Leaderboard
                  </Link>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-md-4 mb-4">
                  <div className="card feature-card h-100">
                    <div className="card-body text-center">
                      <div className="display-4 mb-3">🏃</div>
                      <h5 className="card-title">Track Activities</h5>
                      <p className="card-text text-muted">Log your daily workouts and monitor your progress over time.</p>
                      <Link to="/activities" className="btn btn-primary">View Activities</Link>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 mb-4">
                  <div className="card feature-card h-100">
                    <div className="card-body text-center">
                      <div className="display-4 mb-3">👥</div>
                      <h5 className="card-title">Join Teams</h5>
                      <p className="card-text text-muted">Collaborate with teammates and achieve fitness goals together.</p>
                      <Link to="/teams" className="btn btn-primary">View Teams</Link>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 mb-4">
                  <div className="card feature-card h-100">
                    <div className="card-body text-center">
                      <div className="display-4 mb-3">🏆</div>
                      <h5 className="card-title">Compete</h5>
                      <p className="card-text text-muted">Climb the leaderboard and become the ultimate fitness champion.</p>
                      <Link to="/leaderboard" className="btn btn-primary">View Leaderboard</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          } />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </div>

      <footer className="bg-dark text-light py-4 mt-5">
        <div className="container text-center">
          <img 
            src={process.env.PUBLIC_URL + '/octofitapp-small.png'} 
            alt="OctoFit Logo" 
            style={{ height: '30px', marginRight: '10px', borderRadius: '5px' }} 
          />
          <p className="mb-0 d-inline">&copy; 2026 OctoFit Tracker. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
