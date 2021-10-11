import { ApiResponse } from "apisauce";
import { api } from "./api-config";
import Document from "../models/Document";

export interface RequestResult {
  correct: boolean;
  data: any;
  response?: ApiResponse<any>;
}

//#region helpers
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

const logFormData = (data: FormData) => {
  console.log("VALUES");
  //const values = data.entries();
  //console.log("VALUES: ", values);

  for (const pair of data) {
    console.log("entries for");

    console.log(pair[0] + ", " + pair[1]);
  }
};

const getError = (err: any) => {
  console.error(
    `ERROR in login: ${err.message} \n ${JSON.stringify(err, null, 4)}`
  );
  return { correct: false, data: err.message };
};
//#endregion

export const checkToken = async (): Promise<RequestResult> => {
  try {
    const response: ApiResponse<any> = await api.get("/auth/check");

    return getRequestResult(response);
  } catch (err) {
    return getError(err);
  }
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
    console.log("RESPONSE DATA: " + JSON.stringify(response.data, null, 4));

    return getRequestResult(response);
  } catch (err) {
    return getError(err);
  }
};

export const addDocument = async (data: Document) => {
  try {
    console.log("addDocument: ", data);

    const formData = new FormData();

    formData.append("image", {
      uri: data.uri,
      name: data.name,
      type: data.contentType,
    });
    formData.append("contentType", data.contentType);
    formData.append("community", data.community);
    formData.append("user", data.user);
    formData.append("date", data.date.toString());
    formData.append("category", data.category);
    formData.append("name", data.name);
    formData.append("comments", data.comments);
    console.log("addDocument 2", formData);

    //logFormData(formData);
    //console.log("ADD DOC: ", JSON.stringify(formData.entries(), null, 4));

    const response: ApiResponse<any> = await api.post("/documents", data);

    return getRequestResult(response);
  } catch (err) {
    return getError(err);
  }
};
