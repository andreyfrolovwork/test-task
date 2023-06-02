import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Client } from "./client.table";
import { CreateClientDto } from "./dto/create-client.dto";
import { Passport } from "./passport.table";
import { Child, ChildCreationAttr } from "./child.table";
import { Job } from "./job.table";
import { Model } from "sequelize-typescript";


@Injectable()
export class ClientService {
    constructor(
        @InjectModel(Client) private clientRepo: typeof Client,
        @InjectModel(Passport) private passportRepo: typeof Passport,
        @InjectModel(Child) private childRepo: typeof Child,
        @InjectModel(Job) private jobRepo: typeof Job
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
    async changeClient(clientDto) {
        /*         const user = await this.clientRepo.findByPk(clientDto.id, {
                    include: [this.passportRepo, this.childRepo, this.jobRepo]
                }) */
        const repos = {
            passportRepo: this.passportRepo,
            childRepo: this.childRepo,
            jobRepo: this.jobRepo,
        }

        const user = await this.clientRepo.findByPk(clientDto.id, {
            include: [this.passportRepo, this.childRepo, this.jobRepo]
        })

        interface multiArr {
            propName: string;
            repo: string
        }

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
        function subModelUpdateOrCreateByid(mPropArr) {
            return function (subModel) {
                if (!subModel.id) {
                    return repos[mPropArr.repo].create({
                        clientId: clientDto.id,
                        ...subModel
                    });
                } else if (subModel.id) {
                    return repos[mPropArr.repo].findByPk(subModel.id)
                        .then((model) => {
                            model.set(subModel);
                            return model.save();
                        });

                }
            }
        }

        function updateSubModelArray(model: Model, muiltiplePropsArray: multiArr[], clientDto): any {
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
                            .map(subModelUpdateOrCreateByid(subModelPropElement));

                        const allPromises = deletePromises.concat(createPromises)

                        return Promise.all(allPromises);
                    }
                }
            }
        }

        async function updateMulitipleProps(model: Model, muiltiplePropsArray: multiArr[], clientDto) {
            const arr = muiltiplePropsArray.map(updateSubModelArray(model, muiltiplePropsArray, clientDto))
            const result = await Promise.all(arr)
        }

        const resUpdate = await updateMulitipleProps(user, muiltiplePropsArray, clientDto)

/*         if (clientDto["children"]) {
            if (clientDto["children"] === null) {
                await this.childRepo.destroy({
                    where: {
                        clientId: clientDto.id
                    }
                })
            } else if (clientDto["children"].length !== 0) {
                const createPromises = clientDto["children"]
                    .map((children: ChildCreationAttr) => {
                        if (!children.id) {
                            return this.childRepo.create({
                                clientId: clientDto.id,
                                ...children
                            })
                        } else if (children.id) {
                            return this.childRepo.findByPk(children.id)
                                .then((model) => {
                                    model.set(children)
                                    return model.save()
                                })
                        }
                    })
                await Promise.all(createPromises)
            }
        } */

/*         if (clientDto.passport === null) {
            // sql альтернатива
            // const passport = await this.passportRepo.sequelize.query(
            //     `DELETE FROM passports3 WHERE "clientId" = ${clientDto.id};`
            // )
            const passport = await this.passportRepo.destroy({
                where: {
                    clientId: clientDto.id
                }
            })
        } else {
            await this.passportRepo.create({
                ...clientDto.passport,
                clientId: clientDto.id
            })

        } */

        user.set(clientDto)
        await user.save()

        const updatedUser = await this.clientRepo.findByPk(clientDto.id, {
            include: [this.passportRepo, this.childRepo, this.jobRepo]
        })
        return updatedUser
    }
}