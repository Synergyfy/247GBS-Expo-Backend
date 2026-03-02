import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    constructor() {
        // Ensure DATABASE_URL is available for the internal Prisma engine
        if (!process.env.DATABASE_URL) {
            require('dotenv').config();
        }
        super();
    }

    async onModuleInit() {
        await this.$connect();
    }
}