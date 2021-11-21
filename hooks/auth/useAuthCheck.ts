import {
  getToken,
  removeLoggedUser,
  saveLoggedUser,
} from "../../services/auth-storage";
import { checkToken } from "../../services/api";
import { api } from "../../services/api-config";
import { useQuery } from "react-query";

export default function useAuthCheck() {
  const checkUserIsLogged = async (): Promise<boolean> => {
    console.log(">>> checkUserIsLogged")
    const token = await getToken();
    console.log("token ", token);

    if (!token) {
      return false;
    }
    console.log("token true");

    api.setHeader("token", token);
    const check = await checkToken();

    if (!check.correct) {
      console.log("check false");

      await removeLoggedUser();

      return false;
    }
    console.log("check true");

    // TODO: This return false if something goes wrong, check and show errors
    await saveLoggedUser(check);
    console.log("logged saved");

    return true;
  };

  return useQuery("authCheck", checkUserIsLogged);
}