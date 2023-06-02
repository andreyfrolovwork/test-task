import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "src/users/users.table";
import { Client } from "./client.table";

export interface ChildCreationAttr {
    id: number;

    name: string;

    surname: string;

    patronymic: string;

    dob: Date;

    clientId:number,    

}

@Table({ tableName: 'child', paranoid:true, deletedAt: 'destroyTime'  })
export class Child extends Model<Child, ChildCreationAttr> {

    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @Column({ type: DataType.STRING, allowNull: true })
    name: string;

    @Column({ type: DataType.STRING, allowNull: true })
    surname: string;

    @Column({ type: DataType.STRING, allowNull: true })
    patronymic: string;

    @Column({ type: DataType.DATEONLY, allowNull: true })
    dob: Date;

    @ForeignKey(() => Client) 
    @Column({type: DataType.INTEGER})
    clientId: number;

    // @BelongsTo(() => Client)
    // author: Client
}