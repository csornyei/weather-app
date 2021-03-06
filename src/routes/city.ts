import express from "express";
import CityController from "../controller/city";

const router = express.Router();

router.get("/", async (_req, res) => {
    const controller = new CityController();
    const response = await controller.get();
    return res.send(response);
})

export default router;