import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import UserService from '../services/UserService';
import '../styles.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    role: 'CUSTOMER' // default
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await UserService.registerUser(formData);
      setSuccess('Registration successful! You can now login.');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      console.error("Registration failed", err);
      setError(err.response?.data?.message || 'Registration failed. Please check your inputs.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--bg-color)' }}>
      <div className="stat-card" style={{ maxWidth: '450px', width: '100%', flexDirection: 'column', padding: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', textAlign: 'center' }}>
          Register for CardMaster
        </h2>
        
        {error && <div style={{ color: 'red', marginBottom: '1rem', textAlign: 'center', padding: '0.5rem', backgroundColor: '#FEE2E2', borderRadius: '4px' }}>{error}</div>}
        {success && <div style={{ color: 'green', marginBottom: '1rem', textAlign: 'center', padding: '0.5rem', backgroundColor: '#D1FAE5', borderRadius: '4px' }}>{success}</div>}

        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <div className="form-group" style={{ marginBottom: '1rem' }}>
            <label>Full Name</label>
            <input 
              type="text" 
              name="name" 
              className="form-control" 
              value={formData.name} 
              onChange={handleChange} 
              required 
              maxLength="100"
            />
          </div>
          
          <div className="form-group" style={{ marginBottom: '1rem' }}>
            <label>Email Address</label>
            <input 
              type="email" 
              name="email" 
              className="form-control" 
              value={formData.email} 
              onChange={handleChange} 
              required 
              maxLength="100"
            />
          </div>

          <div className="form-group" style={{ marginBottom: '1rem' }}>
            <label>Phone Number</label>
            <input 
              type="text" 
              name="phone" 
              className="form-control" 
              value={formData.phone} 
              onChange={handleChange} 
              required 
              maxLength="10"
            />
          </div>

          <div className="form-group" style={{ marginBottom: '1rem' }}>
            <label>System Role</label>
            <select 
              name="role" 
              className="form-control" 
              value={formData.role} 
              onChange={handleChange}
            >
              <option value="CUSTOMER">Customer</option>
              <option value="OFFICER">Officer</option>
              <option value="UNDERWRITER">Underwriter</option>
              <option value="RISK">Risk Manager</option>
              <option value="ADMIN">System Admin</option>
            </select>
          </div>

          <div className="form-group" style={{ marginBottom: '1.5rem' }}>
            <label>Password</label>
            <input 
              type="password" 
              name="password" 
              className="form-control" 
              value={formData.password} 
              onChange={handleChange} 
              required 
              minLength="8"
              maxLength="15"
            />
          </div>
          
          <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <p style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.9rem' }}>
          Already have an account? <Link to="/login" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
