import { Column, DataType, Model, Table } from "sequelize-typescript";
import tables from "./config";

export interface PassportCreationAttr {
    id: number;

    series: string;

    number: string;

    giver: string;

    dateIssued: Date;

}

@Table({ tableName: tables.passport, paranoid:true, deletedAt: 'destroyTime'  })
export class Passport extends Model<Passport, PassportCreationAttr> {

    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @Column({ type: DataType.STRING, allowNull: true })
    series: string;

    @Column({ type: DataType.STRING, allowNull: true })
    number: string;

    @Column({ type: DataType.STRING, allowNull: true })
    giver: string;

    @Column({ type: DataType.DATEONLY, allowNull: true })
    dateIssued: Date;

/*     @ForeignKey(() => Client) 
    @Column({type: DataType.INTEGER})
    clientId: number;

    @BelongsTo(() => Client)
    author: Client */
}