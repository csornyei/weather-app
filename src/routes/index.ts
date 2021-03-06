import express from "express";
import CityRoutes from "./city";

const router = express.Router();

router.use("/api/city", CityRoutes);

export default router;