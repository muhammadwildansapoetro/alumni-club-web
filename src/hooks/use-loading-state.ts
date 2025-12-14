import { useState, useCallback } from "react";

interface UseLoadingStateReturn<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
  execute: (promise: Promise<T>) => Promise<T | null>;
  reset: () => void;
}

export function useLoadingState<T = any>(): UseLoadingStateReturn<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(async (promise: Promise<T>): Promise<T | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await promise;
      setData(result);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setData(null);
    setIsLoading(false);
    setError(null);
  }, []);

  return { data, isLoading, error, execute, reset };
}