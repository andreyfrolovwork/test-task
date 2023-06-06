import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, Validate } from "class-validator";
import { DateValidator } from "src/shared/dateValidator";

export class CreatePassportDto {
    @ApiProperty({example: '7474', description: 'Серия'})
    @IsOptional()
    @IsString({message:'series - должно быть строкой'})
    readonly series?: string;

    @ApiProperty({example: 'Орлова', description: 'Номер'})
    @IsOptional()
    @IsString({message:'number - должно быть строкой'})
    readonly number?: string;

    @ApiProperty({example: 'ОУФМ Челябинской обл. по Центральному р-ну гор.Челябинска', description: 'Кем выдан'})
    @IsOptional()
    @IsString({message:'giver - должно быть строкой'})
    readonly giver?: string;

    @ApiProperty({example: '2022-07-10', description: 'Дата выдачи'})
    @IsOptional()
    @Validate(DateValidator, {
        message: 'dateIssued должна быть датой',
      })
    readonly dateIssued?: Date;
}