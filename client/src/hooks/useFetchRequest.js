import { useQuery } from "react-query";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";
import { auth } from "../config/firebase.config";

function useFetchRequest(key, url) {
  const { currentUser } = useAuth();

  const [idToken, setIdToken] = useState("");
  const [currentUserId, setCurrentUserId] = useState("");

  useEffect(async () => {
    getUserId();
  }, [key, url, currentUser, idToken]);

  async function getUserId() {
    setCurrentUserId(await currentUser?.uid);
    await auth?.currentUser
      ?.getIdToken(/* forceRefresh */ true)
      .then((token) => setIdToken(token));
  }

  const { data, error, isLoading, isFetching, refetch } = useQuery(
    {
      queryKey: key,
      queryFn: async () => {
        const response = await axios.get(url, {
          headers: {
            uid: `${currentUserId}`,
            Authorization: `Bearer ${idToken}`,
            "Access-Control-Allow-Origin": "*",
          },
        });
        return response.data;
      },
      enabled: !!currentUserId && !!idToken,
    },
    {
      staleTime: 30000,
    }
  );
  return { data, error, isLoading, isFetching, refetch };
}

export default useFetchRequest;
