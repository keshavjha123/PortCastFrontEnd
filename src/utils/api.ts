const API_BASE_URL = 'https://portcastassignment.onrender.com';

export class ApiError extends Error {
  status?: number;
  responseTime?: number;
  isColdStart?: boolean;
  
  constructor(message: string, status?: number, responseTime?: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.responseTime = responseTime;
    this.isColdStart = responseTime ? responseTime > 30000 : false; // 30s+ suggests cold start
  }
}

export interface ApiResponse<T> {
  data: T;
  responseTime: number;
  isColdStart: boolean;
}

export const apiClient = {
  async request<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
    const url = `${API_BASE_URL}${endpoint}`;
    const startTime = Date.now();
    
    try {
      // Add timeout for better error handling
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 120000); // 2 minute timeout
      
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          ...options?.headers,
        },
        signal: controller.signal,
        ...options,
      });

      clearTimeout(timeoutId);
      const responseTime = Date.now() - startTime;
      const isColdStart = responseTime > 30000;

      // Handle different status codes more gracefully
      if (!response.ok) {
        let errorMessage = `Request failed (${response.status})`;
        
        switch (response.status) {
          case 404:
            errorMessage = 'Endpoint not found. The API might be updating.';
            break;
          case 500:
            errorMessage = 'Server error. The service might be starting up.';
            break;
          case 502:
          case 503:
            errorMessage = 'Service temporarily unavailable. Cold start in progress.';
            break;
          case 429:
            errorMessage = 'Too many requests. Please wait a moment.';
            break;
          default:
            try {
              const errorData = await response.text();
              errorMessage = errorData || errorMessage;
            } catch {
              // Ignore parsing errors, use default message
            }
        }
        
        throw new ApiError(errorMessage, response.status, responseTime);
      }

      const data = await response.json();
      return {
        data,
        responseTime,
        isColdStart
      };
    } catch (error) {
      const responseTime = Date.now() - startTime;
      
      if (error instanceof ApiError) {
        throw error;
      }
      
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new ApiError('Request timed out. The server might be cold starting.', 408, responseTime);
        }
        
        if (error.message.includes('fetch')) {
          throw new ApiError('Network error. Please check your connection.', 0, responseTime);
        }
      }
      
      throw new ApiError('An unexpected error occurred.', 0, responseTime);
    }
  },

  // Health check
  health() {
    return this.request('/health');
  },

  // Fetch paragraph
  fetchParagraph() {
    return this.request('/fetch', {
      method: 'POST',
    });
  },

  // Search paragraphs
  search(payload: { words: string[]; operator: 'and' | 'or' }) {
    return this.request('/search', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  // Get word frequency
  getWordFrequency() {
    // The API exposes the dictionary/frequency endpoint at GET /dictionary
    return this.request('/dictionary', {
      method: 'GET',
    });
  },
};