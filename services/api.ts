import { ApiResponse } from "apisauce";
import { api } from "./api-config";

export interface RequestResult {
  correct: boolean;
  data: any;
  response?: ApiResponse<any>;
}

const getRequestResult = (
  response: ApiResponse<any>,
  dataProperty?: string
): RequestResult => {
  if (!response.ok) {
    console.log("response NO ok");
    return { correct: false, data: response.problem, response };
  }

  return {
    correct: true,
    data:
      dataProperty && dataProperty !== ""
        ? response.data[dataProperty]
        : response.data,
    response,
  };
};

export const login = async (
  mobile: string,
  password: string
): Promise<RequestResult> => {
  console.log(`login: ${mobile} ${password}`);

  try {
    console.log({ mobile, password });

    /*
    const response: AxiosResponse<any> = await axiosInstance.post("auth/login", { mobile, password })
    */
    const response: ApiResponse<any> = await api.post("/auth/login", {
      mobile,
      password,
    });
    /*
    const response: Response = await fetch(DEFAULT_API_CONFIG.url+ "/auth/login",
      {
        method: 'POST',
        body: JSON.stringify({
          mobile, password
        })
    })
    */
    console.log("RESPONSE: " + JSON.stringify(response, null, 4));

    return getRequestResult(response, "token");
  } catch (err) {
    console.log(
      `ERROR in login: ${err.message} \n ${JSON.stringify(err, null, 4)}`
    );
    return { correct: false, data: err.message };
  }
};
