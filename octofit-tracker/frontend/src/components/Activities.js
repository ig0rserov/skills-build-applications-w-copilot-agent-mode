import React, { useEffect, useState } from 'react';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;
    console.log('Fetching activities from:', apiUrl);
    
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Activities data received:', data);
        // Handle both paginated (.results) and plain array responses
        const activitiesData = data.results || data;
        console.log('Processed activities:', activitiesData);
        setActivities(activitiesData);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching activities:', error);
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
          <span className="ms-3 loading-text">Loading activities...</span>
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
        <div className="card-header">
          <h4><span role="img" aria-label="activities">🏃</span> Activities</h4>
        </div>
        <div className="card-body">
          <p className="text-muted mb-4">Track all fitness activities logged by users.</p>
          {activities.length === 0 ? (
            <div className="text-center py-4">
              <p className="text-muted">No activities found.</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped table-hover">
                <thead className="table-light">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">User</th>
                    <th scope="col">Activity Type</th>
                    <th scope="col">Duration (mins)</th>
                    <th scope="col">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {activities.map((activity, index) => (
                    <tr key={activity._id || activity.id}>
                      <td>{index + 1}</td>
                      <td>
                        <span className="badge bg-secondary">
                          {activity.user?.username || activity.user}
                        </span>
                      </td>
                      <td>{activity.activity_type}</td>
                      <td>
                        <span className="badge bg-info text-dark">
                          {activity.duration} mins
                        </span>
                      </td>
                      <td>{new Date(activity.date).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <div className="card-footer text-muted">
          Total Activities: <strong>{activities.length}</strong>
        </div>
      </div>
    </div>
  );
}

export default Activities;
