import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsOptional, IsString, Validate } from "class-validator";
import { isNumberValidator } from "src/shared/isNumberValidator";

export class findClientDto {

    @ApiProperty({example:"createdAt", description:'Поле по которому нужно сортировать'})
    @IsOptional()
    @IsString({message:'sortBy - должно быть строкой'})
    readonly sortBy?: string;

    @ApiProperty({example:"sortDir", description:'Направление сортировки'})
    @IsOptional()
    @IsString({message:'sortDir - должно быть строкой'})
    @IsEnum(['asc','desc'],{ message: 'sortDir - должно быть enum - asc | desc' })
    readonly sortDir?: string;

    @ApiProperty({example:"limit", description:'Количество сущностей на странице'})
    @IsOptional()
    @Validate(isNumberValidator,{message:'limit - должен быть числом'})
    readonly limit?: number;

    @ApiProperty({example:"page", description:'Номер запрашиваемой страницы'})
    @IsOptional()
    @Validate(isNumberValidator,{message:'page - должен быть числом'})
    readonly page?: number;

    @ApiProperty({example:"ива", description:'Строка для поиска по текстовым полям модели по ilike %search%'})
    @IsOptional()
    @IsString({message:'search - должно быть строкой'})
    readonly search?: string;


}