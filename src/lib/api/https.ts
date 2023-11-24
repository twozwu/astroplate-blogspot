import axios from "axios";
import config from "@/config/config.json";

axios.defaults.baseURL = "https://www.googleapis.com/blogger/v3";

export function get(url: string) {
  return function (params: object) {
    return axios.get(url, { params: params });
  };
}
