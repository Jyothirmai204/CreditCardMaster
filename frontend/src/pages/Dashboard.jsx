import React, { useState, useEffect } from 'react';
import { Users, CreditCard, FileText, Activity } from 'lucide-react';
import CustomerService from '../services/CustomerService';
import ProductService from '../services/ProductService';
import CardApplicationService from '../services/CardApplicationService';

const Dashboard = () => {
  const [stats, setStats] = useState({
    customers: 0,
    products: 0,
    applications: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [customers, products, applications] = await Promise.all([
          CustomerService.getAllCustomers().catch(() => ({ data: { data: [] } })),
          ProductService.getAllProducts().catch(() => ({ data: [] })),
          CardApplicationService.getAllApplications().catch(() => ({ data: { data: [] } }))
        ]);

        setStats({
          customers: customers.data?.data?.length || 0,
          products: products.data?.length || 0,
          applications: applications.data?.data?.length || 0
        });
      } catch (error) {
        console.error('Failed to fetch dashboard stats', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <div className="loading-state">Loading dashboard...</div>;

  return (
    <div>
      <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem', fontWeight: 600 }}>Dashboard Overview</h2>
      
      <div className="dashboard-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <Users size={24} />
          </div>
          <div className="stat-info">
            <h3>Total Customers</h3>
            <p>{stats.customers}</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', color: 'var(--secondary)' }}>
            <CreditCard size={24} />
          </div>
          <div className="stat-info">
            <h3>Card Products</h3>
            <p>{stats.products}</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: 'rgba(245, 158, 11, 0.1)', color: '#F59E0B' }}>
            <FileText size={24} />
          </div>
          <div className="stat-info">
            <h3>Applications</h3>
            <p>{stats.applications}</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: 'rgba(236, 72, 153, 0.1)', color: '#EC4899' }}>
            <Activity size={24} />
          </div>
          <div className="stat-info">
            <h3>System Status</h3>
            <p>Online</p>
          </div>
        </div>
      </div>
      
      <div className="data-table-container">
        <div className="table-header">
          <h2>Recent Activity</h2>
        </div>
        <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
          No recent activity to display.
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
