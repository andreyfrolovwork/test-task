import { Column, DataType, DefaultScope, ForeignKey, IsUUID, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Client } from "./client.table";
import tables from "../config";
import { CreateCommunicationDto } from "./dto/create-communication.dto";
import { literal } from "sequelize";

@DefaultScope(() => ({
    attributes: {
        exclude: ['clientId','createdAt','updatedAt','destroyTime']
    },
  }))
@Table({ tableName: tables.communication, paranoid:true, deletedAt: 'destroyTime'  })
export class Communication extends Model<Communication, CreateCommunicationDto> {

    @Column({
        type: DataType.UUID,
        defaultValue: literal('gen_random_uuid()'),
        primaryKey: true,
    })
    id: string;

    @Column({ type: DataType.ENUM, values:['email','phone'], allowNull: false })
    type: string;

    @Column({ type:DataType.STRING, allowNull:false})
    value:string;

    @ForeignKey(() => Client) 
    @Column({type: DataType.UUID})
    clientId: string;

}