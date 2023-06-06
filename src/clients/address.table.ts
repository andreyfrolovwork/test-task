import { Column, DataType, Model, Table } from "sequelize-typescript";
import tables from "./config";
import { literal } from "sequelize";

export interface AddressCreationAttr {
    id?: number;

    zipCode?: string;

    country?: string;

    region?: string;

    city?: string;

    street?: string;

    house?: string;

    apartment?: string;

}

@Table({ tableName: tables.testAddress, paranoid: true, deletedAt: 'destroyTime' })
export class Address extends Model<Address, AddressCreationAttr> {

    /*     @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
        id: number; */
    @Column({
        type: DataType.UUID,
        defaultValue: literal('gen_random_uuid()'),
        primaryKey: true,
    })
    id: string;


    @Column({ type: DataType.STRING, allowNull: true })
    zipCode: string;

    @Column({ type: DataType.STRING, allowNull: true })
    country: string;

    @Column({ type: DataType.STRING, allowNull: true })
    region: string;

    @Column({ type: DataType.STRING, allowNull: true })
    city: string;

    @Column({ type: DataType.STRING, allowNull: true })
    street: string;

    @Column({ type: DataType.STRING, allowNull: true })
    house: string;

    @Column({ type: DataType.STRING, allowNull: true })
    apartment: string;

}