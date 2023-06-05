import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, Query, UsePipes, ValidationPipe } from "@nestjs/common";
import { ClientService } from "./client.service";
import { CreateClientDto } from "./dto/create-client.dto";
import { ApiTags, ApiOperation, ApiResponse, ApiBadRequestResponse } from "@nestjs/swagger";
import { Client } from "./client.table";
class ITest {
    foo:string;
}


@ApiTags('Клиенты')
@Controller('client')
export class ClientController {

    constructor(private clientService:ClientService) {}

    @ApiOperation({summary: 'Листинг клиентов'})
    @ApiResponse({status: 200, type: Client})
    @UsePipes(ValidationPipe)
    @Get('all')
    getAll(){
        return this.clientService.getAllClient()
    }

    @ApiOperation({summary: 'Просмотр клиента'})
    @ApiResponse({status: 200, type: ITest})
    @ApiBadRequestResponse({status: 200, type: ITest})
    @UsePipes(ValidationPipe)
    @Get()
    clientGet(@Query('clientId',ParseIntPipe) clientId:number){
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
        //@ts-ignore
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