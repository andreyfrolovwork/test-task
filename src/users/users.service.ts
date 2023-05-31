import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./users.table";
import { CreateUserDto } from "./dto/create-user.dto";
import seqts from 'sequelize-typescript'
import sequelize from "sequelize";

@Injectable()
export class UsersService {
    constructor(@InjectModel(User) private userRepository: typeof User) {}

    async createUser(dto: CreateUserDto) {
        const user = await this.userRepository.create(dto)
        const query = await this.userRepository.sequelize.query('select * from users;')
        return user
    }

    async getAllUsers() {
        const users = await this.userRepository.findAll()
        return users
    }
}