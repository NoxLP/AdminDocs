//import { AxiosRequestConfig } from "axios";
// Use this import if you want to use "env.js" file
const { API_URL } = require("../config/env")
// Or just specify it directly like this:
// const API_URL = "http://localhost:3000/api"
// import { API_URL } from "@env"
import { create, ApisauceConfig } from "apisauce";

const DEFAULT_API_CONFIG: ApisauceConfig = {
  baseURL: API_URL, // || "https://jsonplaceholder.typicode.com",
  timeout: 10000,
  /*headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'content-type': 'application/x-www-form-urlencoded'
  }*/
}

export const api = create(DEFAULT_API_CONFIG)