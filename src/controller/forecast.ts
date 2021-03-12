import {
    getLatestForecast,
    createForecast,
    deleteLatestForecast
} from "../repositories/forecast";
import { Forecast } from "../models"
import { ErrorResponse, ForecastPayload } from "../types";
import { Route, Get, Post, Delete, Body, Path } from "tsoa";

@Route("/")
export default class ForecastController {
    @Post("/api/city/{cityId}/forecast")
    public async createForecast(@Path() cityId: number, @Body() body: Partial<ForecastPayload>): Promise<Forecast | ErrorResponse> {
        if (new Date(body.from) > new Date(body.to)) {
            return { code: 400, message: "Can't create forecast with these data" };
        }
        return createForecast({ cityId, ...body } as ForecastPayload);
    }

    @Get("/api/forecast")
    public async getLatestForecast(): Promise<Forecast> {
        return getLatestForecast();
    }
    @Delete("/api/city/{cityId}/forecast")
    public async deleteLatestForecast(@Path() cityId: string): Promise<Forecast | ErrorResponse> {
        return deleteLatestForecast(Number(cityId));
    }
}