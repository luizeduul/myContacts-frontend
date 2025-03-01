import HttpClient from './utils/HttpClient';

class CategoriesService {
  constructor() {
    this.httpClient = new HttpClient('http://localhost:3333');
  }

  async listCategories(orderBy = 'asc') {
    return this.httpClient.get(`categories?orderBy=${orderBy}`);
  }
}
export default new CategoriesService();
