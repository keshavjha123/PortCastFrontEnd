import { useState, useCallback } from 'react';
import type { FrequencyResponse } from '../types/api';
import { apiClient, type ApiResponse } from '../utils/api';

export const useWordFrequency = () => {
  const [data, setData] = useState<FrequencyResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [responseTime, setResponseTime] = useState<number | null>(null);
  const [isColdStart, setIsColdStart] = useState(false);

  const getWordFrequency = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiClient.getWordFrequency() as ApiResponse<FrequencyResponse>;
      setData(response.data);
      setResponseTime(response.responseTime);
      setIsColdStart(response.isColdStart);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get word frequency');
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, responseTime, isColdStart, getWordFrequency };
};