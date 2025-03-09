import { APIError } from '../../errors/ApiError';

class HttpClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  get(path, options) {
    return this.makeRequest(path, {
      method: 'GET',
      headers: options?.headers,
    });
  }

  post(path, options) {
    return this.makeRequest(path, {
      method: 'POST',
      body: options?.body,
      headers: options?.headers,
    });
  }

  put(path, options) {
    return this.makeRequest(path, {
      method: 'PUT',
      body: options?.body,
      headers: options?.headers,
    });
  }

  async makeRequest(path, options) {
    const headers = new Headers();

    if (options?.body) {
      headers.append('Content-Type', 'application/json');
    }

    if (options?.headers) {
      Object.entries(options?.headers).forEach(([key, value]) => {
        headers.append(key, value);
      });
    }

    const response = await fetch(`${this.baseUrl}/${path}`, {
      method: options.method,
      body: options?.body ? JSON.stringify(options.body) : undefined,
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
