
import { ApiProperty } from "@nestjs/swagger";
import { Address } from "../address.table";
import { Child } from "../child.table";
import { Communication } from "../communication.table";
import { Job } from "../job.table";
import { Passport } from "../passport.table";
import { IsArray, IsInt, IsObject, IsOptional, IsString, Validate } from "class-validator";
import { DateValidator } from "../dateValidator";

export class CreateClientDto {   

    readonly id:string;

    @ApiProperty({example: 'Сергей', description: 'Имя'})
    @IsOptional()
    @IsString({message:'name - должно быть строкой'})
    readonly name: string;
    
    @ApiProperty({example: 'Орлов', description: 'Фамилия'})
    @IsOptional()
    @IsString({message:'surname - должно быть строкой'})
    readonly surname: string;
    
    @ApiProperty({example: 'Отчество', description: 'Александрович'})
    @IsOptional()
    @IsString({message:'patronymic - должно быть строкой'})
    readonly patronymic: string;

    @ApiProperty({example: '10.10.1994', description: 'Дата рождения'})
    @IsOptional()
    //@IsString({message:'dob - должно быть строкой'})
    @Validate(DateValidator, {
        message: 'Title is too short or long!',
      })
    readonly dob: Date;
    
    @ApiProperty({example: '[{"name":"Петр"}]', description: 'Массив с детьми'})
    @IsOptional()
    @IsArray({message:"children - должен быть массивом"})
    readonly children?: Child[];

    @IsOptional()
    @IsArray({message:"documentIds - должен быть массивом"})
    readonly documentIds:Array<number|string>
    
    readonly passportId: string;

    @IsOptional()
    @IsObject({message:"passport - должен быть обьектом"})
    readonly passport: Passport

    readonly livingAddressId: string;

    @IsOptional()
    @IsObject({message:"livingAddress - должен быть обьектом"})
    readonly livingAddress: Address

    readonly regAddressId: string;

    @IsOptional()
    @IsObject({message:"regAddress - должен быть обьектом"})  
    readonly regAddress: Address

    @IsOptional()
    @IsArray({message:"jobs - должен быть массивом"})
    readonly jobs: Job[];

    @IsOptional()
    @IsInt({message:"curWorkExp - должен быть числом"})
    readonly curWorkExp: number;

    @IsOptional()
    @IsString({message:'typeEducation - должно быть строкой'})
    readonly typeEducation: string;

    @IsOptional()
    @IsInt({message:"monIncome - должен быть числом"})
    readonly monIncome: number;

    @IsOptional()
    @IsInt({message:"monExpenses - должен быть числом"})
    readonly monExpenses: number;

    @IsOptional()
    @IsArray({message:"communication - должен быть массивом"})
    readonly communication:Communication[];

    readonly spouse: number; 

}