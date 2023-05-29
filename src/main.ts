import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
console.log('start')
async function start(){
    const PORT = process.env.PORT || 5000
    const app = await NestFactory.create(AppModule)

    await app.listen(PORT, () => {console.log(`Application started on port = ${PORT}`)})
}
 

start()