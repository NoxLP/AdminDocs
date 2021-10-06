import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import {
  checkToken,
  login as loginService,
  RequestResult,
} from "../services/api";
import { api } from "../services/api-config";

export default function useLogin() {
  const [phoneInput, setPhoneInput] = useState<string>("");
  const [pwdInput, setPwdInput] = useState<string>("");

  const isUserLoggedAsync = async (): Promise<boolean> => {
    const token = await AsyncStorage.getItem("token");
    console.log(">> Token: ", token);

    if (!token) return false;

    api.setHeader("token", token);
    const check = await checkToken();
    console.log(">> Check: " + JSON.stringify(check, null, 4));

    if (!check.correct) {
      AsyncStorage.removeItem("token");
      if (AsyncStorage.getItem("user")) AsyncStorage.removeItem("user");
      console.log("Token not valid");

      return false;
    }

    const user = await AsyncStorage.getItem("user");
    if (!user) {
      console.log(">> User: ", user);
      await AsyncStorage.setItem("user", JSON.stringify(check.data.user));
    }
    const user2 = await AsyncStorage.getItem("user");
    console.log(JSON.stringify(user2, null, 4));

    return true;
  };
  const loginAsync = async (): Promise<RequestResult> => {
    console.log("token not in storage");

    const response = await loginService(phoneInput, pwdInput);
    // if (!isError) navigation.navigate("dashboard")

    if (response.correct) {
      AsyncStorage.setItem("token", response.data.token);
      AsyncStorage.setItem("user", JSON.stringify(response.data.user));
      api.setHeader("token", response.data.token);
    }

    console.log(AsyncStorage.getItem("user"));

    return response;
  };

  return {
    isUserLoggedAsync,
    phoneInput,
    setPhoneInput,
    pwdInput,
    setPwdInput,
    loginAsync,
  };
}
