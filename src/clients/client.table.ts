import { Column, DataType, HasMany, HasOne, Model, Table } from "sequelize-typescript";
import { Passport } from "./passport.table";
import { Child } from "./child.table";
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

@Table({ tableName: 'client', paranoid:true, deletedAt: 'destroyTime' })
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



    // @Column({ type: DataType.ARRAY, allowNull: false, defaultValue: [] })
    // children: Array<number>;

    // @Column({ type: DataType.ARRAY, allowNull: false, defaultValue: [] })
    // documentIds: Array<number>;


    
    // @Column({ type: DataType.INTEGER, allowNull: true })
    // passport: number;

    // @Column({ type: DataType.INTEGER, allowNull: true })
    // livingAddress: number;

    // @Column({ type: DataType.INTEGER, allowNull: true })
    // regAddress: number;

    // @Column({ type: DataType.ARRAY, allowNull: false, defaultValue: [] })
    // jobs: Array<number>;

    @Column({ type: DataType.STRING, defaultValue: 0, })
    curWorkExp: number;

    @Column({ type: DataType.STRING, allowNull: false, defaultValue: 'secondary' })
    typeEducation: string;

    @Column({ type: DataType.STRING, defaultValue: 0, allowNull: true })
    monIncome: number;

    @Column({ type: DataType.STRING, defaultValue: 0, allowNull: true })
    monExpenses: number;

    // @Column({ type: DataType.ARRAY, allowNull: false, defaultValue: [] })
    // communications: Array<number>;

    @Column({ type: DataType.INTEGER, allowNull: true, })
    spouse: number;

    @HasOne(() => Passport)
    passport: Passport;

    @HasMany(() => Child)
    children: Child[];
    
    @HasMany(() => Job)
    jobs: Job[];
}