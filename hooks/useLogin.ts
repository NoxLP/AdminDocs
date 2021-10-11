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
import { useQuery, useMutation, useQueryClient } from "react-query";

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

export function useAuthCheck() {
  const checkUserIsLogged = async (): Promise<boolean> => {
    const token = await getToken();
    console.log("token ", token);

    if (!token) {
      return false;
    }
    console.log("token true");

    api.setHeader("token", token);
    const check = await checkToken();

    if (!check.correct) {
      console.log("check false");

      await removeLoggedUser();

      return false;
    }
    console.log("check true");

    // TODO: This return false if something goes wrong, check and show errors
    await saveLoggedUser(check);
    console.log("logged saved");

    return true;
  };

  return useQuery("authCheck", checkUserIsLogged);
}
