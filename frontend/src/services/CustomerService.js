import api from './api';

class CustomerService {
  /**
   * Retrieves all customers
   * @param {string} token 
   * @returns {Promise} Axios response promise
   */
  getAllCustomers(token = '') {
    return api.get('/customers', {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  /**
   * Retrieves a customer by ID
   * @param {number} id 
   * @param {string} token 
   */
  getCustomer(id, token = '') {
    return api.get(`/customers/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  /**
   * Creates a new customer
   * @param {Object} customerData 
   * @param {string} token 
   */
  createCustomer(customerData, token = '') {
    return api.post('/customers', customerData, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  /**
   * Updates an existing customer
   * @param {number} id 
   * @param {Object} customerData 
   * @param {string} token 
   */
  updateCustomer(id, customerData, token = '') {
    return api.put(`/customers/${id}`, customerData, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  /**
   * Deletes a customer
   * @param {number} id 
   * @param {string} token 
   */
  deleteCustomer(id, token = '') {
    return api.delete(`/customers/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
}

export default new CustomerService();
