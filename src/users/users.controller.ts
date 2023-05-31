import { Body, Controller, Get, Post } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";

@Controller('users')
export class UsersController {

    constructor(private userService:UsersService) {}

    @Post()
    create(@Body() userDto: any) {
        console.log('post on users')
        console.log(userDto)
        console.log(typeof userDto)
        return this.userService.createUser(userDto)
    }

    @Get()
    getAll(){
        return this.userService.getAllUsers()
    }
}