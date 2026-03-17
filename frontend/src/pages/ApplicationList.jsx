import React, { useState, useEffect } from 'react';
import CardApplicationService from '../services/CardApplicationService';

const ApplicationList = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApps = async () => {
      try {
        const res = await CardApplicationService.getAllApplications();
        setApplications(res.data?.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchApps();
  }, []);

  const getStatusClass = (status) => {
    switch (status) {
      case 'APPROVED': return 'status-active';
      case 'REJECTED': return 'status-inactive';
      default: return 'status-pending';
    }
  };

  if (loading) return <div className="loading-state">Loading applications...</div>;

  return (
    <div>
      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600 }}>Card Applications</h2>
      </div>

      <div className="data-table-container">
        {applications.length === 0 ? (
           <div className="empty-state">No card applications found in the system.</div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>App ID</th>
                <th>Customer ID</th>
                <th>Product ID</th>
                <th>Status</th>
                <th>Credit Limit</th>
                <th>Application Date</th>
              </tr>
            </thead>
            <tbody>
              {applications.map(app => (
                <tr key={app.id}>
                  <td style={{ fontWeight: 500 }}>APP-{app.id}</td>
                  <td>{app.customerId}</td>
                  <td>{app.productId}</td>
                  <td>
                    <span className={`status-badge ${getStatusClass(app.status)}`}>
                      {app.status}
                    </span>
                  </td>
                  <td>${app.approvedCreditLimit?.toLocaleString() || '---'}</td>
                  <td>{new Date(app.applicationDate).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ApplicationList;
