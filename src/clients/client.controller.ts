import { Body, Controller, Get, ParseUUIDPipe, Patch, Post, Query } from "@nestjs/common";
import { ClientService } from "./client.service";
import { CreateClientDto } from "./dto/create-client.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { FindClientDto } from "./dto/find-clients.dto";

const Response404 = {
    schema: {
        example: {
            status: 404,
            message: "Такого клиента не существует"
        },
    },
    status: 404,
    description: 'Сущность не найдена'
}

const Response500 = {
    schema: {
        example: {
            "statusCode": 500,
            "message": "Internal server error"
        },
    },
    status: 500,
    description: 'Ошибка на сервере'
}

const Response400 = {
    schema: {
        example: {
            "statusCode": 400,
            "message": [
                "field1 - должен быть числом",
                "field2 - должен быть датой"
            ],
            "error": "Bad Request"
        },
    },
    status: 400,
    description: 'Ошибка валидации'
}

@ApiTags('Клиенты')
@Controller('client')
export class ClientController {

    constructor(private clientService: ClientService) { }

    @ApiOperation({ summary: 'Листинг клиентов' })
    @ApiResponse({ status: 201, type: [CreateClientDto] })
    @ApiResponse(Response404)
    @ApiResponse(Response400)
    @ApiResponse(Response500)
    @Get('all')
    getAll(
        @Body() findClientDto: FindClientDto
    ) {
        return this.clientService.getAllClient(findClientDto)
    }

    @ApiOperation({ summary: 'Просмотр клиента' })
    @ApiResponse(Response404)
    @ApiResponse(Response400)
    @ApiResponse(Response500)
    @Get()
    clientGet(@Query('clientId', ParseUUIDPipe) clientId: string) {
        return this.clientService.getClientById(clientId)
    }

    @ApiOperation({ summary: 'Создание клиента' })
    @ApiResponse(Response404)
    @ApiResponse(Response400)
    @ApiResponse(Response500)
    @Post()
    create(@Body() clientDto: CreateClientDto) {
        return this.clientService.createClient(clientDto)
    }

    @ApiOperation({ summary: 'Изменение клиента' })
    @ApiResponse(Response404)
    @ApiResponse(Response400)
    @ApiResponse(Response500)
    @Patch()
    getById(@Body() clientDto: CreateClientDto) {
        return this.clientService.changeClient(clientDto)
    } 

}