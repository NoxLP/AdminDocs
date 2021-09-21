import AsyncStorage from "@react-native-async-storage/async-storage"
import { useState } from "react"
import { useQueryClient } from "react-query"
import { login as loginService } from "../services/api"

export default function useLogin(): Array<any> {
  const [phoneInput, setPhoneInput] = useState<string>("")
  const [pwdInput, setPwdInput] = useState<string>("")

  const queryClient = useQueryClient()
  const loginAsync = async (): Promise<boolean> => {
    console.log("login")

    // TODO: here check if token already exists on asyncstorage before call
    // the api
    if (!await AsyncStorage.getItem("token")) {
      const response = await loginService(phoneInput, pwdInput)
      console.log(response)
      // if (!isError) navigation.navigate("dashboard")

      if (response.correct) await AsyncStorage.setItem("token", response.data.token)

      return response.correct
    }

    return true
  }
  const isUserLoggedAsync = async (): Promise<boolean> => {
    return !!await AsyncStorage.getItem("token")
  }

  return [isUserLoggedAsync, phoneInput, setPhoneInput, pwdInput, setPwdInput, loginAsync]
}