import { saveLoggedUser } from "../../services/auth-storage";
import {
  login as loginService,
  RequestResult,
} from "../../services/api";
import { useMutation, useQueryClient } from "react-query";

export interface LoginData {
  phone: string;
  password: string;
}

export default function useLogin() {
  const login = async (data: LoginData): Promise<RequestResult> => {
    const response = await loginService(data.phone, data.password);

    if (response.correct) {
      // TODO: This return false if something goes wrong, check and show errors
      console.log("login logged");

      await saveLoggedUser(response);
    }

    return response;
  };

  const queryClient = useQueryClient();
  return useMutation("login", login, {
    onSuccess: () => {
      return queryClient.invalidateQueries("authCheck");
    },
  });
}
