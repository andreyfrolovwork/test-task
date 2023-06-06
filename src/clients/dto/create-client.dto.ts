
import { ApiProperty } from "@nestjs/swagger";
import { Address } from "../address.table";
import { Child } from "../child.table";
import { Communication } from "../communication.table";
import { Job } from "../job.table";
import { Passport } from "../passport.table";
import { IsArray, IsDefined, IsInt, IsNotEmptyObject, IsObject, IsOptional, IsString, Validate, ValidateNested } from "class-validator";
import { CreateChildDto } from "./create-child.dto";
import { DateValidator } from "src/shared/dateValidator";
import { isNumberValidator } from "src/shared/isNumberValidator";
import { Type } from "class-transformer";
import { CreateAddressDto } from "./create-address.dto";
import { CreateCommunicationDto } from "./create-communication.dto";

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
        message: 'dob должна быть датой',
      })
    readonly dob: Date;
    
    @ApiProperty({example: '[{Children}]', description: 'Массив с детьми'})
    @IsOptional()
    @IsArray({message:"children - должен быть массивом"})        
    @ValidateNested({ each: true, message:"children - массив должен содержать сущности [child]" })
    @Type(() => CreateChildDto)
    readonly children?: CreateChildDto[];

    @ApiProperty({example: '["b4c0ffbc-2d8d-4590-a0ba-04e49f017897"]', description: 'Массив с id документов'})
    @IsOptional()
    @IsArray({message:"documentIds - должен быть массивом"})
    readonly documentIds:Array<number|string>
    
    readonly passportId: string;

    @ApiProperty({example: '{Passport}', description: 'Пасспорт клиента'})
    @IsOptional()
    @IsObject({message:"passport - должен быть обьектом"})
    @IsDefined()
    @IsNotEmptyObject()   
    @ValidateNested({message:"passport - массив должен содержать сущности [Passport]" })
    @Type(() => CreateAddressDto)
    readonly passport: CreateAddressDto

    readonly livingAddressId: string;

    @ApiProperty({example: '{Address}', description: 'Адрес проживания клиента'})
    @IsOptional()
    @IsObject({message:"livingAddress - должен быть обьектом"})
    @IsNotEmptyObject()   
    @ValidateNested({message:"livingAddress - массив должен содержать сущности [Address]" })
    @Type(() => CreateAddressDto)
    readonly livingAddress: CreateAddressDto

    readonly regAddressId: string;

    @ApiProperty({example: '{Address}', description: 'Адрес регистрации клиента'})
    @IsOptional()
    @IsObject({message:"regAddress - должен быть обьектом"})  
    @IsNotEmptyObject()   
    @ValidateNested({message:"regAddress - должен быть {Address}" })
    @Type(() => CreateAddressDto)
    readonly regAddress: Address

    @ApiProperty({example: '[{Job}]', description: 'Массив с местами где работает клиент'})
    @IsOptional()
    @IsArray({message:"jobs - должен быть массивом"})
    readonly jobs: Job[];

    @ApiProperty({example: '10', description: 'На текущем месте работы стаж'})
    @IsOptional()
    @IsInt({message:"curWorkExp - должен быть числом"})
    readonly curWorkExp: number;

    @ApiProperty({example: 'secondary', description: 'Образование клиента'})
    @IsOptional()
    @IsString({message:'typeEducation - должно быть строкой'})
    readonly typeEducation: string;

    @ApiProperty({example: '60', description: 'Суммарный доход в месяц c `масштабом(scale) = 2'})
    @IsOptional()
    @Validate(isNumberValidator, {
      message: 'monIncome  - должен быть числом',
    })
    readonly monIncome: number;

    @ApiProperty({example: '40', description: 'Суммарный расход в месяц c `масштабом(scale) = 2'})
    @IsOptional()
    @Validate(isNumberValidator, {
      message: 'monExpenses  - должен быть числом',
    })
    readonly monExpenses: number;

    @ApiProperty({example: '[{Communication}]', description: ''})
    @IsOptional()
    @IsArray({message:"communication - должен быть массивом"})
    @ValidateNested({ each: true, message:"communication - массив должен содержать сущности [Communication]" })
    @Type(() => CreateCommunicationDto)
    readonly communication:CreateCommunicationDto[];

    readonly spouse: number; 

}