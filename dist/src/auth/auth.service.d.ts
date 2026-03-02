import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    register(data: any): Promise<{
        id: string;
        email: string;
        name: string | null;
        role: import("@prisma/client").$Enums.Role;
        qrCode: string | null;
        createdAt: Date;
        updatedAt: Date;
        referrerId: string | null;
    }>;
    login(data: any): Promise<{
        access_token: string;
        user: {
            id: string;
            email: string;
            name: string | null;
            role: import("@prisma/client").$Enums.Role;
        };
    }>;
    validateUser(payload: any): Promise<{
        id: string;
        email: string;
        password: string;
        name: string | null;
        role: import("@prisma/client").$Enums.Role;
        qrCode: string | null;
        createdAt: Date;
        updatedAt: Date;
        referrerId: string | null;
    } | null>;
}
