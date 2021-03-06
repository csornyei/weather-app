import {
    getLatestForecast,
    getForecasts,
    createForecast,
    deleteLatestForecast
} from "../repositories/forecast";
import { Forecast } from "../models"
import { ErrorResponse, ForecastPayload } from "../types";

export default class ForecastController {
    public async getForecasts(): Promise<Array<Forecast>> {
        return getForecasts();
    }

    public async createForecast(body: ForecastPayload): Promise<Forecast | ErrorResponse> {
        if (new Date(body.from) > new Date(body.to)) {
            return { code: 400, message: "Can't create forecast with these data" };
        }
        return createForecast(body);
    }

    public async getLatestForecast(): Promise<Forecast> {
        return getLatestForecast();
    }

    public async deleteLatestForecast(cityId: string): Promise<Forecast | ErrorResponse> {
        return deleteLatestForecast(Number(cityId));
    }
}