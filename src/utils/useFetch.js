import { useCallback, useEffect, useState } from "react";
import { useAxios } from "./useAxios";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export function useFetch({
  root = baseUrl,
  path = "",
  method = "get",
  params,
  data,
  config = {},
}) {
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setIsLoading(true);
      setIsError(null);

      const url = `${root}/${path}`;

      try {
        const res =
          method === "get"
            ? await useAxios.get(url, { params, ...config })
            : await useAxios[method](url, data, config);

        if (isMounted) {
          setResponse(res.data);
        }
      } catch (err) {
        if (isMounted) {
          setIsError(err);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [root, path, method, JSON.stringify(params), JSON.stringify(data)]);

  return { data: response, isLoading, isError };
}

export async function useFetchFn({
  root = baseUrl,
  path = "",
  method = "get",
  params,
  data,
  config = {},
}) {
  const url = `${root}/${path}`;

  try {
    const res =
      method === "get"
        ? await useAxios.get(url, { params, ...config })
        : await useAxios[method](url, data, config);

    return res.data;
  } catch (err) {
    return err;
  }
}

export function useScrollFetch({
  threshold = 300,
  fetchCallback,
  disabled = false,
  onSuccess,
}) {
  const [isFetching, setIsFetching] = useState(false);

  const handleScroll = useCallback(async () => {
    if (disabled || isFetching) return;

    const scrollPosition =
      window.innerHeight + document.documentElement.scrollTop;
    const bottomPosition = document.documentElement.offsetHeight;

    if (bottomPosition - scrollPosition < threshold) {
      setIsFetching(true);
      try {
        await fetchCallback();

        if (onSuccess) {
          onSuccess();
        }
      } finally {
        setIsFetching(false);
      }
    }
  }, [threshold, fetchCallback, disabled, isFetching]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);
}

export function getErrorWithMeta(error) {
  return {
    is: error ? true : false,
    message: error ? error.message : null,
    errorCode: error?.response?.data?.error_code
      ? error.response.data.error_code
      : null,
  };
}

export function getObjectWithMeta({ object = undefined, page = false } = {}) {
  let object_ = object !== undefined ? object : {};
  let isLoading = false;
  let error = { is: false, message: null, errorCode: null };

  if (page) {
    return { data: object_, page: 1, isLoading, error };
  } else {
    return { data: object_, isLoading, error };
  }
}
