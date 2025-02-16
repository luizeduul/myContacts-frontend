import { APIError } from '../../errors/ApiError';

class HttpClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async get(path) {
    const response = await fetch(`${this.baseUrl}/${path}`);

    const contentType = response.headers.get('content-type');

    let body = {};

    if (contentType && contentType.includes('application/json')) {
      body = await response.json();
    }

    if (response.ok) {
      return body;
    }

    throw new APIError(response, body);
  }
}

export default HttpClient;
