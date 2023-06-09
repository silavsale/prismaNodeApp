import { PrismaClient } from '@prisma/client'
import { log } from 'console'
const prisma = new PrismaClient()

async function main() {
    // const user = await prisma.user.create({data: {name: "Joe"}})
    // console.log(user);

    const deletedUsers = await prisma.user.deleteMany()
    // console.log('deletedUsers count', deletedUsers.count);  
    
    const user = await prisma.user.create({
        data: { 
            name: 'Sergo',
            email: 'Sergo@test.ca',
            age: 35,
            userPreference: {
                create: {
                    emailUpdates: true,
                }
            }
        },   
        include: {
            userPreference: true,
        }
    })

    console.log('user', user)

    const users = await prisma.user.findMany()
    console.log("find users", users);   
}

main().catch(e => {
    console.log(e.message);
    
}).finally(async () => {
    await prisma.$disconnect()
})