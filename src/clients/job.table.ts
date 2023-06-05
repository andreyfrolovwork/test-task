import { Column, DataType, ForeignKey, IsUUID, Model, PrimaryKey, Table, Unique } from "sequelize-typescript";
import { Client } from "./client.table";
import tables from "./config";

export interface JobCreationAttr {
    id?: number;

    description?: string;

    clientId?:number,    

}

@Table({ tableName: tables.job, paranoid:true, deletedAt: 'destroyTime'  })
export class Job extends Model<Job, JobCreationAttr> {
/*     @IsUUID(4)
    @PrimaryKey
    @Column({unique:true})
    id: string
 */
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @Column({ type: DataType.STRING, allowNull: true })
    description: string;

    @ForeignKey(() => Client) 
    @Column({type: DataType.INTEGER})
    clientId: number;

}