import { getRepository } from "typeorm";
import { Forecast } from "../models";
import { ErrorResponse, ForecastPayload } from "../types";

export const createForecast = async (payload: ForecastPayload): Promise<Forecast> => {
    const forecastRepository = getRepository(Forecast);
    const forecast = new Forecast();
    return await forecastRepository.save({
        ...forecast,
        ...payload
    });
}

export const getLatestForecast = async (): Promise<Forecast> => {
    const forecastRepository = getRepository(Forecast);
    const forecast = await forecastRepository
        .createQueryBuilder("forecast")
        .orderBy("forecast.id", "DESC")
        .limit(1)
        .leftJoinAndSelect("forecast.city", "city")
        .getOne();
    return forecast;
}

export const deleteLatestForecast = async (cityId: number): Promise<Forecast | ErrorResponse> => {
    const forecastRepository = getRepository(Forecast);
    const forecast = await forecastRepository
        .createQueryBuilder("forecast")
        .where("forecast.cityId = :cityId", { cityId })
        .orderBy("forecast.id", "DESC")
        .limit(1)
        .getOne();
    if (!forecast) return { code: 404, message: "Forecast not found" };
    forecastRepository.delete({ id: forecast.id });
    return forecast;
}