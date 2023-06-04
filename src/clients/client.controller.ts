import { Body, Controller, Delete, Get, Patch, Post, Query } from "@nestjs/common";
import { ClientService } from "./client.service";
import { CreateClientDto } from "./dto/create-client.dto";

@Controller('client')
export class ClientController {

    constructor(private clientService:ClientService) {}

    @Post()
    create(@Body() clientDto: CreateClientDto) {
        console.log('post on client')
        console.log(clientDto)
        console.log(typeof clientDto)
        return this.clientService.createClient(clientDto)
    }

    @Get()
    getAll(){
        return this.clientService.getAllClient()
    }

    @Patch()
    getById(@Body() clientDto: CreateClientDto){
        return this.clientService.changeClient(clientDto)
    }

    @Delete()
    test(@Body() clientDto: CreateClientDto){
        return this.clientService.test(clientDto)
    }
}