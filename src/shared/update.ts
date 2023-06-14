import { HttpException, HttpStatus } from "@nestjs/common";
import { DataType, Model } from "sequelize-typescript";
import { CreateClientDto } from "src/clients/dto/create-client.dto";
import { FindClientDto, SortByDto } from "src/clients/dto/find-clients.dto";

export interface multiArr {
    propName: string;
    repo: string,
    type?: string
}

export function updateSubModels(model: Model, muiltiplePropsArray: multiArr[], clientDto, repos) {
    return function (propsElement: multiArr) {
        if (propsElement.type === 'array') {
            return updateSubModelArray(model, muiltiplePropsArray, clientDto, repos)(propsElement)
        } else if (propsElement.type === 'one') {
            return updateOnePropCallBack2(model, muiltiplePropsArray, clientDto, repos)(propsElement)
        }
    }
}

export async function update(model: Model, muiltiplePropsArray: multiArr[], clientDto, repos) {
    await Promise.all(muiltiplePropsArray.map(updateSubModels(model, muiltiplePropsArray, clientDto, repos)))
}


export async function updateMulitipleProps(model: Model, muiltiplePropsArray: multiArr[], clientDto: CreateClientDto, repos) {
    const arr = muiltiplePropsArray.map(updateSubModelArray(model, muiltiplePropsArray, clientDto, repos))
    const result = await Promise.all(arr)
}

export function updateSubModelArray(model: Model, muiltiplePropsArray: multiArr[], clientDto, repos): any {
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
export function subModelUpdateOrCreateByid(mPropArr, repos, clientDto) {
    return function (subModel) {
        if (!subModel.id) {
            console.log('')
            console.log('______________________create model______________________')
            console.log('')
            return repos[mPropArr.repo].create({
                clientId: clientDto.id,
                ...subModel
            }).then((subModelAfterCreate) => {
                let m = subModelAfterCreate
                if(mPropArr.subModels) {
                    return update(subModelAfterCreate, mPropArr.subModels,subModel,repos)
                }              
            });
        } else if (subModel.id) {
            console.log('')
            console.log('______________________find and update______________________')
            console.log('')
            return repos[mPropArr.repo].findByPk(subModel.id)
                .then((model) => {
                    if (model) {
                        model.set(subModel);
                        return model.save().then((subModelAfterCreate)=> {
                            if(mPropArr.subModels) {
                                return update(subModelAfterCreate, mPropArr.subModels,subModel,repos)
                            }
                        });
                    }
                });

        }
    }
}

export function updateOnePropCallBackOld(model: Model, propsArr: multiArr[], clientDto, repos) {
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
export function updateOnePropCallBack2(model: Model, propsArr: multiArr[], clientDto, repos) {
    return function (propElement: multiArr) {
        if (clientDto[propElement.propName] === null) {
            model[propElement.propName + 'Id'] = null
            return model.save()
        } else if (model[propElement.propName + 'Id'] !== null &&
            clientDto[propElement.propName] !== undefined &&
            (typeof clientDto[propElement.propName] === 'object')) {
            // patch
            console.log('')
            console.log('______________________patch one model______________________')
            console.log('')
            return repos[propElement.repo].findByPk(model[propElement.propName + 'Id'])
                .then((subModel) => {
                    const modelData = {
                        ...clientDto[propElement.propName]
                    };
                    delete modelData.id
                    subModel.set(modelData);
                    return subModel.save();
                })

        } else if (
            model[propElement.propName + 'Id'] === null &&
            clientDto[propElement.propName] !== undefined &&
            (typeof clientDto[propElement.propName] === 'object')
        ) {
            //create
            console.log('')
            console.log('______________________create one model______________________')
            console.log('')
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


export function getStringAttrs(model){
    const rawAttributes = model.rawAttributes
    const result = []
    for(let prop in rawAttributes){
        const isString = rawAttributes[prop].type instanceof DataType.STRING
        isString ? result.push(prop) : null
    }
    return result
}
export function getLikeOrArray(searchString, strAtrr, Op){
    return strAtrr.map((stringProperty) => {
        return {
            [stringProperty]: {
                [Op.like]:`%${searchString}%`
            }
        }
    })
}


export function validateSort(model, getClientDto: FindClientDto): void {
    if (!!getClientDto.sort) {
        const attrs = model.rawAttributes
        getClientDto.sort.forEach((sortEl) => {
            if (!attrs[sortEl.field]) {
                throw new HttpException(`${sortEl.field} - такого поля в модели Client не существует`, HttpStatus.BAD_REQUEST)
            }
        })
    }
}

export function getSortQuery(sort: SortByDto[]) {
    return sort.map((sortEl) => {
        return [sortEl.field, sortEl.sortDir]
    })
}