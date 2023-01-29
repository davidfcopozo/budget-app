import { useQuery } from "react-query";
import axios from "axios";

function useFetchRequest(key, url, options = {}) {
  const { data, error, isLoading, isFetching, refetch } = useQuery(
    {
      queryKey: key,
      queryFn: async () => {
        const response = await axios.get(url, options);
        return response.data;
      },
    },
    {
      staleTime: 30000,
      ...options,
    }
  );
  return { data, error, isLoading, isFetching, refetch };
}

export default useFetchRequest;
