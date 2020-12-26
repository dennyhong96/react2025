import { useEffect } from "react";
import useSWR from "swr";

const useInitialSWR = (key, fetchFn, config = {}) => {
  const { mutate, ...restResponses } = useSWR(key, fetchFn, config);
  const initialData = config.initialData;

  useEffect(() => {
    if (initialData) {
      mutate(initialData, false);
      return;
    }
  }, []);

  return { mutate, ...restResponses };
};

export default useInitialSWR;
