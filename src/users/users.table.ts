import { Column, DataType, Model, Table } from "sequelize-typescript";

interface UserCreationAttrs {
    email:string,
    password:string
}

@Table({ tableName: 'users5' })
export class User extends Model<User,UserCreationAttrs> {
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    email: string;

    @Column({type: DataType.STRING, defaultValue: false})
    password: boolean;

    @Column({type: DataType.BOOLEAN, allowNull:true})
    banReason: boolean;
    
}