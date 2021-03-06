import express from "express";
import CityController from "../controller/city";

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
})

export default router;