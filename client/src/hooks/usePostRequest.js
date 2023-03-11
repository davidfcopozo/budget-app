import { useMutation } from "react-query";
import axios from "axios";
import { auth } from "../config/firebase.config";
import { useEffect, useState } from "react";

function usePostRequest(url, onSuccess, onError, onMutate, idToken) {
  const { mutate, data, status, error } = useMutation(
    async (body) => {
      const response = await axios.post(url, body, {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });
      return response.data;
    },
    { onSuccess: onSuccess, enabled: !!idToken },
    { onError: onError },
    { onMutate: onMutate }
  );

  return { mutate, data, status, error };
}

export default usePostRequest;
