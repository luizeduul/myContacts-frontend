import HttpClient from './utils/HttpClient';

class ContactsService {
  constructor() {
    this.httpClient = new HttpClient('http://localhost:3333');
    this.baseUrl = 'contacts';
  }

  listContacts(orderBy = 'asc') {
    return this.httpClient.get(`${this.baseUrl}?orderBy=${orderBy}`);
  }

  getContactById(id) {
    return this.httpClient.get(`${this.baseUrl}/${id}`);
  }

  createContact(contact) {
    return this.httpClient.post(`${this.baseUrl}`, {
      body: contact,
    });
  }

  updateContact(id, contact) {
    return this.httpClient.put(`${this.baseUrl}/${id}`, {
      body: contact,
    });
  }
}
export default new ContactsService();
