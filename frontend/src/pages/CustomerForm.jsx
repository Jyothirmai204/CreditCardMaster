import React, { useState, useEffect } from 'react';
import CustomerService from '../services/CustomerService';

const CustomerForm = ({ customer, onCancel, onSuccess }) => {
  const isEditing = !!customer;
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    identityNumber: '',
    dateOfBirth: '',
    address: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (customer) {
      setFormData({
        firstName: customer.firstName || '',
        lastName: customer.lastName || '',
        email: customer.email || '',
        phoneNumber: customer.phoneNumber || '',
        identityNumber: customer.identityNumber || '',
        dateOfBirth: customer.dateOfBirth?.split('T')[0] || '',
        address: customer.address || ''
      });
    }
  }, [customer]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isEditing) {
        await CustomerService.updateCustomer(customer.id, formData);
      } else {
        await CustomerService.createCustomer(formData);
      }
      onSuccess();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to save customer data.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="data-table-container form-container" style={{ padding: '2rem' }}>
      <h2 style={{ marginBottom: '1.5rem', fontSize: '1.25rem', fontWeight: 600 }}>
        {isEditing ? 'Edit Customer' : 'Add New Customer'}
      </h2>

      {error && (
        <div style={{ padding: '1rem', backgroundColor: '#FEE2E2', color: '#991B1B', borderRadius: '6px', marginBottom: '1.5rem' }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          <div className="form-group">
            <label>First Name *</label>
            <input 
              type="text" 
              name="firstName" 
              className="form-control" 
              value={formData.firstName} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="form-group">
            <label>Last Name *</label>
            <input 
              type="text" 
              name="lastName" 
              className="form-control" 
              value={formData.lastName} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="form-group">
            <label>Email *</label>
            <input 
              type="email" 
              name="email" 
              className="form-control" 
              value={formData.email} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="form-group">
            <label>Identity Number *</label>
            <input 
              type="text" 
              name="identityNumber" 
              className="form-control" 
              value={formData.identityNumber} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input 
              type="text" 
              name="phoneNumber" 
              className="form-control" 
              value={formData.phoneNumber} 
              onChange={handleChange} 
            />
          </div>
          <div className="form-group">
            <label>Date of Birth</label>
            <input 
              type="date" 
              name="dateOfBirth" 
              className="form-control" 
              value={formData.dateOfBirth} 
              onChange={handleChange} 
            />
          </div>
        </div>

        <div className="form-group">
          <label>Address</label>
          <textarea 
            name="address" 
            className="form-control" 
            rows="3" 
            value={formData.address} 
            onChange={handleChange} 
          />
        </div>

        <div className="form-actions">
          <button type="button" className="btn-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Saving...' : 'Save Customer'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CustomerForm;
