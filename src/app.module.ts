import { Module } from "@nestjs/common"
import { SequelizeModule } from "@nestjs/sequelize";
import { ConfigModule } from "@nestjs/config";
import { Client } from "./clients/client.table";
import { ClientModule } from "./clients/client.module";
import { Passport } from "./clients/passport.table";
import { Child } from "./clients/child.table";
import { Address } from "./clients/address.table";
import { Communication } from "./clients/communication.table";
import { Job } from "./clients/job.table";
@Module({
    controllers: [],
    providers: [],
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRESS_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRESS_PASSWORD,
            database: process.env.POSTGRES_DB,
            models: [Client, Passport, Child, Job, Address, Communication],
            autoLoadModels: true,
            synchronize:true,       
        }),         
        ClientModule
    ]
})

export class AppModule { }