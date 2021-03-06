import express from 'express';
import ForecastController from "../controller/forecast";
const router = express.Router();

router.get("/", async (_req, res) => {
    const controller = new ForecastController();
    const response = await controller.getLatestForecast();
    res.send(response);
});

export default router;