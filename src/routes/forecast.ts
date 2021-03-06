import express from 'express';
import ForecastController from "../controller/forecast";
import { setCache, getCache } from "../redis";
const router = express.Router();

router.get("/", async (_req, res) => {
    let data = await getCache("forecast");
    if (data) {
        return res.send(data);
    }
    const controller = new ForecastController();
    const response = await controller.getLatestForecast();
    await setCache("forecast", response);
    res.send(response);
});

export default router;