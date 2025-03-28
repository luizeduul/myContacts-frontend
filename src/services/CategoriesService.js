import CategoryMapper from './mappers/CategoryMapper';
import HttpClient from './utils/HttpClient';

class CategoriesService {
  constructor() {
    this.httpClient = new HttpClient('http://localhost:3333');
  }

  async listCategories(orderBy = 'asc', signal) {
    const categories = await this.httpClient.get(`categories?orderBy=${orderBy}`, { signal });

    return categories?.map(CategoryMapper.toDomain);
  }

  async getCategoryById(id) {
    const category = await this.httpClient.get(`categories/${id}`);

    return CategoryMapper.toDomain(category);
  }

  createCategory(category) {
    const body = CategoryMapper.toPersistence(category);
    return this.httpClient.post('categories', { body });
  }

  updateCategory(id, category) {
    const body = CategoryMapper.toPersistence(category);

    return this.httpClient.put(`categories/${id}`, { body });
  }

  deleteCategory(id) {
    return this.httpClient.delete(`categories/${id}`);
  }
}
export default new CategoriesService();
