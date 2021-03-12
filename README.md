# Weather App

A Simple Express based API for weather forecasts

The app is configured to work with Docker and it should be run with `docker-compose up`

## Routes

- `/`: a simple frontend for socket testing
- `/docs`: swagger documentation
- `/api/city`
- `/api/forecast`

## Todos

- [x] CRUD for cities
- [x] Get list of cities `GET /api/city`
- [x] Add new city `POST /api/city`
- [x] Change city name and timezone `PUT /api/city/{cityId}`
- [x] Delete a city `DELETE /api/city/{cityId}`
- [x] Get one city `GET /api/city/{cityId}`
- [x] Add forecast for a city `POST /api/city/{cityId}/forecast`
- [x] Remove latest forecast from city `DELETE /api/city/{cityId}/forecast`
- [x] Get latest forecast added `GET /api/forecast`
- [x] Lock and unlock city `PUT /api/city/{cityId}/lock` `PUT /api/city/{cityId}/unlock`
- [x] Websocket for subscribing to cities `GET /`
- [x] Caching every GET request