import React, { useEffect } from "react";
import {
  Image,
  ImageStyle,
  KeyboardAvoidingView,
  Platform,
  TextStyle,
  ViewStyle,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useForm, SubmitHandler } from "react-hook-form";
import * as Yup from "yup";
import { Anchor } from "../components/Anchor/Anchor";
import { Button } from "../components/Button/Button";
import Form from "../components/Form/Form";
import { Input } from "../components/Input/Input";
import Layout from "../constants/Layout";
import useLogin, { LoginData } from "../hooks/auth/useLogin";
import { RootStackScreenProps } from "../types";
import useYupValidationResolver from "../hooks/useYupValidationResolver";
import { LinearGradient } from 'expo-linear-gradient';

const CONTAINER: ViewStyle = {
  flex: 1,

};
const INNER_CONTENT: ViewStyle = {
  flex: 1,
  minHeight: Layout.window.height,
  width: Layout.window.width,
  alignItems: "center"
};
/*
const CONTAINER_CONTENT: ViewStyle = {
  flex: 1,
  alignItems: "center",
};
*/
const LOGO: ImageStyle = {
  height: "40%",
  width: "85%",
  marginTop: "7%",
  marginBottom: "3%",
  resizeMode: "contain"
};
const LABEL: TextStyle = {
  color: "white",
  fontSize: 20
}
const INPUT: ViewStyle = {
  margin: "10%",
};
const BUTTON: ViewStyle = {
  marginTop: "10%",
  marginHorizontal: "20%",
  width: "84%"
}

export default function Login({ navigation }: RootStackScreenProps<"Login">) {
  const {
    isLoading,
    isSuccess,
    mutate: login,
    isError,
    error,
    data: isLogged,
  } = useLogin();

  // Errors messages must be set before schema
  Yup.setLocale({
    string: {
      required: "Campo obligatorio",
    },
  });
  // Validation
  const validationSchema = Yup.object().shape({
    phone: Yup.string().required(),
    password: Yup.string().required(),
  });
  // Validation resolver
  const yupResolver = useYupValidationResolver(validationSchema);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<LoginData>({ resolver: yupResolver });

  const onSubmit: SubmitHandler<LoginData> = async (data) => {
    console.log("login on press");
    await login(data);
  };
/*
  useEffect(() => {
    if ((isSuccess && !isLogged!.correct) || isError) {
      //TODO: error on login
      alert("Not logged");
    } else alert("logged");
  }, [isSuccess, isError]);
*/
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "position"}
      style={CONTAINER}
    >
        <LinearGradient
          colors={["#CFE6FB", "#81C0FA"]}
          style={INNER_CONTENT}
        >
          <Image
            style={LOGO}
            source={require("../assets/images/logo-large.png")}
          />
          <Form register={register} setValue={setValue} errors={errors}>
            <Input
              label="Nº teléfono"
              labelStyle={LABEL}
              name="phone"
              placeholder="Nº teléfono"
              keyboardType="phone-pad"
            />
            <Input 
              label="Contraseña"
              labelStyle={LABEL}
              name="password" 
              placeholder="Contraseña" 
              password={true}
              style={{ marginTop: "1%" }}
            />
          </Form>
          <Button
            style={BUTTON}
            text="Log in"
            onPress={handleSubmit(onSubmit)}
          />
          <Anchor text="¿Olvidaste tu contraseña?" style={{ marginTop: "1%" }} />
          <Anchor text="¿No tienes cuenta? Regístrate..." style={{ marginTop: "1%" }} />
        </LinearGradient>
    </KeyboardAvoidingView>
  );
}
