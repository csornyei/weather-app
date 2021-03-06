import express from "express";
import CityRoutes from "./city";
import ForecastRouter from "./forecast";

const router = express.Router();

router.use("/api/city", CityRoutes);
router.use("/api/forecast", ForecastRouter);

export default router;