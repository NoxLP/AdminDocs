import React, { useEffect } from "react";
import {
  Image,
  ImageStyle,
  KeyboardAvoidingView,
  Platform,
  ViewStyle,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "../components/Button/Button";
import Input from "../components/Input/Input";
import { ViewProps } from "../components/Themed";
import Layout from "../constants/Layout";
import useLogin from "../hooks/useLogin";
import { RootStackScreenProps } from "../types";

const CONTAINER: ViewStyle = {
  flex: 1,
};
const INNER_CONTENT: ViewStyle = {
  flex: 1,
  minHeight: Layout.window.height,
  width: Layout.window.width,
};
const CONTAINER_CONTENT: ViewStyle = {
  flex: 1,
  alignItems: "center",
};
const LOGO: ImageStyle = {
  height: 250,
  width: "80%",
  marginTop: "6%",
  marginBottom: "10%",
};
const INPUT: ViewStyle = {
  margin: "10%",
};

export default function Login({ navigation }: RootStackScreenProps<"Login">) {
  const [
    isUserLoggedAsync,
    phoneInput,
    setPhoneInput,
    pwdInput,
    setPwdInput,
    loginAsync,
  ] = useLogin();

  const loginButtonOnPress = async () => {
    //if (await login()) navigation.navigate("dashboard");
    if (await loginAsync()) alert("logged");
  };

  useEffect(() => {
    (async function checkUserIsLogged() {
      if (await isUserLoggedAsync()) {
        //navigation.navigate("dashboard");
        alert("logged");
      }
    })();
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "position"}
      style={CONTAINER}
    >
      <ScrollView
        style={INNER_CONTENT}
        contentContainerStyle={CONTAINER_CONTENT}
      >
        <Image
          style={LOGO}
          source={require("../assets/images/adminDocs-logo-placeholder.png")}
        />
        <Input
          placeholder="Nº teléfono"
          keyboardType="phone-pad"
          value={phoneInput}
          onChangeText={setPhoneInput}
        />
        <Input
          placeholder="Contraseña"
          password={true}
          value={pwdInput}
          onChangeText={setPwdInput}
        />
        <Button
          style={{ marginTop: "8%" }}
          text="Log in"
          onPress={loginButtonOnPress}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
