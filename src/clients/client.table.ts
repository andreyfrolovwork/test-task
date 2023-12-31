import { BelongsTo, Column, DataType, DefaultScope, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Passport } from "./passport.table";
import { Child } from "./child.table";
import { Address } from "./address.table";
import { Communication } from "./communication.table";
import tables from "../config";
import { Job } from "./job.table";
import { literal } from "sequelize";
import { CreateClientDto } from "./dto/create-client.dto";

@DefaultScope(() => ({
    include: {
        all: true, nested: true
    },
    attributes: {
        exclude: ['passportId', 'livingAddressId', 'regAddressId', 'createdAt', 'updatedAt', 'destroyTime'],
    },
}))
@Table({ tableName: tables.client, paranoid: true, deletedAt: 'destroyTime' })
export class Client extends Model<Client, CreateClientDto> {

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

    @HasMany(() => Child)
    children: Child[];

    @Column({ type: DataType.ARRAY(DataType.STRING) })
    documentIds: Array<number | string>

    @ForeignKey(() => Passport)
    @Column({ type: DataType.UUID })
    passportId: number;

    @BelongsTo(() => Passport)
    passport: Passport

    @ForeignKey(() => Address)
    @Column({ type: DataType.UUID })
    livingAddressId: string;

    @BelongsTo(() => Address, { onDelete: "no action", foreignKey: "livingAddressId" })
    livingAddress: Address

    @ForeignKey(() => Address)
    @Column({ type: DataType.UUID })
    regAddressId: string;

    @BelongsTo(() => Address, { onDelete: "no action", foreignKey: "regAddressId" })
    regAddress: Address

    @HasMany(() => Job)
    jobs: Job[];

    @Column({ type: DataType.FLOAT, defaultValue: 0, })
    readonly curWorkExp: number;

    @Column({
        type: DataType.ENUM,
        values: ['secondary', 'secondarySpecial', 'incompleteHigher', 'higher', 'twoOrMoreHigher', 'academicDegree'],
        allowNull: true,
    })
    typeEducation: string;

    @Column({ type: DataType.FLOAT, defaultValue: 0, allowNull: true })
    monIncome: number;

    @Column({ type: DataType.FLOAT, defaultValue: 0, allowNull: true })
    monExpenses: number;

    @HasMany(() => Communication)
    communication: Communication[];

    
    // @ForeignKey(() => Client)
    // @Column({ type: DataType.UUID })
    // spouseId: number;

    // @BelongsTo(() => Client, { onDelete: "no action", foreignKey: "spouseId" })
    // spouse: Client


}