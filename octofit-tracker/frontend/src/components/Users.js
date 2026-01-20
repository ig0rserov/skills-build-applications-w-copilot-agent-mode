import React, { useEffect, useState } from 'react';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`;
    console.log('Fetching users from:', apiUrl);
    
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Users data received:', data);
        // Handle both paginated (.results) and plain array responses
        const usersData = data.results || data;
        console.log('Processed users:', usersData);
        setUsers(usersData);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
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
          <span className="ms-3 loading-text">Loading users...</span>
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
        <div className="card-header bg-info text-white">
          <h4><span role="img" aria-label="users">👤</span> Users</h4>
        </div>
        <div className="card-body">
          <p className="text-muted mb-4">View all registered users in the system.</p>
          {users.length === 0 ? (
            <div className="text-center py-4">
              <p className="text-muted">No users found.</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped table-hover">
                <thead className="table-light">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Username</th>
                    <th scope="col">Email</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={user._id || user.id}>
                      <td>{index + 1}</td>
                      <td>
                        <span className="fw-bold">
                          <span role="img" aria-label="user">👤</span> {user.username}
                        </span>
                      </td>
                      <td>
                        <a href={`mailto:${user.email}`} className="text-decoration-none">
                          {user.email}
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <div className="card-footer text-muted">
          Total Users: <strong>{users.length}</strong>
        </div>
      </div>
    </div>
  );
}

export default Users;
