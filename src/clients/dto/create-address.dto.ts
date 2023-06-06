import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class CreateAddressDto {
    @ApiProperty({example: '454074', description: 'zipCode'})
    @IsOptional()
    @IsString({message:'zipCode - должно быть строкой'})
    readonly zipCode?: string;

    @ApiProperty({example: 'Россия', description: 'Страна'})
    @IsOptional()
    @IsString({message:'country - должно быть строкой'})
    readonly country?: string;

    @ApiProperty({example: 'Челябинская область', description: 'Область'})
    @IsOptional()
    @IsString({message:'region - должно быть строкой'})
    readonly region?: string;

    @ApiProperty({example: 'Челябинск', description: 'Город'})
    @IsOptional()
    @IsString({message:'city - должно быть строкой'})
    readonly city?: string;

    @ApiProperty({example: 'Ленина', description: 'Улица'})
    @IsOptional()
    @IsString({message:'street - должно быть строкой'})
    readonly street?: string;

    @ApiProperty({example: '74а', description: 'Номер дома'})
    @IsOptional()
    @IsString({message:'house - должно быть строкой'})
    readonly house?: string;

    @ApiProperty({example: '101а', description: 'Номер квартиры, офиса и т.д.'})
    @IsOptional()
    @IsString({message:'apartment - должно быть строкой'})
    readonly apartment?: string;
}