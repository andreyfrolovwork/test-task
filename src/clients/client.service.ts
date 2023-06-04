import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Client } from "./client.table";
import { CreateClientDto } from "./dto/create-client.dto";
import { Passport } from "./passport.table";
import { Child } from "./child.table";
import { Job } from "./job.table";
import { Model } from "sequelize-typescript";
import { LivingAdress } from "./livingAddress.table";
import { AddressNew } from "./address.table";


@Injectable()
export class ClientService {
    constructor(
        @InjectModel(Client) private clientRepo: typeof Client,
        @InjectModel(Passport) private passportRepo: typeof Passport,
        @InjectModel(Child) private childRepo: typeof Child,
        @InjectModel(Job) private jobRepo: typeof Job,
        @InjectModel(AddressNew) private addressNewRepo: typeof AddressNew
        //@InjectModel(LivingAdress) private livingAdressRepo: typeof LivingAdress
    ) { }

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

        const ad1 = await this.addressNewRepo.create({
            country: 'ad1'
        })

        const ad2 = await this.addressNewRepo.create({
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
    async changeClient(clientDto: CreateClientDto) {
        const repos = {
            passportRepo: this.passportRepo,
            childRepo: this.childRepo,
            jobRepo: this.jobRepo,
            //livingAdressRepo: this.livingAdressRepo
            addressNewRepo: this.addressNewRepo
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
                propName: 'passport',
                repo: 'passportRepo',
                type: 'one'
            },
            {
                propName: 'livingAddress',
                repo: 'addressNewRepo',
                type: 'one'
            },
            {
                propName: 'regAddress',
                repo: 'addressNewRepo',
                type: 'one'
            }
        ]
        function updateSubModels(model: Model, muiltiplePropsArray: multiArr[], clientDto, repos) {
            return function (propsElement: multiArr) {
                if (propsElement.type === 'array') {
                    return updateSubModelArray(model, muiltiplePropsArray, clientDto, repos)(propsElement)
                } else if (propsElement.type === 'one') {
                    return updateOnePropCallBack2(user, muiltiplePropsArray, clientDto, repos)(propsElement)
                }
            }
        }

        async function update(model: Model, muiltiplePropsArray: multiArr[], clientDto, repos) {
            await Promise.all(muiltiplePropsArray.map(updateSubModels(user, muiltiplePropsArray, clientDto, repos)))

        }

        await update(user, propsDef, clientDto, repos)
        //@ts-ignore
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

interface multiArr {
    propName: string;
    repo: string,
    type?: string
}

async function updateMulitipleProps(model: Model, muiltiplePropsArray: multiArr[], clientDto: CreateClientDto, repos) {
    const arr = muiltiplePropsArray.map(updateSubModelArray(model, muiltiplePropsArray, clientDto, repos))
    const result = await Promise.all(arr)
}

function updateSubModelArray(model: Model, muiltiplePropsArray: multiArr[], clientDto, repos): any {
    return function (subModelPropElement: multiArr) {
        if (clientDto[subModelPropElement.propName]) {
            if (clientDto[subModelPropElement.propName] === null) {
                return repos[subModelPropElement.repo].destroy({
                    where: {
                        clientId: clientDto.id
                    }
                });
            } else if (clientDto[subModelPropElement.propName].length !== 0) {

                const idsFromClient = clientDto[subModelPropElement.propName].map((subModel) => subModel.id)
                const subModelIdArrayFromDatabase = model[subModelPropElement.propName].length ? model[subModelPropElement.propName].map((el) => el.id) : []
                const arrayToDelete = subModelIdArrayFromDatabase.filter((idFromDb) => !idsFromClient.includes(idFromDb))

                const deletePromises = arrayToDelete.map((id) => repos[subModelPropElement.repo].destroy({
                    where: { id: id }
                }))

                const createPromises = clientDto[subModelPropElement.propName]
                    .map(subModelUpdateOrCreateByid(subModelPropElement, repos, clientDto));

                const allPromises = deletePromises.concat(createPromises)

                return Promise.all(allPromises);
            }
        }
    }
}
function subModelUpdateOrCreateByid(mPropArr, repos, clientDto) {
    return function (subModel) {
        if (!subModel.id) {
            return repos[mPropArr.repo].create({
                clientId: clientDto.id,
                ...subModel
            });
        } else if (subModel.id) {
            return repos[mPropArr.repo].findByPk(subModel.id)
                .then((model) => {
                    if (model) {
                        model.set(subModel);
                        return model.save();
                    }
                });

        }
    }
}

function updateOnePropCallBackOld(model: Model, propsArr: multiArr[], clientDto, repos) {
    return function (propElement: multiArr) {


        if (clientDto[propElement.propName] === null) {
            return repos[propElement.repo].destroy({
                where: {
                    clientId: clientDto.id
                }
            })
        } else if (clientDto[propElement.propName] && !clientDto[propElement.propName].hasOwnProperty('id')) {
            return repos[propElement.repo].create({
                ...clientDto[propElement.propName]
            })
        } else if (clientDto[propElement.propName] && clientDto[propElement.propName].hasOwnProperty('id')) {
            model.set({
                [propElement.propName]: {
                    ...clientDto[propElement.propName]
                }
            })
            return model.save()
        }
    }

}
function updateOnePropCallBack2(model: Model, propsArr: multiArr[], clientDto, repos) {
    return function (propElement: multiArr) {
        if (clientDto[propElement.propName] === null) {
            model[propElement.propName + 'Id'] = null
            return model.save()
        } else if (model[propElement.propName + 'Id'] !== null &&
            clientDto[propElement.propName] !== undefined &&
            (typeof clientDto[propElement.propName] === 'object')) {
            // patch
            return repos[propElement.repo].findByPk(model[propElement.propName + 'Id'])
                .then((model) => {
                    const modelData = {
                        ...clientDto[propElement.propName]
                    };
                    delete modelData.id
                    model.set(modelData)
                    return model.save()
                })

        } else if (
            model[propElement.propName + 'Id'] === null &&
            clientDto[propElement.propName] !== undefined &&
            (typeof clientDto[propElement.propName] === 'object')
        ) {
            //create
            const modelData = {
                ...clientDto[propElement.propName]
            };
            delete modelData.id
            return repos[propElement.repo]
                .create(modelData)
                .then((newAddress) => {
                    model[propElement.propName + 'Id'] = newAddress.id
                    return model.save()
                })

        }
    }

}