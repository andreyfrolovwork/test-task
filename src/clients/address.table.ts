import { Column, DataType, DefaultScope, Model, Table } from "sequelize-typescript";
import tables from "../config";
import { literal } from "sequelize";
import { CreateAddressDto } from "./dto/create-address.dto";


@DefaultScope(() => ({
    attributes: {
        exclude: ['createdAt','updatedAt','destroyTime']
    },
  }))  
@Table({ tableName: tables.testAddress, paranoid: true, deletedAt: 'destroyTime' })
export class Address extends Model<Address, CreateAddressDto> {

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