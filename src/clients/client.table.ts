import { BelongsTo, Column, DataType, ForeignKey, HasMany, IsUUID, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Passport } from "./passport.table";
import { Child } from "./child.table";
import { Address } from "./address.table";
import { Communication } from "./communication.table";
import tables from "./config";
import { Job } from "./job.table";
import { literal } from "sequelize";

interface ClientCreationAttr {
    id: string;

    name: string;

    surname: string;

    patronymic: string;

    dob: Date;

    children?: Child[];

    documentIds:Array<number|string>
    
    passportId: string;

    passport: Passport

    livingAddressId?: string;

    livingAddress: Address

    regAddressId?: string;

    regAddress: Address

    jobs: Job[];

    readonly curWorkExp: number;

    typeEducation: string;

    monIncome: number;

    monExpenses: number;

    communication:Communication[];

    spouse: number;
}

@Table({ tableName: tables.client, paranoid: true, deletedAt: 'destroyTime' })
export class Client extends Model<Client, ClientCreationAttr> {

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

    @Column({type:DataType.ARRAY(DataType.STRING)})
    documentIds:Array<number|string>
    
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

    @Column({ type: DataType.UUID, allowNull: true, })
    spouse: string;
}