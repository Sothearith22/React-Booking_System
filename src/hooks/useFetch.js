import { useEffect, useEffectEvent, useRef, useState } from 'react';

const useFetch = (fetcher, options = {}) => {
  const {
    onSuccess,
    onError,
    onSettled,
    clearDataOnRun = true,
  } = options;
  const [request, setRequest] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const requestIdRef = useRef(0);

  const handleSuccess = useEffectEvent((result, payload) => {
    onSuccess?.(result, payload);
  });

  const handleError = useEffectEvent((fetchError, payload) => {
    onError?.(fetchError, payload);
  });

  const handleSettled = useEffectEvent(() => {
    onSettled?.();
  });

  const executeRequest = useEffectEvent(async (nextRequest) => {
    setLoading(true);
    setError(null);

    try {
      const result = await fetcher(nextRequest.payload);

      if (requestIdRef.current !== nextRequest.id) {
        return;
      }

      setData(result);
      handleSuccess(result, nextRequest.payload);
    } catch (fetchError) {
      if (requestIdRef.current !== nextRequest.id) {
        return;
      }

      setError(fetchError);
      handleError(fetchError, nextRequest.payload);
    } finally {
      if (requestIdRef.current === nextRequest.id) {
        setLoading(false);
        setRequest(null);
        handleSettled();
      }
    }
  });

  useEffect(() => {
    if (!request) {
      return;
    }

    executeRequest(request);
  }, [request]);

  const run = (payload) => {
    const nextRequest = {
      id: requestIdRef.current + 1,
      payload,
    };

    requestIdRef.current = nextRequest.id;

    if (clearDataOnRun) {
      setData(null);
    }

    setError(null);
    setRequest(nextRequest);
  };

  const reset = () => {
    requestIdRef.current += 1;
    setRequest(null);
    setData(null);
    setError(null);
    setLoading(false);
  };

  return {
    data,
    loading,
    error,
    run,
    reset,
  };
};

export default useFetch;
