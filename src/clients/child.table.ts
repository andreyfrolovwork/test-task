import { Column, DataType, DefaultScope, ForeignKey, Model, Table } from "sequelize-typescript";
import { Client } from "./client.table";
import tables from "./config";
import { literal } from "sequelize";
import { CreateChildDto } from "./dto/create-child.dto";

export interface ChildCreationAttr {
    id?: string;

    name?: string;

    surname?: string;

    patronymic?: string;

    dob?: Date;

    clientId?:number,    

}

@DefaultScope(() => ({
    attributes: {
        exclude: ['clientId','createdAt','updatedAt','destroyTime']
    },
  }))
@Table({ tableName: tables.child, paranoid:true, deletedAt: 'destroyTime'  })
export class Child extends Model<Child, CreateChildDto> {

    @Column({
        type: DataType.UUID,
        defaultValue: literal('gen_random_uuid()'),
        primaryKey: true,
    })
    id: string;

    @Column({ type: DataType.STRING, allowNull: true })
    name: string;

    @Column({ type: DataType.STRING, allowNull: true })
    surname: string;

    @Column({ type: DataType.STRING, allowNull: true })
    patronymic: string;

    @Column({ type: DataType.DATEONLY, allowNull: true })
    dob: Date;

    @ForeignKey(() => Client) 
    @Column({type: DataType.UUID})
    clientId: string;

}