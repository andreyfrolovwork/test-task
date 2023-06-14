import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsEnum, IsMobilePhone, IsNotEmptyObject, IsObject, IsOptional, IsString, Validate, ValidateNested } from "class-validator";
import { DateValidator } from "src/shared/dateValidator";
import { isNumberValidator } from "src/shared/isNumberValidator";
import { Address } from "../address.table";
import { Type } from "class-transformer";
import { CreateAddressDto } from "./create-address.dto";

export class CreateJobDto {
  @ApiProperty({
    example: 'phone',
    description: `Тип:
    * main - Основная работа
    * part-time - Частичная занятость`,
    enum: ['main', 'part-time']
  })
  @IsOptional()
  @IsEnum(['main', 'part-time'], { message: 'type - должно быть enum - main | part-time' })
  readonly type?: string;

  @ApiProperty({ example: '2022-07-10', description: 'Дата трудоустройства' })
  @IsOptional()
  @Validate(DateValidator, {
    message: 'dateEmp должна быть датой',
  })
  readonly dateEmp?: Date;

  @ApiProperty({ example: '2022-07-10', description: 'Дата увольнения' })
  @IsOptional()
  @Validate(DateValidator, {
    message: 'dateDismissal должна быть датой',
  })
  readonly dateDismissal?:Date;

  @ApiProperty({example:'55.55',description: 'Доход в месяц c `масштабом(scale) = 2'})
  @IsOptional()
  @Validate(isNumberValidator,{message:'monIncome - должен быть числом'})
  readonly monIncome: number;
  
  @ApiProperty({example:'165718275080',description:'ИНН'})
  @IsOptional()
  @IsString({message:"tin - должен быть строкой"})
  readonly tin: string;

  readonly factAddressId: string;

  @ApiProperty({example:"{Address}", description:"Фактический адрес"})
  @IsOptional()
  @IsObject({message:"factAddress - должен быть обьектом"})
  @IsNotEmptyObject()
  @ValidateNested({message:'factAddress - должен быть {Address}'})
  @Type(()=> CreateAddressDto)
  readonly factAddress: Address

  readonly jurAddressId: string;

  @ApiProperty({example:"{Address}", description:"Юридический адрес"})
  @IsOptional()
  @IsObject({message:"jurAddress - должен быть обьектом"})
  @IsNotEmptyObject()
  @ValidateNested({message:'jurAddress - должен быть {Address}'})
  @Type(()=> CreateAddressDto)
  readonly jurAddress: Address
  
  @ApiProperty({ example: '79821048575', description: 'Значение средства связи' }) 
  @IsOptional()  
  @IsString({ message: 'phoneNumber - должно быть строкой' })
  @IsMobilePhone()
  readonly phoneNumber: string;
  
  readonly clientId: string;

}