import api from './api';

class CardApplicationService {
  /**
   * Submits a new card application
   * @param {Object} applicationData 
   */
  createApplication(applicationData) {
    return api.post('/applications', applicationData);
  }

  /**
   * Retrieves all card applications
   */
  getAllApplications() {
    return api.get('/applications');
  }

  /**
   * Retrieves an application by ID
   * @param {number} id 
   */
  getApplication(id) {
    return api.get(`/applications/${id}`);
  }
}

export default new CardApplicationService();
