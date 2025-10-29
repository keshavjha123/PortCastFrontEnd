import { useState, useCallback } from 'react';
import type { SearchResponse, SearchRequest } from '../types/api';
import { apiClient, type ApiResponse } from '../utils/api';

export const useSearch = () => {
  const [data, setData] = useState<SearchResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [responseTime, setResponseTime] = useState<number | null>(null);
  const [isColdStart, setIsColdStart] = useState(false);

  const search = useCallback(async (searchRequest: SearchRequest) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiClient.search(searchRequest) as ApiResponse<SearchResponse>;
      setData(response.data);
      setResponseTime(response.responseTime);
      setIsColdStart(response.isColdStart);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to search paragraphs');
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setResponseTime(null);
    setIsColdStart(false);
  }, []);

  return { data, loading, error, responseTime, isColdStart, search, reset };
};