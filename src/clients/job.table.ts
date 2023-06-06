import { Column, DataType, DefaultScope, ForeignKey, IsUUID, Model, PrimaryKey, Table, Unique } from "sequelize-typescript";
import { Client } from "./client.table";
import tables from "./config";
import { literal } from "sequelize";

export interface JobCreationAttr {
    id?: string;

    description?: string;

    clientId?:string,    

}

@DefaultScope(() => ({
    attributes: {
        exclude: ['clientId','createdAt','updatedAt','destroyTime']
    },
  }))
@Table({ tableName: tables.job, paranoid:true, deletedAt: 'destroyTime'  })
export class Job extends Model<Job, JobCreationAttr> {
    
    @Column({
        type: DataType.UUID,
        defaultValue: literal('gen_random_uuid()'),
        primaryKey: true,
    })
    id: string;

    @Column({ type: DataType.STRING, allowNull: true })
    description: string;

    @ForeignKey(() => Client) 
    @Column({type: DataType.UUID})
    clientId: string;

}