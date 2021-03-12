import express from "express";
import CityController from "../controller/city";
import ForecastController from "../controller/forecast";
import { instanceOfErrorResponse } from "../types";
import { setCache, getCache, clearCache } from "../redis";
import { createClient } from "redis";

const router = express.Router();
const publisher = createClient(6379, "redis");

router.get("/", async (_req, res) => {
    let data = await getCache("all");
    if (data) {
        return res.send(data);
    }
    const controller = new CityController();
    const response = await controller.getCities();
    await setCache("all", response);
    return res.send(response);
});

router.post("/", async (req, res) => {
    const controller = new CityController();
    const response = await controller.createCity(req.body);
    await clearCache("all");
    return res.send(response);
});

router.get("/locked", async (_req, res) => {
    let data = await getCache("locked");
    if (data) {
        return res.send(data);
    }
    const controller = new CityController();
    const response = await controller.lockedCities();
    await setCache("locked", response);
    return res.send(response);
})

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    let data = await getCache(id);
    if (data) {
        return res.send(data);
    }
    const controller = new CityController();
    const response = await controller.getCity(id);
    if (instanceOfErrorResponse(response)) {
        return res.status(response.code).send({ message: response.message });
    }
    await setCache(id, response);
    return res.send(response);
});

router.put("/:id/lock", async (req, res) => {
    const id = req.params.id;
    const controller = new CityController();
    const response = await controller.lockCity(id);
    if (instanceOfErrorResponse(response)) {
        return res.status(response.code).send({ message: response.message });
    }
    await clearCache("all");
    await setCache(id, response);
    return res.send(response);
});

router.put("/:id/unlock", async (req, res) => {
    const id = req.params.id
    const controller = new CityController();
    const response = await controller.unlockCity(id);
    if (instanceOfErrorResponse(response)) {
        return res.status(response.code).send({ message: response.message });
    }
    await clearCache("all");
    await setCache(id, response);
    return res.send(response);
});

router.put("/:id", async (req, res) => {
    const id = req.params.id
    const controller = new CityController();
    const response = await controller.updateCity(id, req.body);
    if (instanceOfErrorResponse(response)) {
        return res.status(response.code).send({ message: response.message });
    }
    await clearCache("all");
    await setCache(id, response);
    return res.send(response);
});

router.delete("/:id", async (req, res) => {
    const id = req.params.id
    const controller = new CityController();
    const response = await controller.deleteCity(id);
    if (instanceOfErrorResponse(response)) {
        return res.status(response.code).send({ message: response.message });
    }
    await clearCache("all");
    await clearCache(id);
    return res.send(response);
});

router.post("/:id/forecast", async (req, res) => {
    const id = req.params.id
    const controller = new ForecastController();
    const response = await controller.createForecast(Number(id), req.body);
    if (instanceOfErrorResponse(response)) {
        return res.status(response.code).send({ message: response.message });
    }
    publisher.publish("forecast", JSON.stringify(response));
    await clearCache("all");
    await clearCache(id);
    await clearCache("forecast");
    return res.send(response);
});

router.delete("/:id/forecast", async (req, res) => {
    const id = req.params.id
    const controller = new ForecastController();
    const response = await controller.deleteLatestForecast(id);
    if (instanceOfErrorResponse(response)) {
        return res.status(response.code).send({ message: response.message });
    }
    await clearCache("all");
    await clearCache("id");
    await clearCache("forecast");
    return res.send(response);
})

export default router;