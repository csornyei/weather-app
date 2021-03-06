export enum Forecasts {
    "Sunny" = "Sunny",
    "Cloudy" = "Cloudy",
    "Stormy" = "Stromy"
}

export interface CityPayload {
    name: string;
    timezone: string;
}

export interface ForecastPayload {
    from: Date,
    to: Date,
    forecast: Forecasts,
    cityId: number
}

export interface ErrorResponse {
    code: number;
    message: string
}

export function instanceOfErrorResponse(object: any): object is ErrorResponse {
    return 'code' in object && 'message' in object;
}