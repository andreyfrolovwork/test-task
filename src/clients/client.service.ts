import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Client } from "./client.table";
import { CreateClientDto } from "./dto/create-client.dto";
import { Passport } from "./passport.table";
import { Child } from "./child.table";
import { Address } from "./address.table";
import { Communication } from "./communication.table";
import { update } from "src/shared/update";
import { Job } from "./job.table";


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
        async put(){
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

        const updatedUser3 = await this.clientRepo.findByPk(1, {
            include: {
                all: true
            }
        })

        const ad1 = await this.addressRepo.create({
            country: 'ad1'
        })

        const ad2 = await this.addressRepo.create({
            country: 'ad2'
        })
        /* 
                updatedUser3.regAddressId = ad1.id
                updatedUser3.livingAddressId = ad2.id
         */
        await updatedUser3.save()

        const updatedUser4 = await this.clientRepo.findByPk(1, {
            include: {
                all: true
            }
        })

        return updatedUser4
    }
    async createClient(dto: CreateClientDto) {
        const user = await this.clientRepo.create(dto, /* {
            //include: this.passportRepo
            include: 'all'
        } */)
        //const query = await this.clientRepository.sequelize.query('select * from client;')
        return user
    }
    async getAllClient() {
        const usersWithPassports = await this.clientRepo.findAll({
            include: this.passportRepo
        })
        return usersWithPassports
    }
    async changeClient(clientDto: Client) {
        const repos = {
            passportRepo: this.passportRepo,
            childRepo: this.childRepo,
            jobRepo: this.jobRepo,
            addressRepo: this.addressRepo,
            comRepo:this.comRepo
        }
        const user = await this.clientRepo.findByPk(clientDto.id, {
            //include: [this.passportRepo, this.childRepo, this.jobRepo, this.addressNewRepo]
            include: {
                all: true
            }
        })

        if (!user) {
            throw new HttpException('Такого клиента не существует', HttpStatus.NOT_FOUND)
        }

        const propsDef = [
            {
                propName: 'children',
                repo: 'childRepo',
                type: 'array'
            },
            {
                propName: 'jobs',
                repo: 'jobRepo',
                type: 'array'
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



        await update(user, propsDef, clientDto, repos)
       
        user.set(clientDto)
        await user.save()

        const updatedUser = await this.clientRepo.findByPk(clientDto.id, {
            //include: [this.passportRepo, this.childRepo, this.jobRepo, this.addressNewRepo]
            include: {
                all: true
            }
        })
        return updatedUser
    }
}
