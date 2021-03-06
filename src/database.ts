import { ConnectionOptions } from "typeorm";
import { City, Forecast } from './models/index';

const config: ConnectionOptions = {
    type: "postgres",
    host: process.env.POSTGRES_HOST || "postgres",
    port: Number(process.env.POSTGRES_PORT) || 5432,
    username: process.env.DB_USERNAME || "postgres",
    password: process.env.DB_PASSWORD || "postgres",
    database: process.env.DB_DATABASE_NAME || "postgres",
    entities: [City, Forecast],
    synchronize: true,
}

export default config;