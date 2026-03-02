import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) { }

    async register(data: any) {
        const existingUser = await this.prisma.user.findUnique({
            where: { email: data.email },
        });

        if (existingUser) {
            throw new ConflictException('Email already exists');
        }

        const { password, ...userData } = data;
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await this.prisma.user.create({
            data: {
                ...userData,
                password: hashedPassword,
            },
        });

        const { password: _, ...result } = user;
        return result;
    }

    async login(data: any) {
        const user = await this.prisma.user.findUnique({
            where: { email: data.email },
        });

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isPasswordValid = await bcrypt.compare(data.password, user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = { email: user.email, sub: user.id, role: user.role };
        return {
            access_token: this.jwtService.sign(payload),
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
            },
        };
    }

    async validateUser(payload: any) {
        return await this.prisma.user.findUnique({
            where: { id: payload.sub },
        });
    }
}
