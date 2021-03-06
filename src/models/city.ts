import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany
} from "typeorm";
import { Forecast } from "./forecast";

@Entity()
export class City {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name: string;

    @Column()
    timezone: string;

    @OneToMany((_type) => Forecast, (forecast: Forecast) => forecast.city)
    forecasts!: Array<Forecast>;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}