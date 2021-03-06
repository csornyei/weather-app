import express from "express";
import CityController from "../controller/city";
import ForecastController from "../controller/forecast";

const router = express.Router();

router.get("/", async (_req, res) => {
    const controller = new CityController();
    const response = await controller.getCities();
    return res.send(response);
});

router.post("/", async (req, res) => {
    const controller = new CityController();
    const response = await controller.createCity(req.body);
    return res.send(response);
});

router.get("/:id", async (req, res) => {
    const controller = new CityController();
    const response = await controller.getCity(req.params.id);
    if (!response) res.status(404).send({ message: "No city found" });
    return res.send(response);
});

router.put("/:id", async (req, res) => {
    const controller = new CityController();
    const response = await controller.updateCity(req.params.id, req.body);
    if (!response) res.status(404).send({ message: "No city found" });
    return res.send(response);
});

router.delete("/:id", async (req, res) => {
    const controller = new CityController();
    const response = await controller.deleteCity(req.params.id);
    if (!response) res.status(404).send({ message: "No city found" });
    return res.send(response);
});

router.post("/:id/forecast", async (req, res) => {
    const controller = new ForecastController();
    const response = await controller.createForecast({ cityId: req.params.id, ...req.body });
    if (!response) return res.status(400).send({ message: "Can't create forecast with these data" });
    return res.send(response);
});

router.delete("/:id/forecast", async (req, res) => {
    const controller = new ForecastController();
    const response = await controller.deleteLatestForecast(req.params.id);
    if (!response) return res.status(404).send({ message: "No forecast found" });
    return res.send(response);
})

export default router;