import {
  getToken,
  removeLoggedUser,
  saveLoggedUser,
} from "../services/auth-storage";
import {
  checkToken,
  login as loginService,
  RequestResult,
} from "../services/api";
import { api } from "../services/api-config";
import { useState } from "react";

export interface LoginData {
  phone: string;
  password: string;
}

export default function useLogin() {
  const [isLoading, setIsLoading] = useState<boolean>();

  const isUserLogged = async (): Promise<boolean> => {
    setIsLoading(true);
    const token = await getToken();

    if (!token) return false;

    api.setHeader("token", token);
    const check = await checkToken();

    if (!check.correct) {
      await removeLoggedUser();

      setIsLoading(false);
      return false;
    }

    // TODO: This return false if something goes wrong, check and show errors
    await saveLoggedUser(check);

    setIsLoading(false);
    return true;
  };
  const login = async (data: LoginData): Promise<RequestResult> => {
    setIsLoading(true);
    const response = await loginService(data.phone, data.password);

    if (response.correct) {
      // TODO: This return false if something goes wrong, check and show errors
      await saveLoggedUser(response);
    }

    setIsLoading(false);
    return response;
  };

  return {
    isLoading,
    isUserLogged,
    login,
  };
}
