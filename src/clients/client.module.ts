import { Module } from "@nestjs/common";
import { ClientController } from "./client.controller";
import { ClientService } from "./client.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { Client } from "./client.table";
import { Passport } from "./passport.table";
import { Child } from "./child.table";
import { Job } from "./job.table";
import { LivingAdress } from "./livingAddress.table";
import { AddressNew } from "./address.table";

@Module({
    controllers:[ClientController],
    providers:[ClientService],
    imports: [
        SequelizeModule.forFeature([Client,Passport, Child, Job, AddressNew])
    ]
})
export class ClientModule {}
