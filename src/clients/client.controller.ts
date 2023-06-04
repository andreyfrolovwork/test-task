import { Body, Controller, Delete, Get, Patch, Post, Put, Query } from "@nestjs/common";
import { ClientService } from "./client.service";
import { CreateClientDto } from "./dto/create-client.dto";
import { Client } from "./client.table";

@Controller('client')
export class ClientController {

    constructor(private clientService:ClientService) {}

    @Post()
    create(@Body() clientDto: CreateClientDto) {
        return this.clientService.createClient(clientDto)
    }

    @Get()
    getAll(){
        return this.clientService.getAllClient()
    }

    @Patch()
    getById(@Body() clientDto: Client){
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