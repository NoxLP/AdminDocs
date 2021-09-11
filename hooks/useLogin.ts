import AsyncStorage from "@react-native-async-storage/async-storage"
import { useState } from "react"
import { useQueryClient } from "react-query"
import { login as loginService } from "../services/api"

export default function useLogin(): Array<any> {
  const [emailInput, setEmailInput] = useState<string>("")
  const [pwdInput, setPwdInput] = useState<string>("")

  const queryClient = useQueryClient()
  const login = async (): Promise<boolean> => {
    console.log("login")

    // TODO: here check if token already exists on asyncstorage before call
    // the api
    if (!AsyncStorage.getItem("token")) {
      const response = await loginService(emailInput, pwdInput)
      console.log(response)
      // if (!isError) navigation.navigate("dashboard")

      if (response.correct) AsyncStorage.setItem("token", response.data.token)

      return response.correct
    }

    return true
  }
  const isUserLogged = (): boolean => {
    return !!AsyncStorage.getItem("token")
  }

  return [isUserLogged, emailInput, setEmailInput, pwdInput, setPwdInput, login]
}