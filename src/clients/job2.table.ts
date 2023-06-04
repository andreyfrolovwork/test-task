import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Client } from "./client.table";
import tables from "./config";

export interface Job2CreationAttr {
    id: number;

    name: string;

    clientId:number,    

}

@Table({ tableName: tables.job, paranoid:true, deletedAt: 'destroyTime'  })
export class Job2 extends Model<Job2, Job2CreationAttr> {

    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @Column({ type: DataType.STRING, allowNull: true })
    name: string;

    // @ForeignKey(() => Client) 
    // @Column({type: DataType.INTEGER})
    // clientId: number;

}