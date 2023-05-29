import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
    getUsers(){
        return [{id:1, name:"летом 2023 года ты уйдешь на химию братан"}]
    }
}