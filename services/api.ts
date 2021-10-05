import { ApiResponse } from "apisauce";
import { api } from "./api-config";
import Document from "../models/Document";
import { loadPartialConfig } from "@babel/core";

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

const uriToBlob = async (uri: string) => {
  const imageResponse = await fetch(uri);
  return await imageResponse.blob();
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

export const addDocument = async (data: Document) => {
  try {
    console.log("addDocument: ", data);

    const formData = new FormData();
    /*const blob = await uriToBlob(data.uri);
    console.log("BLOB :", blob);*/

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
    console.error(err);
  }
};
