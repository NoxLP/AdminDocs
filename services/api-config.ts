// Use this import if you want to use "env.js" file
const { API_URL } = require("../config/env")
// Or just specify it directly like this:
// const API_URL = "http://localhost:3000/api"
// import { API_URL } from "@env"

export interface ApiConfig {
  url: string
  timeout: number
}

export const DEFAULT_API_CONFIG: ApiConfig = {
  url: API_URL, // || "https://jsonplaceholder.typicode.com",
  timeout: 10000,
}