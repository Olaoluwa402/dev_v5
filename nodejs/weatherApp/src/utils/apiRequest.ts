import axios, { AxiosResponse, AxiosError } from "axios";
import { GenericRecord } from "../interface/index";

export const APIRequest = async (
  endPoint: string,
  method: "GET" | "POST" | "DELETE" | "PATCH" | "PUT",
  payload: any,
  headers: any
): Promise<AxiosResponse<any> | undefined> => {
  try {
    return await axios({
      url: endPoint,
      data: payload,
      method: method,
      headers: headers,
    });
  } catch (error: any) {
    return error;
  }
};
