import { ChildCreationAttr } from "../child.table";
import { PassportCreationAttr } from "../passport.table";

export class CreateClientDto {   
    readonly id: number;

    readonly name: string;

    readonly surname: string;

    readonly patronymic: string;

    readonly dob: Date;

    readonly children: Array<ChildCreationAttr>;

    readonly documentIds: Array<number>;

    readonly passport: PassportCreationAttr;

    readonly livingAddress: number;

    readonly regAddress: number;

    readonly jobs: Array<number>;

    readonly curWorkExp: number;

    readonly typeEducation: string;

    readonly monIncome: number;

    readonly monExpenses: number;

    readonly communications: Array<number>;

    readonly spouse: number;

}