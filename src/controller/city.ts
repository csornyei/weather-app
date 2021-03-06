import {
    CityPayload,
    getCity,
    getCities,
    createCity,
    updateCity,
    deleteCity
} from "../repositories/city";
import { City } from "../models";

export default class CityController {
    public async getCities(): Promise<Array<City>> {
        return getCities();
    }

    public async createCity(body: CityPayload): Promise<City> {
        return createCity(body);
    }

    public async getCity(id: string): Promise<City | null> {
        return getCity(Number(id));
    }

    public async updateCity(id: string, body: CityPayload): Promise<any> {
        return updateCity(Number(id), body);
    }

    public async deleteCity(id: string): Promise<any> {
        return deleteCity(Number(id));
    }
}