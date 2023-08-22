import prismaClient from '../../prisma'
import {hash} from 'bcryptjs'


interface UserRequest{
    name: string;
    email: string
    password: string
}

class CreateUserService{
    async execute({name, email, password}: UserRequest) {

        //verifica se ele envio um email

        if(!email){
            throw new Error("Email incorreto!")
        }

        //verifica se esse email já existe cadastrado na plataforma

        const userAlreadyExist = await prismaClient.user.findFirst({
            where:{
                email: email
            }
        })

        if(userAlreadyExist){
            throw new Error("Endereço de email já existe cadastrado no sistema!")
        }

        const passwordHash = await hash(password, 8)

        const user = await prismaClient.user.create({
            data:{
                name: name,
                email: email,
                password: passwordHash
            },
            select:{
                id: true,
                name: true,
                email: true
            }
        })

        return(user)
    }
}

export{CreateUserService}