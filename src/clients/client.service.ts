import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Client } from "./client.table";
import { CreateClientDto } from "./dto/create-client.dto";
import { Passport } from "./passport.table";
import { Child } from "./child.table";
import { Address } from "./address.table";
import { Communication } from "./communication.table";
import { getLikeOrArray, getStringAttrs, update } from "src/shared/update";
import { Job } from "./job.table";
import { findClientDto } from "./dto/find-clients.dto";
import getPage from "src/shared/getPage";
import { Op } from "sequelize";
import { DataType } from "sequelize-typescript";

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
            }/* ,
            {
                propName: 'jurAddress',
                repo: 'addressRepo',
                type: 'one'
            } */
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
    async test2(body) {
        const repos = {
            clientRepo: this.clientRepo,
            passportRepo: this.passportRepo,
            childRepo: this.childRepo,
            jobRepo: this.jobRepo,
            addressRepo: this.addressRepo,
            comRepo: this.comRepo
        }
        let arr = []
        for (let i = 0; i < 1000; i++) {
            arr.push(repos.clientRepo.create({
                name: 'Иван - ' + i,
                surname:'фролов - ' + i
            }))
        }

        await Promise.all(arr)

        // const p1 =  repos.clientRepo.create({
        //     name:'test name2'
        // })
        // await Promise.all([p1])
        const result = await this.clientRepo.findAll()

        return result
    }
    /*   async test2(body) {
          debugger
          const repos = {
              passportRepo: this.passportRepo,
              childRepo: this.childRepo,
              jobRepo: this.jobRepo,
              addressRepo: this.addressRepo,
              comRepo: this.comRepo
          }
  
          // const jobs = await repos.jobRepo.findByPk('5e7531b5-a2c9-43dd-9b04-64867ba03880', {
          //     // include: {
          //     //     all: true
          //     // }
          //     include:{
  
          //     }
          // })
  
          // return jobs
  
          const clients = await this.clientRepo.findAll({
              include: {
                  all: true
              }
          })
  
          return clients
      } */

    async getClientById(clientId: string) {
        const user = await this.clientRepo.findByPk(clientId, {
            include: {
                all: true
            }
        })
        if (!user) {
            throw new HttpException('Такого клиента не существует', HttpStatus.NOT_FOUND)
        }
        return user
    }

    async put() {
        const user = await this.clientRepo.findByPk(1, {
            include: {
                all: true
            }
        })
        /*        user.set({
                   
                   communication: [
                       //@ts-ignore
                       {"type":"email", "value":"123"}
                   ]
               }) */

        await user.save()

        const user2 = await this.clientRepo.findByPk(1, {
            include: {
                all: true
            }
        })
        return user2
    }
    async test(dto: CreateClientDto) {
        const repos = {
            passportRepo: this.passportRepo,
            childRepo: this.childRepo,
            jobRepo: this.jobRepo,
            addressRepo: this.addressRepo,
            comRepo: this.comRepo
        }
        const jobDto = {
            factAddress: {
                country: 'Russia'
            },
            jurAddress: {
                country: "Mordor"
            }
        }
        const job = await this.jobRepo.findByPk('5148aefd-7cac-44c7-8420-3c548db0676e')
        const jobProp = [{
            propName: 'factAddress',
            repo: 'addressRepo',
            type: 'one'
        },
        {
            propName: 'jurAddress',
            repo: 'addressRepo',
            type: 'one'
        }]

        await update(job, jobProp, jobDto, repos)

        const updatedJob = await this.jobRepo.findByPk('5148aefd-7cac-44c7-8420-3c548db0676e', {
            include: {
                all: true
            }
        })

        return updatedJob

        /*      const repos = {
                 passportRepo: this.passportRepo,
                 childRepo: this.childRepo,
                 jobRepo: this.jobRepo,
                 //livingAdressRepo: this.livingAdressRepo
                 addressNewRepo: this.addressNewRepo
             }
             const props = {
                 propName: 'livingAddress',
                 repo: 'addressNewRepo',
                 type: 'one'
             }
             const user = await this.clientRepo.findByPk(dto.id, {
                 include: [this.passportRepo, this.childRepo, this.jobRepo, this.addressNewRepo]
             })
     
     
             //await user.save()
     
             if (dto[props.propName] === null) {
                 user[props.propName + 'Id'] = null
                 await user.save()
             } else if (user[props.propName + 'Id'] !== null &&
                 dto[props.propName] !== undefined &&
                 (typeof dto[props.propName] === 'object')) {
                 // patch
                 await repos[props.repo].findByPk(user[props.propName + 'Id'])
                     .then((model) => {
                         const modelData = {
                             ...dto[props.propName]
                         };
                         delete modelData.id
                         model.set(modelData)
                         return model.save()
                     })
     
             } else if (user[props.propName + 'Id'] === null &&
                 dto[props.propName] !== undefined &&
                 (typeof dto[props.propName] === 'object')) {
                 //create
                 const modelData = {
                     ...dto[props.propName]
                 };
                 delete modelData.id
                 const newAdress = await repos[props.repo].create(modelData)
                 user[props.propName + 'Id'] = newAdress.id
                 await user.save()
             }
      */

        // const updatedUser3 = await this.clientRepo.findByPk(1, {
        //     include: {
        //         all: true
        //     }
        // })

        // const ad1 = await this.addressRepo.create({
        //     country: 'ad1'
        // })

        // const ad2 = await this.addressRepo.create({
        //     country: 'ad2'
        // })
        // /* 
        //         updatedUser3.regAddressId = ad1.id
        //         updatedUser3.livingAddressId = ad2.id
        //  */
        // await updatedUser3.save()

        // const updatedUser4 = await this.clientRepo.findByPk(1, {
        //     include: {
        //         all: true
        //     }
        // })

        // return updatedUser4
    }
    async createClient(dto: CreateClientDto) {
        const repos = {
            passportRepo: this.passportRepo,
            childRepo: this.childRepo,
            jobRepo: this.jobRepo,
            addressRepo: this.addressRepo,
            comRepo: this.comRepo
        }
        const user = await this.clientRepo.create(dto)
        await update(user, clientPropsDef, dto, repos)
        const userAfterUpdate = await this.clientRepo.findByPk(user.id)
        return userAfterUpdate
    }
    async getAllClient(getClientDto: findClientDto) {
        // по идее валидацию нужно убрать из сервиса в пайп я так понимаю
        if (getClientDto.sortBy && !this.clientRepo.rawAttributes[getClientDto.sortBy]) {
            throw new HttpException(`${getClientDto.sortBy} - такого поля в модели Client не существует`, HttpStatus.BAD_REQUEST)
        }
        if (getClientDto.sortDir && !(getClientDto.sortDir === 'asc' || getClientDto.sortDir === 'desc')) {
            throw new HttpException(`sortDir - должен быть asc или desc`, HttpStatus.BAD_REQUEST)
        }

        // текстовые аттрибуты
        const offset = getPage(getClientDto.page, getClientDto.limit)
        const users = await this.clientRepo.findAndCountAll({
            offset: offset,
            limit: getClientDto.limit,
            where: {
                [Op.or]: getLikeOrArray(getClientDto.search,getStringAttrs(this.clientRepo),Op)
            },
            order: [[getClientDto.sortBy, getClientDto.sortDir]],

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

        // CreateClientDto не соответстует модели Client, надо подумать как убрать ошибку ts
        //@ts-ignore
        user.set(clientDto)
        await user.save()
        const updatedUser = await this.clientRepo.findByPk(clientDto.id)
        return updatedUser
    }
}
