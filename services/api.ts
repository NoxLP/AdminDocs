import { ApiResponse } from 'apisauce';
import { api } from './api-config';
import { getToken } from './auth-storage';
import DocumentCategory from '../models/DocumentCategory';
import IDocument from '../models/Document';

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
    console.log('response NO ok: ', JSON.stringify(response, null, 4));
    return { correct: false, data: response.problem, response };
  }

  return {
    correct: true,
    data:
      dataProperty && dataProperty !== ''
        ? response.data[dataProperty]
        : response.data,
    response,
  };
};

const logFormData = (data: FormData) => {
  console.log('VALUES');
  //const values = data.entries();
  //console.log("VALUES: ", values);

  for (const pair of data) {
    console.log('entries for');

    console.log(pair[0] + ', ' + pair[1]);
  }
};

const getError = (err: any) => {
  console.error(`ERROR: ${err.message} \n ${JSON.stringify(err, null, 4)}`);
  return { correct: false, data: err.message };
};

const buildDocumentsArray = (requestResult: RequestResult) => {
  return requestResult.data.map((doc) => {
    const date = new Date(doc.date);
    const document: IDocument = {
      id: doc._id,
      data: doc.data,
      uri: '',
      contentType: doc.contentType,
      community: doc.community,
      user: doc.user,
      date,
      category: doc.category,
      name: doc.name,
      comments: doc.comments,
    };
    return document;
  });
};
//#endregion

export const checkToken = async (): Promise<RequestResult> => {
  try {
    const response: ApiResponse<any> = await api.get('/auth/check');

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
    const response: ApiResponse<any> = await api.post('/auth/login', {
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
    console.log('RESPONSE DATA: ' + JSON.stringify(response.data, null, 4));

    return getRequestResult(response);
  } catch (err) {
    return getError(err);
  }
};

export const addDocument = async (data: IDocument) => {
  console.log('API DATA:');
  console.log(data);

  try {
    const formData = new FormData();

    formData.append('image', {
      uri: data.uri,
      name: data.name,
      type: data.contentType,
    });
    formData.append('contentType', data.contentType);
    formData.append('community', data.community);
    formData.append('user', data.user);
    formData.append('date', data.date.toString());
    formData.append('category', data.category);
    formData.append('name', data.name);
    formData.append('comments', data.comments);
    console.log('API FORM DATA:');
    console.log(formData);

    const token = await getToken();
    api.setHeader('token', token!);
    const response: ApiResponse<any> = await api.post('/documents', formData);

    return getRequestResult(response);
  } catch (err) {
    return getError(err);
  }
};

export const getUserDocuments = async (): Promise<RequestResult> => {
  try {
    const token = await getToken();
    api.setHeader('token', token!);
    const response: ApiResponse<any> = await api.get('/users/docs');

    const result = getRequestResult(response);
    if (result.correct) {
      result.data = buildDocumentsArray(result);
    }

    return result;
  } catch (err) {
    return getError(err);
  }
};

export const getCommunityDocuments = async (): Promise<RequestResult> => {
  try {
    const token = await getToken();
    api.setHeader('token', token!);
    const response: ApiResponse<any> = await api.get('/communities/docs');

    const result = getRequestResult(response);
    if (result.correct) {
      result.data = buildDocumentsArray(result);
    }

    return result;
  } catch (err) {
    return getError(err);
  }
};
