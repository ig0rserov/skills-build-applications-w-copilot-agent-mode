import React, { useEffect, useState } from 'react';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;
    console.log('Fetching leaderboard from:', apiUrl);
    
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Leaderboard data received:', data);
        // Handle both paginated (.results) and plain array responses
        const leaderboardData = data.results || data;
        console.log('Processed leaderboard:', leaderboardData);
        setLeaderboard(leaderboardData);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching leaderboard:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const getRankBadge = (index) => {
    if (index === 0) return <span className="badge badge-rank badge-gold">🥇 1st</span>;
    if (index === 1) return <span className="badge badge-rank badge-silver">🥈 2nd</span>;
    if (index === 2) return <span className="badge badge-rank badge-bronze">🥉 3rd</span>;
    return <span className="badge bg-secondary badge-rank">{index + 1}th</span>;
  };

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <span className="ms-3 loading-text">Loading leaderboard...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Error!</h4>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header bg-warning text-dark">
          <h4><span role="img" aria-label="trophy">🏆</span> Leaderboard</h4>
        </div>
        <div className="card-body">
          <p className="text-muted mb-4">See who's leading the fitness challenge!</p>
          {leaderboard.length === 0 ? (
            <div className="text-center py-4">
              <p className="text-muted">No leaderboard entries found.</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped table-hover">
                <thead className="table-light">
                  <tr>
                    <th scope="col">Rank</th>
                    <th scope="col">User</th>
                    <th scope="col">Score</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.map((entry, index) => (
                    <tr key={entry._id || entry.id} className={index < 3 ? 'table-warning' : ''}>
                      <td>{getRankBadge(index)}</td>
                      <td>
                        <strong>{entry.user?.username || entry.user}</strong>
                      </td>
                      <td>
                        <span className="badge bg-success fs-6">
                          {entry.score} pts
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <div className="card-footer text-muted">
          Total Participants: <strong>{leaderboard.length}</strong>
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
