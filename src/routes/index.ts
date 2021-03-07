import express from "express";
import CityRoutes from "./city";
import ForecastRouter from "./forecast";

const router = express.Router();

router.use("/api/city", CityRoutes);
router.use("/api/forecast", ForecastRouter);

router.get("/", (_req, res) => {
    res.render("index");
});
export default router;