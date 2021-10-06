/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import * as React from "react";
import { ColorSchemeName, Pressable, Text } from "react-native";
import useLogin from "../hooks/useLogin";
import AuthNavigator from "./AuthNavigator";
import LinkingConfiguration from "./LinkingConfiguration";
import RootNavigator from "./RootNavigator";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  const { isLoading, isUserLogged } = useLogin();
  const [isLogged, setIsLogged] = React.useState<boolean>();

  React.useEffect(() => {
    (async function checkUserIsLogged() {
      setIsLogged(await isUserLogged());
    })();
  }, []);

  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      {isLoading ? (
        <Text style={{ marginTop: "50%" }}>LOADING</Text>
      ) : isLogged ? (
        <RootNavigator />
      ) : (
        <AuthNavigator />
      )}
    </NavigationContainer>
  );
}
