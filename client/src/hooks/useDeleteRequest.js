import { useMutation } from "react-query";
import axios from "axios";

function useDeleteRequest(url, onSuccess, onError, onMutate) {
  const deleteExpenseMutation = useMutation(
    async (id) => {
      const response = await axios.delete(`${url}/${id}`);
      return response;
    },
    { onSuccess: onSuccess },
    { onError: onError },
    { onMutate: onMutate }
  );

  return deleteExpenseMutation;
}

export default useDeleteRequest;
