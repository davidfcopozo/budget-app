import { useQuery } from "react-query";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";

function useFetchRequest(key, url) {
  const { currentUser } = useAuth();

  const [currentUserId, setCurrentUserId] = useState(undefined);
  async function getUserId() {
    setCurrentUserId(await currentUser?.uid);
  }
  getUserId();

  const { data, error, isLoading, isFetching, refetch } = useQuery(
    {
      queryKey: key,
      queryFn: async () => {
        const response = await axios.get(url, {
          headers: { uid: `${currentUserId}` },
        });
        return response.data;
      },
      enabled: !!currentUserId,
    },
    {
      staleTime: 30000,
    }
  );
  return { data, error, isLoading, isFetching, refetch };
}

export default useFetchRequest;
