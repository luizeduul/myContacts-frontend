import HttpClient from './utils/HttpClient';

class ContactsService {
  constructor() {
    this.httpClient = new HttpClient('http://localhost:3333');
  }

  async listContacts(orderBy = 'asc') {
    return this.httpClient.get(`contacts?orderBy=${orderBy}`);
  }

  createContact(contact) {
    return this.httpClient.post(this.baseEndoint, contact);
  }
}
export default new ContactsService();
