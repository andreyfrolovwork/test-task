import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Client } from "./client.table";
import { CreateClientDto } from "./dto/create-client.dto";
import { Passport } from "./passport.table";


@Injectable()
export class ClientService {
    constructor(
        @InjectModel(Client) private clientRepo: typeof Client, 
        @InjectModel(Passport) private passportRepo: typeof Passport
        ) {}

    async createClient(dto: CreateClientDto) {
        const client = {
            ...dto,
            passport: [dto.passport]
        };

        const user = await this.clientRepo.create(client, {
            include:this.passportRepo
        })
        //const query = await this.clientRepository.sequelize.query('select * from client;')
        return user
    }

    async getAllClient() {        
        const usersWithPassports = await this.clientRepo.findAll({
            include: this.passportRepo
        })  
        return usersWithPassports
    }
}