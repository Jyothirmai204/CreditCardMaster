import api from './api';

class UserService {
  /**
   * Retrieves all users
   */
  getAllUsers() {
    return api.get('/users');
  }

  /**
   * Registers a new user
   * @param {Object} userData 
   */
  registerUser(userData) {
    return api.post('/users/register', userData);
  }

  /**
   * Logs in a user
   * @param {Object} loginData 
   */
  login(loginData) {
    return api.post('/users/login', loginData);
  }
  
  /**
   * Logs out
   */
  logout() {
    return api.post('/users/logout');
  }
}

export default new UserService();
