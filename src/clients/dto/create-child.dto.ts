import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, Validate } from "class-validator";
import { DateValidator } from "src/shared/dateValidator";

export class CreateChildDto {
    @ApiProperty({example: 'Алиса', description: 'Имя'})
    @IsOptional()
    @IsString({message:'name - должно быть строкой'})
    readonly name?: string;

    @ApiProperty({example: 'Орлова', description: 'Фамилия'})
    @IsOptional()
    @IsString({message:'surname - должно быть строкой'})
    readonly surname?: string;

    @ApiProperty({example: 'Андреевна', description: 'Отчество'})
    @IsOptional()
    @IsString({message:'patronymic - должно быть строкой'})
    readonly patronymic?: string;

    @ApiProperty({example: '2022-07-10', description: 'Дата рождения'})
    @IsOptional()
    @Validate(DateValidator, {
        message: 'dob должна быть датой',
      })
    readonly dob?: Date;
}