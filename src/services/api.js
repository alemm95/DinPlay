import { API_CONFIG, ENDPOINTS } from "../constants/config";

class ApiService {
  constructor() {
    this.baseURL = API_CONFIG.BASE_URL;
    this.timeout = API_CONFIG.TIMEOUT;
  }

  // Método base para hacer peticiones
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      timeout: this.timeout,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    };

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.timeout);

      const response = await fetch(url, {
        ...config,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return { data, status: response.status };
    } catch (error) {
      console.error("API Error:", error);
      throw this.handleError(error);
    }
  }

  // Métodos HTTP específicos
  async get(endpoint, params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const url = queryString ? `${endpoint}?${queryString}` : endpoint;

    return this.request(url, {
      method: "GET",
    });
  }

  async post(endpoint, data = {}) {
    return this.request(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async put(endpoint, data = {}) {
    return this.request(endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async delete(endpoint) {
    return this.request(endpoint, {
      method: "DELETE",
    });
  }

  // Manejo de errores
  handleError(error) {
    if (error.name === "AbortError") {
      return new Error("Request timeout");
    }

    if (error.message.includes("Network request failed")) {
      return new Error("Network error - check your connection");
    }

    return error;
  }

  // Métodos específicos de la API
  async login(credentials) {
    return this.post(ENDPOINTS.AUTH.LOGIN, credentials);
  }

  async register(userData) {
    return this.post(ENDPOINTS.AUTH.REGISTER, userData);
  }

  async getUserProfile() {
    return this.get(ENDPOINTS.USER.PROFILE);
  }

  async updateUserProfile(userData) {
    return this.put(ENDPOINTS.USER.UPDATE, userData);
  }
}

export default new ApiService();
