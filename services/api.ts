// import axios, { AxiosInstance, AxiosResponse } from "axios"
import { ApiResponse } from "apisauce"
import { api } from "./api-config"

export interface RequestResult {
  correct: boolean
  data: any
}

export const login = async (mobile: string, password: string): Promise<RequestResult> => {
  console.log(`login: ${mobile} ${password}`)
  
  try {
    console.log({ mobile, password })

    /*
    const response: AxiosResponse<any> = await axiosInstance.post("auth/login", { mobile, password })
    */
    const response = await api.post("/auth/login", { mobile, password })
    /*
    const response: Response = await fetch(DEFAULT_API_CONFIG.url+ "/auth/login",
      {
        method: 'POST',
        body: JSON.stringify({
          mobile, password
        })
    })
    */
    console.log('RESPONSE: '+JSON.stringify(response, null, 4));
    
    if (!response.ok) {
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