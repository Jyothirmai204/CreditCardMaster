import api from './api';

class ProductService {
  /**
   * Retrieves all card products
   */
  getAllProducts() {
    return api.get('/api/products');
  }

  /**
   * Retrieves a product by ID
   * @param {number} id 
   */
  getProduct(id) {
    return api.get(`/api/products/${id}`);
  }

  /**
   * Creates a new card product
   * @param {Object} productData 
   */
  createProduct(productData) {
    return api.post('/api/products', productData);
  }
}

export default new ProductService();
