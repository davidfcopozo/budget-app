import { useState, useEffect } from "react";

/* This hook is used instead the helpHttp helper because in this request we need to save the response in a state variable */

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const fetchData = async () => {
      setLoading(true);

      try {
        const res = await fetch(url, {
          method: "GET",
        });
        console.log(res.status);

        if (!res.ok) {
          let err = new Error("Error in Fetch request");
          err.status = res.status || 400;
          err.statusText = res.statusText || "An error has occurred";

          throw err;
        }
        const json = await res.json();
        //console.table(res);

        if (!signal.aborted) {
          setData(json);
          setError(null);
        }
      } catch (error) {
        if (!signal.aborted) {
          setData(null);
          setError(error);
        }
      } finally {
        if (!signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => abortController.abort();
  }, [url]);

  return [data, error, loading];
};
