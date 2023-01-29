import { useMutation } from "react-query";
import axios from "axios";

function usePostRequest(url, onSuccess, onError, onMutate) {
  const { mutate, data, status, error } = useMutation(
    async (body) => {
      const response = await axios.post(url, body);
      return response.data;
    },
    { onSuccess: onSuccess },
    { onError: onError },
    { onMutate: onMutate }
  );

  return { mutate, data, status, error };
}

export default usePostRequest;
