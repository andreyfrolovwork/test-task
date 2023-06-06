import { Column, DataType, DefaultScope, Model, Table } from "sequelize-typescript";
import tables from "./config";
import { literal } from "sequelize";
import { CreatePassportDto } from "./dto/create-passport.dto";

export interface PassportCreationAttr {
    id: string;

    series: string;

    number: string;

    giver: string;

    dateIssued: Date;

}

@DefaultScope(() => ({
    attributes: {
        exclude: ['createdAt','updatedAt','destroyTime']
    },
  }))
@Table({ tableName: tables.passport, paranoid:true, deletedAt: 'destroyTime'  })
export class Passport extends Model<Passport, CreatePassportDto> {

    @Column({
        type: DataType.UUID,
        defaultValue: literal('gen_random_uuid()'),
        primaryKey: true,
    })
    id: string;

    @Column({ type: DataType.STRING, allowNull: true })
    series: string;

    @Column({ type: DataType.STRING, allowNull: true })
    number: string;

    @Column({ type: DataType.STRING, allowNull: true })
    giver: string;

    @Column({ type: DataType.DATEONLY, allowNull: true })
    dateIssued: Date;

}