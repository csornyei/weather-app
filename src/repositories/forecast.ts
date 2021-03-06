import { getRepository } from "typeorm";
import { Forecast } from "../models";
import { Forecasts } from "../models/forecast";

export interface ForecastPayload {
    from: Date,
    to: Date,
    forecast: Forecasts,
    cityId: number
}

export const getForecasts = async (): Promise<Array<Forecast>> => {
    const forecastRepository = getRepository(Forecast);
    return await forecastRepository.find();
}

export const createForecast = async (payload: ForecastPayload): Promise<Forecast> => {
    const forecastRepository = getRepository(Forecast);
    const forecast = new Forecast();
    return await forecastRepository.save({
        ...forecast,
        ...payload
    });
}

export const getForecast = async (id: number): Promise<Forecast | null> => {
    const forecastRepository = getRepository(Forecast);
    const forecast = await forecastRepository.findOne({ id: id });
    if (!forecast) return null;
    return forecast;
}

export const deleteLatestForecast = async (cityId: number): Promise<Forecast | null> => {
    const forecastRepository = getRepository(Forecast);
    const forecast = await forecastRepository
        .createQueryBuilder("forecast")
        .where("forecast.cityId = :cityId", { cityId })
        .orderBy("forecast.id", "DESC")
        .limit(1)
        .getOne();
    if (!forecast) return null;
    forecastRepository.delete({ id: forecast.id });
    return forecast;
}