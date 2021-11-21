import { useMutation, useQueryClient } from "react-query";
import { removeLoggedUser } from "../../services/auth-storage";

export default function useLogout() {
  const logout = async () => {
    await removeLoggedUser();

    return false;
  }

  const queryClient = useQueryClient();
  return useMutation("logout", logout, {
    onSuccess: () => {
      return queryClient.invalidateQueries("authCheck");
    },
  });
}