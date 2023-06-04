import { Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Client } from "./client.table";
import tables from "./config";

export interface AddressCreationAttr {
    id: number;

    zipCode: string;

    country: string;
    
    region: string;

    city: string;

    street: string;

    house: string;

    apartment: string;

    clientId: number;
}

@Table({ tableName: tables.address, paranoid:true, deletedAt: 'destroyTime'  })
export class Address extends Model<Address, AddressCreationAttr> {

    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

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