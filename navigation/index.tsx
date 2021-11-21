/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import React from "react";
import { ColorSchemeName, Text } from "react-native";
import useLogin from "../hooks/auth/useLogin";
import AuthNavigator from "./AuthNavigator";
import RootNavigator from "./RootNavigator";
import useAuthCheck from "../hooks/auth/useAuthCheck";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  const { isLoading, data: isAlreadyLogged } = useAuthCheck();
  const {
    isLoading: isLoginLoading,
    isSuccess,
    isError,
    data: isLogged,
  } = useLogin();

  return isLoading || isLoginLoading ? (
    <Text style={{ marginTop: "50%" }}>LOADING</Text>
  ) : isAlreadyLogged || (isSuccess && isLogged && isLogged.correct && !isError) ? (
      <RootNavigator />
  ) : (
    <AuthNavigator />
  );
}
