import { IsString } from "class-validator";

export class CreateChildDto {
    @IsString({message:'name - должно быть строкой'})
    readonly name?: string;
    @IsString({message:'surname - должно быть строкой'})
    readonly surname?: string;
    @IsString({message:'patronymic - должно быть строкой'})
    readonly patronymic?: string;
    @IsString({message:'dob - должно быть строкой'})
    readonly dob?: Date;
}