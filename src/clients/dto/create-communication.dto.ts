import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsMobilePhone, IsString, Validate } from "class-validator";
import { isEnumEmailPhoneValidator } from "src/shared/isEnumValidator";

export class CreateCommunicationDto {
    @ApiProperty({
        example: 'phone',
        description: `Тип:
    * email - Электронная почта
    * phone - Мобильный телефон`,
        enum: ['email', 'phone']
    })
    @IsEnum(['email','phone'],{ message: 'type - должно быть enum - email | phone' })

    readonly type?: string;

    @ApiProperty({ example: '79821048575', description: 'Значение средства связи' }) 
    @IsString({ message: 'value - должно быть строкой' })
    @IsMobilePhone()
    readonly value?: string;

}