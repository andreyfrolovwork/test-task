import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Passport } from "./passport.table";
import { Child } from "./child.table";
import { Address } from "./address.table";
import { Communication } from "./communication.table";
import tables from "./config";
import { Job } from "./job.table";

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

    @HasMany(() => Child)
    children: Child[];

    @Column({type:DataType.ARRAY(DataType.STRING)})
    documentIds:Array<number|string>
    
    @ForeignKey(() => Passport)
    @Column({ type: DataType.INTEGER })
    passportId: number;

    @BelongsTo(() => Passport)
    passport: Passport

    @ForeignKey(() => Address)
    @Column({ type: DataType.INTEGER })
    livingAddressId: number;

    @BelongsTo(() => Address, { onDelete: "no action", foreignKey: "livingAddressId" })
    livingAddress: Address

    @ForeignKey(() => Address)
    @Column({ type: DataType.INTEGER })
    regAddressId: number;

    @BelongsTo(() => Address, { onDelete: "no action", foreignKey: "regAddressId" })
    regAddress: Address

    @HasMany(() => Job)
    jobs: Job[];

    @Column({ type: DataType.STRING, defaultValue: 0, })
    readonly curWorkExp: number;

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

    @HasMany(() => Communication)
    communication:Communication[];

    @Column({ type: DataType.INTEGER, allowNull: true, })
    spouse: number;
}