import express, { Router, Request, Response } from "express";
import { getWeatherList } from "../controllers/weather";
const router: Router = express.Router();

router.route("/").get(getWeatherList);

export default router;
