import { Column, DataType, DefaultScope, ForeignKey, IsUUID, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Client } from "./client.table";
import tables from "./config";

export interface CommunicationCreationAttr {

    id: string;

    type: string;

    value:string;

    clientId:number; 

}

@DefaultScope(() => ({
    attributes: {
        exclude: ['clientId','createdAt','updatedAt','destroyTime']
    },
  }))
@Table({ tableName: tables.communication, paranoid:true, deletedAt: 'destroyTime'  })
export class Communication extends Model<Communication, CommunicationCreationAttr> {

    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    readonly id: number;

    @Column({ type: DataType.ENUM, values:['email','phone'], allowNull: false })
    type: string;

    @Column({ type:DataType.STRING, allowNull:false})
    value:string;

    @ForeignKey(() => Client) 
    @Column({type: DataType.UUID})
    clientId: string;

}