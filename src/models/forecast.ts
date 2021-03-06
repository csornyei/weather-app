import {
    Column,
    CreateDateColumn,
    Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn
} from "typeorm";
import { City } from "./city";

export enum Forecasts {
    "Sunny" = "Sunny",
    "Cloudy" = "Cloudy",
    "Stormy" = "Stromy"
}

@Entity()
export class Forecast {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    forecast: Forecasts;

    @Column()
    from: Date;

    @Column()
    to: Date;

    @Column()
    cityId!: number;
    @ManyToOne((_type) => City, (city: City) => city.forecasts)
    @JoinColumn()
    city!: City

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

}