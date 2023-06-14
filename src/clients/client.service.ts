import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Client } from "./client.table";
import { CreateClientDto } from "./dto/create-client.dto";
import { Passport } from "./passport.table";
import { Child } from "./child.table";
import { Address } from "./address.table";
import { Communication } from "./communication.table";
import { getLikeOrArray, getStringAttrs, update, validateSort, getSortQuery } from "src/shared/update";
import { Job } from "./job.table";
import { FindClientDto } from "./dto/find-clients.dto";
import getPage from "src/shared/getPage";
import { Op } from "sequelize";

const clientPropsDef = [
    {
        propName: 'children',
        repo: 'childRepo',
        type: 'array'
    },
    {
        propName: 'jobs',
        repo: 'jobRepo',
        type: 'array',
        subModels: [
            {
                propName: 'factAddress',
                repo: 'addressRepo',
                type: 'one'
            },
            {
                propName: 'jurAddress',
                repo: 'addressRepo',
                type: 'one'
            }
        ]
    },
    {
        propName: 'communication',
        repo: 'comRepo',
        type: 'array'
    },
    {
        propName: 'passport',
        repo: 'passportRepo',
        type: 'one'
    },
    {
        propName: 'livingAddress',
        repo: 'addressRepo',
        type: 'one'
    },
    {
        propName: 'regAddress',
        repo: 'addressRepo',
        type: 'one'
    }
]

@Injectable()
export class ClientService {
    constructor(
        @InjectModel(Client) private clientRepo: typeof Client,
        @InjectModel(Passport) private passportRepo: typeof Passport,
        @InjectModel(Child) private childRepo: typeof Child,
        @InjectModel(Job) private jobRepo: typeof Job,
        @InjectModel(Address) private addressRepo: typeof Address,
        @InjectModel(Communication) private comRepo: typeof Communication

    ) { }

    async getClientById(clientId: string) {
        const user = await this.clientRepo.findByPk(clientId, {
            include: {
                all: true,
                nested: true
            }
        })
        if (!user) {
            throw new HttpException('Такого клиента не существует', HttpStatus.NOT_FOUND)
        }
        return user
    }
 
    async createClient(dto: CreateClientDto) {
        const user = await this.clientRepo.create(dto)
        return await this.changeClient({
            id:user.id,
            ...dto
        })
    }

    async getAllClient(getClientDto: FindClientDto) {
        // по идее валидацию нужно убрать из сервиса в пайп я так понимаю
        validateSort(this.clientRepo, getClientDto)

        const offset = getPage(getClientDto.page, getClientDto.limit)
        const users = await this.clientRepo.findAndCountAll({
            offset: offset,
            limit: getClientDto.limit,
            where: {
                [Op.or]: getLikeOrArray(getClientDto.search, getStringAttrs(this.clientRepo), Op)
            },
            //@ts-ignore 
            // здесь тоже несоответствие типов, однако все работает
            order: getSortQuery(getClientDto.sort),
        })

        return {
            page: getClientDto.page,
            limit: getClientDto.limit,
            total: users.count,
            data: users.rows
        }
    }

    async changeClient(clientDto: CreateClientDto) {
        const repos = {
            passportRepo: this.passportRepo,
            childRepo: this.childRepo,
            jobRepo: this.jobRepo,
            addressRepo: this.addressRepo,
            comRepo: this.comRepo
        }
        const user = await this.clientRepo.findByPk(clientDto.id, {
            attributes: {
                include: ['passportId', 'livingAddressId', 'regAddressId']
            },
            include: {
                all: true,
                nested: true
            }
        })
        if (!user) {
            throw new HttpException('Такого клиента не существует', HttpStatus.NOT_FOUND)
        }

        await update(user, clientPropsDef, clientDto, repos)
3
        // CreateClientDto не соответстует модели Client, надо подумать как убрать ошибку ts
        //@ts-ignore
        user.set(clientDto)
        await user.save()
        const updatedUser = await this.clientRepo.findByPk(clientDto.id)
        return updatedUser
    }
}
