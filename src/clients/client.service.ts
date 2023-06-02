import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Client } from "./client.table";
import { CreateClientDto } from "./dto/create-client.dto";
import { Passport } from "./passport.table";
import { Child } from "./child.table";
import { Job } from "./job.table";
import { Model } from "sequelize-typescript";
import { LivingAdress } from "./livingAddress.table";


@Injectable()
export class ClientService {
    constructor(
        @InjectModel(Client) private clientRepo: typeof Client,
        @InjectModel(Passport) private passportRepo: typeof Passport,
        @InjectModel(Child) private childRepo: typeof Child,
        @InjectModel(Job) private jobRepo: typeof Job,
        @InjectModel(LivingAdress) private livingAdressRepo: typeof LivingAdress
    ) { }

    async createClient(dto: CreateClientDto) {
        const user = await this.clientRepo.create(dto, {
            include: this.passportRepo
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
    async changeClient(clientDto: CreateClientDto) {
        const repos = {
            passportRepo: this.passportRepo,
            childRepo: this.childRepo,
            jobRepo: this.jobRepo,
            livingAdressRepo: this.livingAdressRepo
        }
        const user = await this.clientRepo.findByPk(clientDto.id, {
            include: [this.passportRepo, this.childRepo, this.jobRepo]
        })

        const propsDef = [
            {
                propName: 'children',
                repo: 'childRepo',
                type:'array'
            },
            {
                propName: 'jobs',
                repo: 'jobRepo',
                type:'array'
            },
            {
                propName: 'passport',
                repo: 'passportRepo',
                type:'one'
            },
/*             {
                propName: 'livingAddress',
                repo: 'livingAdressRepo',
                type:'one'
            } */
        ]
        const muiltiplePropsArray = [
            {
                propName: 'children',
                repo: 'childRepo'
            },
            {
                propName: 'jobs',
                repo: 'jobRepo'
            },
        ]
        //await updateMulitipleProps(user, muiltiplePropsArray, clientDto, repos)

        const onePropsArray = [
            {
                propName: 'passport',
                repo: 'passportRepo'
            },
            {
                propName: 'livingAddress',
                repo: 'livingAdressRepo'
            }
        ]

        //await updateOneProps(user, onePropsArray, clientDto, repos)        

        async function updateOneProps(user, propsArr, clientDto, repos) {
            await Promise.all(propsArr.map(updateOnePropCallBack(user, propsArr, clientDto, repos)))
        }

        function updateSubModels(model: Model, muiltiplePropsArray: multiArr[], clientDto, repos){
            return function(propsElement: multiArr){
                if(propsElement.type === 'array') {
                    return updateSubModelArray(model, muiltiplePropsArray, clientDto, repos)(propsElement)
                } else if( propsElement.type === 'one') {
                    return updateOnePropCallBack(user, muiltiplePropsArray, clientDto, repos)(propsElement)
                }
            }
        }

        async function update(model: Model, muiltiplePropsArray: multiArr[], clientDto, repos){
            await Promise.all(muiltiplePropsArray.map(updateSubModels(user, muiltiplePropsArray, clientDto, repos)))

        }

        await update(user, propsDef, clientDto, repos)
        //@ts-ignore
        user.set(clientDto)
        await user.save()

        const updatedUser = await this.clientRepo.findByPk(clientDto.id, {
            include: [this.passportRepo, this.childRepo, this.jobRepo, this.livingAdressRepo]
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

function updateOnePropCallBack(user: Model, propsArr: multiArr[], clientDto, repos) {
    return function (propElement: multiArr) {
        if (clientDto[propElement.propName] === null) {            
            return repos[propElement.repo].destroy({
                where: {
                    clientId: clientDto.id
                }
            })
        } else {           
            return repos[propElement.repo].create({
                ...clientDto[propElement.propName],
                clientId: clientDto.id
            })

        }
    }

}