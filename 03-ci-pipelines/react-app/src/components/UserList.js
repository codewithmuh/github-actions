import React from 'react';
import { Link } from 'react-router-dom';

const UserList = ({ users, loading, error, onRefresh }) => {
  if (loading) {
    return <div className="loading">Loading users...</div>;
  }

  if (error) {
    return (
      <div className="user-list">
        <div className="error">
          {error}
          <button onClick={onRefresh} className="btn" style={{ marginLeft: '10px' }}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="user-list">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Users ({users.length})</h2>
        <button onClick={onRefresh} className="btn btn-secondary">
          Refresh
        </button>
      </div>
      
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <div className="user-grid">
          {users.map(user => (
            <div key={user.id} className="user-card">
              <h3>{user.name}</h3>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Role:</strong> {user.role || 'user'}</p>
              <Link to={`/users/${user.id}`} className="btn" style={{ marginTop: '10px', textDecoration: 'none' }}>
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserList;