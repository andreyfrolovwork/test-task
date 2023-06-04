import {  BelongsTo, Column, DataType, ForeignKey, HasMany, HasOne, Model, Table } from "sequelize-typescript";
import { Client } from "./client.table";
import tables from "./config";
import { Passport } from "./passport.table";

export interface AddressNewCreationAttr {
    id?: number;

    name?: string;

    clientId?:number,    

}

@Table({ tableName: tables.testAddress, paranoid:true, deletedAt: 'destroyTime'  })
export class AddressNew extends Model<AddressNew, AddressNewCreationAttr> {

    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @Column({ type: DataType.STRING, allowNull: true })
    name: string;

/*     @BelongsTo(() => Client)
    client: Client;

    @ForeignKey(() => Client)
    CliendId:number; */
    
    // @HasMany(() => Client)
    // client2: Client;


    // @ForeignKey(() => Client) 
    // @Column({type: DataType.INTEGER})
    // clientId: number;

}