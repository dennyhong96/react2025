import { useEffect } from "react";
import useSWR, { cache } from "swr";

const useInitialSWR = (key, fetchFn, config = {}) => {
  const swrResponse = useSWR(key, fetchFn, config);
  const initialData = config.initialData;

  useEffect(() => {
    if (initialData) {
      return cache.set(key, initialData);
    }
  }, []);

  return swrResponse;
};

export default useInitialSWR;
