import { Module } from "@nestjs/common"
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersModule } from "./users/users.module";
import { ConfigModule } from "@nestjs/config";
import { User } from "./users/users.table";
import { Client } from "./clients/client.table";
import { ClientModule } from "./clients/client.module";
import { Passport } from "./clients/passport.table";
import { Child } from "./clients/child.table";
import { Job } from "./clients/job.table";
import { LivingAdress } from "./clients/livingAddress.table";
import { AddressNew } from "./clients/address.table";
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
            models: [User, Client, Passport, Child, Job, AddressNew],
            autoLoadModels: true,
            synchronize:true,
            //force:true
        }),
        UsersModule, 
        ClientModule
    ]
})

export class AppModule { }