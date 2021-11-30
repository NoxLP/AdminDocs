import { deleteItemAsync, getItemAsync, setItemAsync } from 'expo-secure-store';
import IUser, { isUser } from '../models/User';
import { RequestResult } from './api';
import { api } from './api-config';

const TOKEN_KEY = 'token';
const USER_KEY = 'user';

export async function saveLoggedUser(
  loginResult: RequestResult
): Promise<boolean> {
  const token = loginResult.data.token;
  const user = loginResult.data.user;
  if (!isUser(user)) return false;

  // if the user was already logged, use the stored token, otherwise
  // use the new one
  if (token) {
    await setItemAsync(TOKEN_KEY, token);
    api.setHeader('token', token);
  } else api.setHeader('token', (await getToken())!);

  await setItemAsync(USER_KEY, JSON.stringify(user));

  return true;
}

export async function removeLoggedUser() {
  api.deleteHeader('token');
  await deleteItemAsync(TOKEN_KEY);
  await deleteItemAsync(USER_KEY);
}

export async function getToken(): Promise<string | null> {
  //const token = await getItemAsync(TOKEN_KEY);
  //console.log(">> get token: ", token);

  return await getItemAsync(TOKEN_KEY);
}

export async function getUser(): Promise<IUser | null> {
  const savedUser = await getItemAsync(TOKEN_KEY);
  if (!savedUser) return null;

  return JSON.parse(savedUser);
}
