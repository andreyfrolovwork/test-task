import { BelongsTo, Column, DataType, ForeignKey, HasMany, HasOne, Model, Table } from "sequelize-typescript";
import { Passport } from "./passport.table";
import { Child } from "./child.table";
import { Job } from "./job.table";
import { LivingAdress } from "./livingAddress.table";
import tables from "./config";
import { AddressNew } from "./address.table";

interface ClientCreationAttr {
    id: number;

    name: string;

    surname: string;

    patronymic: string;

    dob: Date;

    // children: Array<number>;

    // documentIds: Array<number>;

    // passport: number;

    // livingAddress: number;

    // regAddress: number;

    // jobs: Array<number>;

    curWorkExp: number;

    typeEducation: string;

    monIncome: number;

    monExpenses: number;

    // communications: Array<number>;

    spouse: number;

}

@Table({ tableName: tables.client, paranoid: true, deletedAt: 'destroyTime' })
export class Client extends Model<Client, ClientCreationAttr> {

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

    @Column({ type: DataType.STRING, defaultValue: 0, })
    curWorkExp: number;

    @Column({ 
        type: DataType.ENUM, 
        values:['secondary','secondarySpecial','incompleteHigher','higher','twoOrMoreHigher', 'academicDegree'], 
        allowNull: true, 
        //defaultValue: null 
    })
    typeEducation: string;

    @Column({ type: DataType.STRING, defaultValue: 0, allowNull: true })
    monIncome: number;

    @Column({ type: DataType.STRING, defaultValue: 0, allowNull: true })
    monExpenses: number;

    @HasMany(() => Child)
    children: Child[];

    @HasMany(() => Job)
    jobs: Job[];

    @ForeignKey(() => AddressNew)
    @Column({ type: DataType.INTEGER })
    regAddressId: number;

    @BelongsTo(() => AddressNew, { onDelete: "no action", foreignKey: "regAddressId" })
    regAddress: AddressNew

    @ForeignKey(() => AddressNew)
    @Column({ type: DataType.INTEGER })
    livingAddressId: number;

    @BelongsTo(() => AddressNew, { onDelete: "no action", foreignKey: "livingAddressId" })
    livingAddress: AddressNew

    @ForeignKey(() => Passport)
    @Column({ type: DataType.INTEGER })
    passportId: number;

    @BelongsTo(() => Passport)
    passport: Passport

    @Column({ type: DataType.INTEGER, allowNull: true, })
    spouse: number;
}