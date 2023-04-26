import { useMutation } from "react-query";
import axios from "axios";

function useUpdateRequest(url, { onSuccess, onError, onMutate, idToken }) {
  const updateExpenseMutation = useMutation(
    async ({ id, data }) => {
      const response = await axios.patch(`${url}/${id}`, data, {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });
      return response;
    },
    { onSuccess: onSuccess, enabled: !!idToken },
    { onError: onError },
    { onMutate: onMutate }
  );

  return updateExpenseMutation;
}

export default useUpdateRequest;
