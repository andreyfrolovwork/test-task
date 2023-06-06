import { Body, Controller, Delete, Get, Param, ParseIntPipe, ParseUUIDPipe, Patch, Post, Put, Query, UsePipes, ValidationPipe } from "@nestjs/common";
import { ClientService } from "./client.service";
import { CreateClientDto } from "./dto/create-client.dto";
import { ApiTags, ApiOperation, ApiResponse, ApiBadRequestResponse,ApiOkResponse, ApiProperty } from "@nestjs/swagger";
import { Client } from "./client.table";

class BadRequest {
    @ApiProperty({example: '404', description: 'Статус возврата'})
    readonly status:number;
    @ApiProperty({example: 'Такого клиента не существует', description: 'Описание ошибки'})
    readonly message:string;
}


@ApiTags('Клиенты')
@Controller('client')
export class ClientController {

    constructor(private clientService:ClientService) {}

    @ApiOperation({summary: 'Листинг клиентов'})
    @ApiResponse({status: 201, type: [CreateClientDto]})
    @ApiResponse({
        schema:{
            example:{
                status: 404,
                message: "Такого клиента не существует"
            },
        },
        status:404,
        description:'Сущность не найдена'
    })
    @ApiResponse({
        schema:{
            example:{
                "statusCode": 400,
                "message": [
                    "monIncome - должен быть числом",
                    "monExpenses - должен быть числом"
                ],
                "error": "Bad Request"
            },
        },
        status:400,
        description:'Ошибка валидации'
    })
    @ApiResponse({
        schema:{
            example:{
                "statusCode": 500,
                "message": "Internal server error"
            },
        },
        status:500,
        description:'Ошибка на сервере'
    })
    
    
    @UsePipes(ValidationPipe)
    @Get('all')
    getAll(){
        return this.clientService.getAllClient()
    }

    @ApiOperation({summary: 'Просмотр клиента'})
    @ApiResponse({status: 200, type: CreateClientDto    })
    @ApiBadRequestResponse({status: 404, type: BadRequest})
    @UsePipes(ValidationPipe)
    @Get()
    clientGet(@Query('clientId',ParseUUIDPipe) clientId:string){
        return this.clientService.getClientById(clientId)
    }

    @ApiOperation({summary: 'Частичное обновление клиента'})
    @ApiResponse({status: 200, type: Client})
    @UsePipes(ValidationPipe)
    @Post()
    create(@Body() clientDto: CreateClientDto) {
        return this.clientService.createClient(clientDto)
    }
    
    @Patch()
    getById(@Body() clientDto: CreateClientDto){   
        return this.clientService.changeClient(clientDto)
    }

    @Delete()
    test(@Body() clientDto: CreateClientDto){
        return this.clientService.test(clientDto)
    }

    @Put()
    put(){
        return this.clientService.put()
    }
}