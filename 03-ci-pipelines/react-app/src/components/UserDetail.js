import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getUser } from '../services/api';

const UserDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadUser();
  }, [id]);

  const loadUser = async () => {
    try {
      setLoading(true);
      const userData = await getUser(id);
      setUser(userData);
      setError(null);
    } catch (err) {
      setError('Failed to load user details');
      console.error('Error loading user:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading user details...</div>;
  }

  if (error) {
    return (
      <div>
        <div className="error">{error}</div>
        <Link to="/users" className="btn">Back to Users</Link>
      </div>
    );
  }

  if (!user) {
    return (
      <div>
        <div className="error">User not found</div>
        <Link to="/users" className="btn">Back to Users</Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ marginBottom: '20px' }}>
        <Link to="/users" className="btn btn-secondary">← Back to Users</Link>
      </div>
      
      <div className="user-card" style={{ textAlign: 'left' }}>
        <h2>{user.name}</h2>
        <div style={{ marginBottom: '15px' }}>
          <strong>ID:</strong> {user.id}
        </div>
        <div style={{ marginBottom: '15px' }}>
          <strong>Email:</strong> {user.email}
        </div>
        <div style={{ marginBottom: '15px' }}>
          <strong>Role:</strong> {user.role || 'user'}
        </div>
        {user.created_at && (
          <div style={{ marginBottom: '15px' }}>
            <strong>Created:</strong> {new Date(user.created_at).toLocaleDateString()}
          </div>
        )}
        {user.updated_at && (
          <div style={{ marginBottom: '15px' }}>
            <strong>Last Updated:</strong> {new Date(user.updated_at).toLocaleDateString()}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDetail;