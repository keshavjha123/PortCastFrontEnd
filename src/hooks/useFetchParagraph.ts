import { useState, useCallback } from 'react';
import type { FetchResponse } from '../types/api';
import { apiClient, type ApiResponse } from '../utils/api';

export const useFetchParagraph = () => {
  const [data, setData] = useState<FetchResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [responseTime, setResponseTime] = useState<number | null>(null);
  const [isColdStart, setIsColdStart] = useState(false);

  const fetchParagraph = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiClient.fetchParagraph() as ApiResponse<FetchResponse>;
      setData(response.data);
      setResponseTime(response.responseTime);
      setIsColdStart(response.isColdStart);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch paragraph');
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, responseTime, isColdStart, fetchParagraph };
};