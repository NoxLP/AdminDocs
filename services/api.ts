import axios, { AxiosInstance, AxiosResponse } from "axios"
import { DEFAULT_API_CONFIG } from "./api-config"

export interface RequestResult {
  correct: boolean
  data: any
}
const axiosInstance = axios.create(DEFAULT_API_CONFIG)

export const login = async (phone: string, password: string): Promise<RequestResult> => {
  console.log(`login: ${phone} ${password}`)
  try {
    console.log({ phone, password })

    const response: AxiosResponse<any> = await axiosInstance.post("/auth/login", { phone, password })

    if (response.status > 299) {
      console.log("response NO ok")
      // const problem = getGeneralApiProblem(response)
      return { correct: false, data: response }
    }

    return { correct: true, data: response.data.token }
  } catch (err) {
    console.log(`ERROR in login: ${err.message} \n ${JSON.stringify(err, null, 4)}`)
    return { correct: false, data: err.message }
  }
}