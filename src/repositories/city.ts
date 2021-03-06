import { getRepository } from "typeorm";
import { City } from "../models";
import { CityPayload, ErrorResponse } from "../types";
import { canUnlock } from "../utils";

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

export const getCity = async (id: number): Promise<City | ErrorResponse> => {
    const cityRepository = getRepository(City);
    const city = await cityRepository.findOne({ id: id }, { relations: ["forecasts"] });
    if (!city) return { code: 404, message: "City not found" };
    return city;
}

export const updateCity = async (id: number, payload: CityPayload): Promise<City | ErrorResponse> => {
    const cityRepository = getRepository(City);
    const oldCity = await cityRepository.findOne({ id: id });
    if (!oldCity) return { code: 404, message: "City not found" };
    if (oldCity.lockedSince !== null) return { code: 403, message: "City is locked, it can't be updated" }
    return await cityRepository.save({
        ...oldCity,
        ...payload
    });
}

export const deleteCity = async (id: number): Promise<City | ErrorResponse> => {
    const cityRepository = getRepository(City);
    const oldCity = await cityRepository.findOne({ id: id });
    if (!oldCity) return { code: 404, message: "City not found" };
    if (oldCity.lockedSince !== null) return { code: 403, message: "City is locked, it can't be deleted" }
    await cityRepository.delete({ id: id });
    return oldCity;
}

export const lockCity = async (id: number): Promise<City | ErrorResponse> => {
    const cityRepository = getRepository(City);
    const oldCity = await cityRepository.findOne({ id: id });
    if (!oldCity) return { code: 404, message: "City not found" };
    return await cityRepository.save({
        ...oldCity,
        lockedSince: new Date(Date.now())
    });
}

export const unlockCity = async (id: number): Promise<City | ErrorResponse> => {
    const cityRepository = getRepository(City);
    const oldCity = await cityRepository.findOne({ id: id });
    if (!oldCity) return { code: 404, message: "City not found" };
    const MIN_LOCK_TIME = 1 * 60 * 1000; // Ten minutes
    if (canUnlock(new Date(oldCity.lockedSince))) {
        return { code: 403, message: "Lock time not passed!" };
    }
    return await cityRepository.save({
        ...oldCity,
        lockedSince: null
    });
}