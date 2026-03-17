import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import CustomerService from '../services/CustomerService';
import CustomerForm from './CustomerForm';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Modal/Form state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const res = await CustomerService.getAllCustomers();
      // Adjusting to CardMaster's ResponseStructure wrapper
      setCustomers(res.data?.data || []);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Failed to load customers. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this customer?')) return;
    try {
      await CustomerService.deleteCustomer(id);
      fetchCustomers();
    } catch (err) {
      alert('Failed to delete customer');
    }
  };

  const openAddForm = () => {
    setSelectedCustomer(null);
    setIsFormOpen(true);
  };

  const openEditForm = (customer) => {
    setSelectedCustomer(customer);
    setIsFormOpen(true);
  };

  const handleFormSuccess = () => {
    setIsFormOpen(false);
    fetchCustomers();
  };

  if (isFormOpen) {
    return (
      <CustomerForm 
        customer={selectedCustomer} 
        onCancel={() => setIsFormOpen(false)}
        onSuccess={handleFormSuccess}
      />
    );
  }

  if (loading) return <div className="loading-state">Loading customers...</div>;
  if (error) return <div className="error-state">{error}</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600 }}>Customers</h2>
        <button className="btn-primary" onClick={openAddForm}>
          <Plus size={18} /> Add Customer
        </button>
      </div>
      
      <div className="data-table-container">
        {customers.length === 0 ? (
          <div className="empty-state">No customers found. Click "Add Customer" to create one.</div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Identity Number</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.map(c => (
                <tr key={c.id}>
                  <td>#{c.id}</td>
                  <td style={{ fontWeight: 500 }}>{c.firstName} {c.lastName}</td>
                  <td>{c.email}</td>
                  <td>{c.phoneNumber || '-'}</td>
                  <td>{c.identityNumber}</td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button 
                        onClick={() => openEditForm(c)}
                        style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer' }}>
                        <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(c.id)}
                        style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer' }}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default CustomerList;
