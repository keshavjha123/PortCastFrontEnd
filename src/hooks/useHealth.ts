import { useState, useCallback } from 'react';
import type { HealthResponse } from '../types/api';
import { apiClient, type ApiResponse } from '../utils/api';

export const useHealth = () => {
  const [data, setData] = useState<HealthResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [responseTime, setResponseTime] = useState<number | null>(null);
  const [isColdStart, setIsColdStart] = useState(false);

  const checkHealth = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiClient.health() as ApiResponse<HealthResponse>;
      setData(response.data);
      setResponseTime(response.responseTime);
      setIsColdStart(response.isColdStart);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to check health');
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, responseTime, isColdStart, checkHealth };
};