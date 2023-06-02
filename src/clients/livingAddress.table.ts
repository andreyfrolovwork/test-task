import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Client } from "./client.table";

export interface LivingAddressCreationAttr {
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

@Table({ tableName: 'living_adress', paranoid:true, deletedAt: 'destroyTime'  })
export class LivingAdress extends Model<LivingAdress, LivingAddressCreationAttr> {

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

    @ForeignKey(() => Client) 
    @Column({type: DataType.INTEGER})
    clientId: number;

}