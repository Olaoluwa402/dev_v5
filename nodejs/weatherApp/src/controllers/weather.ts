import { Request, Response } from "express";
import { LatLon } from "../interface/index";
import axios, { AxiosResponse } from "axios";
import { APIRequest } from "../utils/apiRequest";

export const getWeatherList = async (req: Request, res: Response) => {
  //make to open weather
  let page = req.query.page ? +req.query.page : 1;
  let pageSize = req.query.pageSize ? +req.query.pageSize : 10;
  return await getWeatherListQuery(page, pageSize);
};

async function getWeatherListQuery(
  page: number,
  pageSize: number
): Promise<AxiosResponse | undefined> {
  return await APIRequest("/weather", "GET", {}, {});
}
