import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

class HttpService {
  private apiClient: AxiosInstance;

  constructor(baseURL: string) {
    this.apiClient = axios.create({
      baseURL,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.apiClient.get(url, config);
    return response.data;
  }

  async post<T, U>(
    url: string,
    data: U,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.apiClient.post(
      url,
      data,
      config
    );
    return response.data;
  }

  async put<T, U>(
    url: string,
    data: U,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.apiClient.put(
      url,
      data,
      config
    );
    return response.data;
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.apiClient.delete(url, config);
    return response.data;
  }
}

export default HttpService;
