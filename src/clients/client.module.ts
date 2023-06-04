import { Module } from "@nestjs/common";
import { ClientController } from "./client.controller";
import { ClientService } from "./client.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { Client } from "./client.table";
import { Passport } from "./passport.table";
import { Child } from "./child.table";
import { Address } from "./address.table";
import { Communication } from "./communication.table";
import { Job } from "./job.table";

@Module({
    controllers:[ClientController],
    providers:[ClientService],
    imports: [
        SequelizeModule.forFeature([Client,Passport, Child, Job, Address, Communication])
    ]
})
export class ClientModule {}
