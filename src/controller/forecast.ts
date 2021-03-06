import {
    ForecastPayload,
    getLatestForecast,
    getForecasts,
    createForecast,
    deleteLatestForecast
} from "../repositories/forecast";
import { Forecast } from "../models"

export default class ForecastController {
    public async getForecasts(): Promise<Array<Forecast>> {
        return getForecasts();
    }

    public async createForecast(body: ForecastPayload): Promise<Forecast | null> {
        if (new Date(body.from) > new Date(body.to)) {
            return null;
        }
        return createForecast(body);
    }

    public async getLatestForecast(): Promise<Forecast> {
        return getLatestForecast();
    }

    public async deleteLatestForecast(cityId: string): Promise<Forecast | null> {
        return deleteLatestForecast(Number(cityId));
    }
}