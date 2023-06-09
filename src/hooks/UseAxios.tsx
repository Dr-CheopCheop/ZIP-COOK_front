import { useState, useCallback } from "react";
import axios from "axios";
import type { requestConfigDataProps } from "../constants/interfaces";

const useAxios = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  //applyData 타입 지정해줘야함!
  const sendRequest = useCallback(
    async (
      requestConfig: requestConfigDataProps,
      applyData: (responseData: object) => void
    ) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios({
          url: requestConfig.url,
          method: requestConfig.method,
          headers: requestConfig.headers
            ? requestConfig.headers
            : { "Content-Type": "application/json" },
          data: requestConfig.data ? requestConfig.data : null,
        });
        const responseData = await response.data;
        console.log(responseData);
        applyData(responseData);
      } catch (err) {
        setError("useAxios Error");
      }
      setIsLoading(false);
    },
    []
  );

  return { isLoading, error, sendRequest };
};

export default useAxios;
