import { getRepository } from "typeorm";
import { City } from "../models";

export interface CityPayload {
    name: string;
    timezone: string;
}

export const getCities = async (): Promise<Array<City>> => {
    const cityRepository = getRepository(City);
    return await cityRepository
        .createQueryBuilder("City")
        .leftJoinAndSelect("City.forecasts", "forecasts")
        .leftJoin("City.forecasts", "next_forecasts", "forecasts.id < next_forecasts.id")
        .where("next_forecasts.id IS NULL")
        .getMany();
}

export const createCity = async (payload: CityPayload): Promise<City> => {
    const cityRepository = getRepository(City);
    const city = new City();
    return cityRepository.save({
        ...city,
        ...payload
    });
}

export const getCity = async (id: number): Promise<City | null> => {
    const cityRepository = getRepository(City);
    const city = await cityRepository.findOne({ id: id }, { relations: ["forecasts"] });
    if (!city) return null;
    return city;
}

export const updateCity = async (id: number, payload: CityPayload): Promise<City | null> => {
    const cityRepository = getRepository(City);
    const oldCity = await cityRepository.findOne({ id: id });
    if (!oldCity) return null;
    return await cityRepository.save({
        ...oldCity,
        ...payload
    });
}

export const deleteCity = async (id: number): Promise<City | null> => {
    const cityRepository = getRepository(City);
    const oldCity = await cityRepository.findOne({ id: id });
    if (!oldCity) return null;
    await cityRepository.delete({ id: id });
    return oldCity;
}