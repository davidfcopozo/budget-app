import { useMutation } from "react-query";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";

function useDeleteRequest(url, onSuccess, onError, onMutate, idToken) {
  const { currentUser } = useAuth();

  const [currentUserId, setCurrentUserId] = useState("");

  useEffect(async () => {
    getUserId();
  }, [url, currentUser, idToken]);

  async function getUserId() {
    setCurrentUserId(await currentUser?.uid);
  }

  const deleteExpenseMutation = useMutation(
    async (id) => {
      const response = await axios.delete(`${url}/${id}`, {
        headers: {
          uid: `${currentUserId}`,
          Authorization: `Bearer ${idToken}`,
          "Access-Control-Allow-Origin": "*",
        },
      });
      return response;
    },
    { onSuccess: onSuccess, enabled: !!currentUserId && !!idToken },
    { onError: onError },
    { onMutate: onMutate }
  );

  return deleteExpenseMutation;
}

export default useDeleteRequest;
