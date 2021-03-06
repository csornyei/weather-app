interface CityResponse {
    id: Number,
    name: String,
    timezone: String,
}

export default class CityController {
    public async get(): Promise<CityResponse> {
        return {
            id: 0,
            name: "Budapest",
            timezone: "Europe/Budapest"
        }
    }
}