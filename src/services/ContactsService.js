import ContactMapper from './mappers/ContactMapper';
import HttpClient from './utils/HttpClient';

class ContactsService {
  constructor() {
    this.httpClient = new HttpClient('http://localhost:3333');
    this.baseUrl = 'contacts';
  }

  async listContacts(orderBy = 'asc', signal) {
    const contacts = await this.httpClient.get(`${this.baseUrl}?orderBy=${orderBy}`, { signal });
    return contacts?.map(ContactMapper.toDomain);
  }

  async getContactById(id, signal) {
    const contact = await this.httpClient.get(`${this.baseUrl}/${id}`, { signal });
    return ContactMapper.toDomain(contact);
  }

  createContact(contact) {
    const body = ContactMapper.toPersistence(contact);
    return this.httpClient.post(`${this.baseUrl}`, { body });
  }

  updateContact(id, contact) {
    const body = ContactMapper.toPersistence(contact);

    return this.httpClient.put(`${this.baseUrl}/${id}`, { body });
  }

  deleteContact(id) {
    return this.httpClient.delete(`${this.baseUrl}/${id}`);
  }
}
export default new ContactsService();
