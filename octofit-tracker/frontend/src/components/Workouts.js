import React, { useEffect, useState } from 'react';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;
    console.log('Fetching workouts from:', apiUrl);
    
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Workouts data received:', data);
        // Handle both paginated (.results) and plain array responses
        const workoutsData = data.results || data;
        console.log('Processed workouts:', workoutsData);
        setWorkouts(workoutsData);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching workouts:', error);
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
          <span className="ms-3 loading-text">Loading workouts...</span>
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
        <div className="card-header bg-danger text-white">
          <h4><span role="img" aria-label="workouts">💪</span> Workouts</h4>
        </div>
        <div className="card-body">
          <p className="text-muted mb-4">Browse available workout routines and exercises.</p>
          {workouts.length === 0 ? (
            <div className="text-center py-4">
              <p className="text-muted">No workouts found.</p>
            </div>
          ) : (
            <div className="row">
              {workouts.map((workout) => (
                <div className="col-md-6 col-lg-4 mb-4" key={workout._id || workout.id}>
                  <div className="card h-100 shadow-sm">
                    <div className="card-body">
                      <h5 className="card-title">
                        <span role="img" aria-label="workout">🎯</span> {workout.name}
                      </h5>
                      <p className="card-text text-muted">
                        {workout.description || 'No description available.'}
                      </p>
                    </div>
                    <div className="card-footer bg-white border-top-0">
                      <button className="btn btn-outline-primary btn-sm w-100">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="card-footer text-muted">
          Total Workouts: <strong>{workouts.length}</strong>
        </div>
      </div>
    </div>
  );
}

export default Workouts;
