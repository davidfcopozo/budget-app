import { useMutation } from "react-query";
import axios from "axios";

function useUpdateRequest(url, { onSuccess, onError, onMutate }) {
  const updateExpenseMutation = useMutation(
    async ({ id, data }) => {
      const response = await axios.put(`${url}/${id}`, data);
      return response;
    },
    { onSuccess: onSuccess },
    { onError: onError },
    { onMutate: onMutate }
  );

  return updateExpenseMutation;
}

export default useUpdateRequest;
