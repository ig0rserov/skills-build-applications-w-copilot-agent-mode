import React, { useEffect, useState } from 'react';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;
    console.log('Fetching teams from:', apiUrl);
    
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Teams data received:', data);
        // Handle both paginated (.results) and plain array responses
        const teamsData = data.results || data;
        console.log('Processed teams:', teamsData);
        setTeams(teamsData);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching teams:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <span className="ms-3 loading-text">Loading teams...</span>
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
        <div className="card-header bg-success text-white">
          <h4><span role="img" aria-label="teams">👥</span> Teams</h4>
        </div>
        <div className="card-body">
          <p className="text-muted mb-4">View all fitness teams and their members.</p>
          {teams.length === 0 ? (
            <div className="text-center py-4">
              <p className="text-muted">No teams found.</p>
            </div>
          ) : (
            <div className="row">
              {teams.map((team) => (
                <div className="col-md-6 col-lg-4 mb-4" key={team._id || team.id}>
                  <div className="card h-100 shadow-sm">
                    <div className="card-header bg-light">
                      <h5 className="mb-0">
                        <span role="img" aria-label="team">🏅</span> {team.name}
                      </h5>
                    </div>
                    <div className="card-body">
                      <h6 className="text-muted mb-3">Team Members:</h6>
                      {team.members && team.members.length > 0 ? (
                        <ul className="list-group list-group-flush">
                          {team.members.map((member, idx) => (
                            <li className="list-group-item d-flex align-items-center" key={idx}>
                              <span className="badge bg-primary rounded-pill me-2">
                                {idx + 1}
                              </span>
                              {member.username || member}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-muted mb-0">No members yet</p>
                      )}
                    </div>
                    <div className="card-footer bg-white">
                      <small className="text-muted">
                        {team.members ? team.members.length : 0} member(s)
                      </small>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="card-footer text-muted">
          Total Teams: <strong>{teams.length}</strong>
        </div>
      </div>
    </div>
  );
}

export default Teams;
