import HttpClient from './utils/HttpClient';

class ContactsService {
  constructor() {
    this.httpClient = new HttpClient('http://localhost:3333');
    this.baseUrl = 'contacts';
  }

  async listContacts(orderBy = 'asc') {
    return this.httpClient.get(`${this.baseUrl}?orderBy=${orderBy}`);
  }

  createContact(contact) {
    return this.httpClient.post(`${this.baseUrl}`, {
      body: contact,
    });
  }
}
export default new ContactsService();
