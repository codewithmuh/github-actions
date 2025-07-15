import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import UserList from './components/UserList';
import UserDetail from './components/UserDetail';
import AddUser from './components/AddUser';
import { getUsers } from './services/api';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const userData = await getUsers();
      setUsers(userData);
      setError(null);
    } catch (err) {
      setError('Failed to load users');
      console.error('Error loading users:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUserAdded = (newUser) => {
    setUsers(prevUsers => [...prevUsers, newUser]);
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>⚛️ React CI/CD Demo</h1>
          <nav>
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/users" className="nav-link">Users</Link>
            <Link to="/add-user" className="nav-link">Add User</Link>
          </nav>
        </header>

        <main className="App-main">
          <Routes>
            <Route path="/" element={
              <div className="home">
                <h2>Welcome to React CI/CD Demo! 🚀</h2>
                <p>This application demonstrates GitHub Actions CI/CD pipeline for React applications.</p>
                <div className="stats">
                  <div className="stat-card">
                    <h3>Total Users</h3>
                    <p className="stat-number">{users.length}</p>
                  </div>
                  <div className="stat-card">
                    <h3>Status</h3>
                    <p className="stat-status">{loading ? 'Loading...' : error ? 'Error' : 'Ready'}</p>
                  </div>
                </div>
              </div>
            } />
            
            <Route path="/users" element={
              <UserList 
                users={users} 
                loading={loading} 
                error={error} 
                onRefresh={loadUsers}
              />
            } />
            
            <Route path="/users/:id" element={<UserDetail />} />
            
            <Route path="/add-user" element={
              <AddUser onUserAdded={handleUserAdded} />
            } />
          </Routes>
        </main>

        <footer className="App-footer">
          <p>Built with React • GitHub Actions CI/CD • Version 1.0.0</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;