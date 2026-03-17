import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { LayoutDashboard, Users, CreditCard, FileText, LogOut } from 'lucide-react';
import Dashboard from './pages/Dashboard';
import CustomerList from './pages/CustomerList';
import ProductList from './pages/ProductList';
import ApplicationList from './pages/ApplicationList';
import Login from './pages/Login';
import Register from './pages/Register';
import UserService from './services/UserService';
import './styles.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    // Basic check for token in localStorage on mount
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      setUserEmail(localStorage.getItem('userEmail') || 'Admin User');
    }
  }, []);

  const handleLogout = () => {
    UserService.logout().catch(e => console.error(e));
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    setIsAuthenticated(false);
  };

  // If NOT authenticated, ONLY show Login / Register routes
  if (!isAuthenticated) {
    return (
      <Router>
        <Routes>
          <Route path="/login" element={<Login setAuth={setIsAuthenticated} />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    );
  }

  // If authenticated, show the Main Application Layout
  return (
    <Router>
      <div className="app-container">
        <aside className="sidebar">
          <div className="sidebar-header">
            <h2>CardMaster</h2>
          </div>
          <nav className="sidebar-nav">
            <Link to="/" className="nav-item">
              <LayoutDashboard size={20} />
              <span>Dashboard</span>
            </Link>
            <Link to="/customers" className="nav-item">
              <Users size={20} />
              <span>Customers</span>
            </Link>
            <Link to="/products" className="nav-item">
              <CreditCard size={20} />
              <span>Card Products</span>
            </Link>
            <Link to="/applications" className="nav-item">
              <FileText size={20} />
              <span>Applications</span>
            </Link>
          </nav>
        </aside>
        
        <main className="main-content">
          <header className="topbar">
            <h1>Administration Portal</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div className="user-profile">{userEmail}</div>
              <button 
                onClick={handleLogout} 
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#EF4444', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              >
                <LogOut size={18} /> Logout
              </button>
            </div>
          </header>
          
          <div className="content-area">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/customers" element={<CustomerList />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/applications" element={<ApplicationList />} />
              {/* Redirect any unknown route to dashboard when authenticated */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;
