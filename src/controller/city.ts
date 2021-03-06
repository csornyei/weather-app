import {
    getCity,
    getCities,
    createCity,
    updateCity,
    deleteCity,
    lockCity,
    unlockCity
} from "../repositories/city";
import { City } from "../models";
import { CityPayload, ErrorResponse } from "../types";

export default class CityController {
    public async getCities(): Promise<Array<City>> {
        return getCities();
    }

    public async createCity(body: CityPayload): Promise<City> {
        return createCity(body);
    }

    public async getCity(id: string): Promise<City | ErrorResponse> {
        return getCity(Number(id));
    }

    public async updateCity(id: string, body: CityPayload): Promise<City | ErrorResponse> {
        return updateCity(Number(id), body);
    }

    public async deleteCity(id: string): Promise<City | ErrorResponse> {
        return deleteCity(Number(id));
    }

    public async lockCity(id: string): Promise<City | ErrorResponse> {
        return lockCity(Number(id));
    }

    public async unlockCity(id: string): Promise<City | ErrorResponse> {
        return unlockCity(Number(id));
    }
}