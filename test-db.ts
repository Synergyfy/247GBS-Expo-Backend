const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

async function main() {
    const prisma = new PrismaClient();
    try {
        console.log('Attempting to connect to Prisma...');
        await prisma.$connect();
        console.log('Successfully connected to Prisma!');
        const usersCount = await prisma.user.count();
        console.log('Number of users:', usersCount);
    } catch (e) {
        console.error('Error during Prisma test:', e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
