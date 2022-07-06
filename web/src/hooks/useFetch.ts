import { useState, useEffect, useRef } from 'react';
import { api } from '~/lib/api';

interface UseFetchProps {
  url: string;
  method: 'GET' | 'POST' | 'DELETE' | 'PATCH';
  data: Object;
}

export function useFetch<T>({ url, method, data }: UseFetchProps) {
  const renderings = useRef(0);

  const [isLoadingRequest, setIsLoadingResponse] = useState(true);
  const [response, setResponse] = useState<T | null>(null);
  const [error, setError] = useState();

  function requestFetch () {
    api({
      method: method,
      url: url,
      data
    })
    .then(response => setResponse(response.data))
    .catch(error => setError(error))
    .finally(() => setIsLoadingResponse(false));
  }

  useEffect(() => {
    renderings.current += 1;
    renderings.current == 1 && requestFetch();
  }, []);

  return { data: response, loading: isLoadingRequest, error };
}