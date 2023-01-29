import { useMutation } from "react-query";
import axios from "axios";

function useDeleteRequest(url, onSuccess, onError, onMutate) {
  const deleteExpenseMutation = useMutation(
    async () => {
      const response = await axios.delete(url);
      return response.data;
    },
    { onSuccess: onSuccess },
    { onError: onError },
    { onMutate: onMutate }
  );

  return deleteExpenseMutation;
}

export default useDeleteRequest;
