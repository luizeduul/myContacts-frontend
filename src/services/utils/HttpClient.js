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

  async post(path, body) {
    const headers = new Headers({
      'Content-Type': 'application/json',
    });
    const response = await fetch(`${this.baseUrl}/${path}`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers,
    });

    const contentType = response.headers.get('content-type');

    let responseBody = {};

    if (contentType && contentType.includes('application/json')) {
      responseBody = await response.json();
    }

    if (response.ok) {
      return responseBody;
    }

    throw new APIError(response, responseBody);
  }
}

export default HttpClient;
