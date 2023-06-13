import { BelongsTo, Column, DataType, DefaultScope, ForeignKey, IsUUID, Model, PrimaryKey, Table, Unique } from "sequelize-typescript";
import { Client } from "./client.table";
import tables from "./config";
import { literal } from "sequelize";
import { Address } from "./address.table";
import { CreateJobDto } from "./dto/create-job-dto";

export interface JobCreationAttr {
    type:string;

    dateEmp: Date;

    dateDismissal: Date;

    monIncome: number;  

    tin: string;

    factAddressId: string;

    factAddress: Address

    jurAddressId: string;

    jurAddress: Address
    
    phoneNumber: string;

    clientId: string;
}

@DefaultScope(() => ({
    attributes: {        
        exclude: ['clientId','createdAt','updatedAt','destroyTime']
    },
  }))
@Table({ tableName: tables.job, paranoid:true, deletedAt: 'destroyTime'  })
export class Job extends Model<Job, CreateJobDto> {
    
    @Column({
        type: DataType.UUID,
        defaultValue: literal('gen_random_uuid()'),
        primaryKey: true,
    })
    id: string;

    @Column({
        type:DataType.ENUM,
        values:['main','part-time'],
        allowNull:true
    })
    type:string;

    @Column({ type: DataType.DATEONLY, allowNull: true })
    dateEmp: Date;

    @Column({ type: DataType.DATEONLY, allowNull: true })
    dateDismissal: Date;

    @Column({ type: DataType.INTEGER, allowNull: true })
    monIncome: number;  

    @Column({ type: DataType.STRING, allowNull: true })
    tin: string;

    @ForeignKey(() => Address)
    @Column({ type: DataType.UUID })
    factAddressId: string;

    @BelongsTo(() => Address, { onDelete: "no action", foreignKey: "factAddressId" })
    factAddress: Address

    @ForeignKey(() => Address)
    @Column({ type: DataType.UUID })
    jurAddressId: string;

    @BelongsTo(() => Address, { onDelete: "no action", foreignKey: "jurAddressId" })
    jurAddress: Address
    
    @Column({ type: DataType.STRING, allowNull: true })
    phoneNumber: string;

    @ForeignKey(() => Client) 
    @Column({type: DataType.UUID})
    clientId: string;

}