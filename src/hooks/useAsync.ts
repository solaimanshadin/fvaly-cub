import { useEffect, useState } from 'react';

type StatusType = 'idle' | 'pending' | 'success' | 'error';
const useAsync = <T>(asyncFunction: () => Promise<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [status, setStatus] = useState<StatusType>('idle');
  const [error, setError] = useState<string | null>(null);
  const refetchData = () => {
    setStatus('pending');
    setData(null);
    setError(null);
    asyncFunction()
      .then((res) => {
        setData(res);
        setStatus('success');
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setStatus('error');
        setData(null);
      });
  };
  useEffect(() => {
    refetchData();
  }, [asyncFunction]);

  return {
    data,
    error,
    isLoading: status === 'pending',
    isSuccess: status === 'success',
    isError: status === 'error',
    refetchData,
  };
};

export default useAsync;
