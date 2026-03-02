import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
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
}
