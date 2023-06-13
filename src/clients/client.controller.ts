import { Body, Controller, Delete, Get, Param, ParseIntPipe, ParseUUIDPipe, Patch, Post, Put, Query, UsePipes, ValidationPipe } from "@nestjs/common";
import { ClientService } from "./client.service";
import { CreateClientDto } from "./dto/create-client.dto";
import { ApiTags, ApiOperation, ApiResponse, ApiBadRequestResponse, ApiOkResponse, ApiProperty, ApiParam, ApiQuery } from "@nestjs/swagger";
import { Client } from "./client.table";
import { IsString } from "class-validator";
import { findClientDto } from "./dto/find-clients.dto";

class BadRequest {
    @ApiProperty({ example: '404', description: 'Статус возврата' })
    readonly status: number;
    @ApiProperty({ example: 'Такого клиента не существует', description: 'Описание ошибки' })
    readonly message: string;
}


@ApiTags('Клиенты')
@Controller('client')
export class ClientController {

    constructor(private clientService: ClientService) { }

    @ApiOperation({ summary: 'Листинг клиентов' })
    @ApiResponse({ status: 201, type: [CreateClientDto] })
    @ApiResponse({
        schema: {
            example: {
                status: 404,
                message: "Такого клиента не существует"
            },
        },
        status: 404,
        description: 'Сущность не найдена'
    })
    @ApiResponse({
        schema: {
            example: {
                "statusCode": 400,
                "message": [
                    "monIncome - должен быть числом",
                    "monExpenses - должен быть числом"
                ],
                "error": "Bad Request"
            },
        },
        status: 400,
        description: 'Ошибка валидации'
    })
    @ApiResponse({
        schema: {
            example: {
                "statusCode": 500,
                "message": "Internal server error"
            },
        },
        status: 500,
        description: 'Ошибка на сервере'
    })
    //@UsePipes(ValidationPipe)
    @Get('all')
    @ApiQuery({ name: "sortBy", required: false, description: "Поле, по которому нужно отсортировать", example: 'dob' })
    @ApiQuery({ name: "sortDir", required: false, description: "Направление сортировки", enum: ['asc', 'desc'] })
    @ApiQuery({ name: "limit", required: false, description: "Количество сущностей на странице", example: '1' })
    @ApiQuery({ name: "page", required: false, description: "Номер запрашиваемой страницы", example: '2' })
    @ApiQuery({ name: "search", required: false, description: "Строка для поиска по текстовым полям модели по ilike %search%", example: 'ива' })
    getAll(
        @Query('sortBy', ValidationPipe) sortBy: string,
        @Query('sortDir', ValidationPipe) sortDir: string,
        @Query('limit', ParseIntPipe) limit: number,
        @Query('page', ParseIntPipe) page: number,
        @Query('search', ValidationPipe) search: string
    ) {
        return this.clientService.getAllClient({
            sortBy,
            sortDir,
            limit,
            page,
            search,
        })
    }

    @ApiOperation({ summary: 'Просмотр клиента' })
    @ApiResponse({ status: 200, type: CreateClientDto })
    @ApiBadRequestResponse({ status: 404, type: BadRequest })
    @UsePipes(ValidationPipe)
    @Get()
    clientGet(@Query('clientId', ParseUUIDPipe) clientId: string) {
        return this.clientService.getClientById(clientId)
    }

    @ApiOperation({ summary: 'Создание клиента' })
    @ApiResponse({ status: 200, type: Client })
    @UsePipes(ValidationPipe)
    @Post()
    create(@Body() clientDto: CreateClientDto) {
        return this.clientService.createClient(clientDto)
    }

    @Patch()
    getById(@Body() clientDto: CreateClientDto) {
        return this.clientService.changeClient(clientDto)
    }

    @Delete()
    test(@Body() clientDto: CreateClientDto) {
        return this.clientService.test(clientDto)
    }

    @Put()
    put() {
        return this.clientService.put()
    }

    @Post('test')
    get(@Body() body: any) {
        return this.clientService.test2(body)
    }
}