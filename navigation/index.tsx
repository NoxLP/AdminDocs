/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import React from "react";
import { ColorSchemeName, Text } from "react-native";
import { useAuthCheck } from "../hooks/useLogin";
import AuthNavigator from "./AuthNavigator";
import RootNavigator from "./RootNavigator";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  const { isLoading, data: isAlreadyLogged } = useAuthCheck();

  return isLoading ? (
    <Text style={{ marginTop: "50%" }}>LOADING</Text>
  ) : isAlreadyLogged ? (
    <RootNavigator />
  ) : (
    <AuthNavigator />
  );
}
