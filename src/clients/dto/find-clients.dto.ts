import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsDefined, IsEnum, IsNumber, IsOptional, IsString, Validate, ValidateNested } from "class-validator";
import { isNumberValidator } from "src/shared/isNumberValidator";

export class FindClientDto {

    @ApiProperty({example:`[
        {"field":"name", "sortDir":"asc"},
        {"field":"surname", "sortDir":"desc"}
    ]`, description:'Поле по которому нужно сортировать'})
    @IsOptional()
    @IsArray({message:'sort - должен быть массивом'})
    @ValidateNested({each:true, message:'sort - должен быть массивом сущностей sortByDto'})
    @Type(() => SortByDto)
    readonly sort?: SortByDto[];

    @ApiProperty({example:"10", description:'Количество сущностей на странице'})
    @IsOptional()
    @Validate(isNumberValidator,{message:'limit - должен быть числом'})
    readonly limit?: number;

    @ApiProperty({example:"1", description:'Номер запрашиваемой страницы'})
    @IsOptional()
    @Validate(isNumberValidator,{message:'page - должен быть числом'})
    readonly page?: number;

    @ApiProperty({example:"ива", description:'Строка для поиска по текстовым полям модели по ilike %search%'})
    @IsOptional()
    @IsString({message:'search - должно быть строкой'})
    readonly search?: string;
}

export class SortByDto {
    @ApiProperty({example:'name',description:'Поле сортировки'})
    @IsDefined({message:'field должен быть объявлен'})
    @IsString({message:'field - должен быть строкой'})
    readonly field:string;

    @ApiProperty({example:'sortDir',description:'Направление сортировки'})
    @IsDefined({message:'sortDir должен быть объявлен'})
    @IsString({message:'sortDir - должен быть строкой'})
    @IsEnum(['asc','desc'],{ message: 'sortDir - должно быть enum - asc | desc' })
    readonly sortDir:string;
}