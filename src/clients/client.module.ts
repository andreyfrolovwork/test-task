import { Module } from "@nestjs/common";
import { ClientController } from "./client.controller";
import { ClientService } from "./client.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { Client } from "./client.table";
import { Passport } from "./passport.table";

@Module({
    controllers:[ClientController],
    providers:[ClientService],
    imports: [
        SequelizeModule.forFeature([Client,Passport])
    ]
})
export class ClientModule {}
