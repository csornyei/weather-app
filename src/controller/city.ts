import {
    getCity,
    getCities,
    createCity,
    updateCity,
    deleteCity,
    lockCity,
    unlockCity,
    lockedCities
} from "../repositories/city";
import { City } from "../models";
import { CityPayload, ErrorResponse } from "../types";
import { Get, Post, Put, Delete, Route, Body, Path } from "tsoa";

@Route("/api/city")
export default class CityController {
    @Get("")
    public async getCities(): Promise<Array<City>> {
        return getCities();
    }
    @Post("")
    public async createCity(@Body() body: CityPayload): Promise<City> {
        return createCity(body);
    }
    @Get("{cityId}")
    public async getCity(@Path() cityId: string): Promise<City | ErrorResponse> {
        return getCity(Number(cityId));
    }
    @Put("{cityId}")
    public async updateCity(@Path() cityId: string, @Body() body: CityPayload): Promise<City | ErrorResponse> {
        return updateCity(Number(cityId), body);
    }
    @Delete("{cityId}")
    public async deleteCity(@Path() cityId: string): Promise<City | ErrorResponse> {
        return deleteCity(Number(cityId));
    }
    @Put("{cityId}/lock")
    public async lockCity(@Path() cityId: string): Promise<City | ErrorResponse> {
        return lockCity(Number(cityId));
    }
    @Put("{cityId}/unlock")
    public async unlockCity(@Path() cityId: string): Promise<City | ErrorResponse> {
        return unlockCity(Number(cityId));
    }
    @Get("/locked")
    public async lockedCities(): Promise<Array<City>> {
        return lockedCities();
    }
}