import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsEnum, IsMobilePhone, IsString } from "class-validator";

export class CreateCommunicationDto {
    @ApiProperty({
        example: 'phone',
        description: `Тип:
    * email - Электронная почта
    * phone - Мобильный телефон`,
        enum: ['email', 'phone']
    })
    @IsDefined({ message: 'type - должен быть not be null or undefined' })
    @IsEnum(['email','phone'],{ message: 'type - должно быть enum - email | phone' })
    readonly type?: string;

    @ApiProperty({ example: '79821048575', description: 'Значение средства связи' }) 
    @IsDefined({ message: 'value - должен быть not be null or undefined' })
    @IsString({ message: 'value - должно быть строкой' })
    @IsMobilePhone()
    readonly value?: string;

}