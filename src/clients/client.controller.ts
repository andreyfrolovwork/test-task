import { Body, Controller, Get, Post } from "@nestjs/common";
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
}