import { PrismaService } from '../../../prisma/prisma.service';
import { CreateBoothDto } from './dto/create-booth.dto';
import { UpdateBoothDto } from './dto/update-booth.dto';
export declare class BoothService {
    private prisma;
    constructor(prisma: PrismaService);
    setupBooth(ownerId: string, data: CreateBoothDto): Promise<{
        id: string;
        email: string | null;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        logo: string | null;
        banner: string | null;
        phoneNumber: string | null;
        website: string | null;
        location: string | null;
        category: string | null;
        contactName: string | null;
        contactTitle: string | null;
        publicEmail: string | null;
        phoneDisplay: string | null;
        tagline: string | null;
        ownerId: string;
        settlementRule: string;
        autoPayout: boolean;
    }>;
    updateBooth(ownerId: string, data: UpdateBoothDto): Promise<{
        id: string;
        email: string | null;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        logo: string | null;
        banner: string | null;
        phoneNumber: string | null;
        website: string | null;
        location: string | null;
        category: string | null;
        contactName: string | null;
        contactTitle: string | null;
        publicEmail: string | null;
        phoneDisplay: string | null;
        tagline: string | null;
        ownerId: string;
        settlementRule: string;
        autoPayout: boolean;
    }>;
    getMyBooth(ownerId: string): Promise<{
        products: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            category: import("@prisma/client").$Enums.ProductCategory;
            boothId: string;
            status: import("@prisma/client").$Enums.ProductStatus;
            price: import("@prisma/client/runtime/library").Decimal;
            image: string | null;
            sku: string | null;
            stock: number;
            substituteId: string | null;
        }[];
    } & {
        id: string;
        email: string | null;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        logo: string | null;
        banner: string | null;
        phoneNumber: string | null;
        website: string | null;
        location: string | null;
        category: string | null;
        contactName: string | null;
        contactTitle: string | null;
        publicEmail: string | null;
        phoneDisplay: string | null;
        tagline: string | null;
        ownerId: string;
        settlementRule: string;
        autoPayout: boolean;
    }>;
    getBoothById(id: string): Promise<{
        products: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            category: import("@prisma/client").$Enums.ProductCategory;
            boothId: string;
            status: import("@prisma/client").$Enums.ProductStatus;
            price: import("@prisma/client/runtime/library").Decimal;
            image: string | null;
            sku: string | null;
            stock: number;
            substituteId: string | null;
        }[];
    } & {
        id: string;
        email: string | null;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        logo: string | null;
        banner: string | null;
        phoneNumber: string | null;
        website: string | null;
        location: string | null;
        category: string | null;
        contactName: string | null;
        contactTitle: string | null;
        publicEmail: string | null;
        phoneDisplay: string | null;
        tagline: string | null;
        ownerId: string;
        settlementRule: string;
        autoPayout: boolean;
    }>;
    getAllBooths(): Promise<({
        owner: {
            email: string;
            name: string | null;
        };
    } & {
        id: string;
        email: string | null;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        logo: string | null;
        banner: string | null;
        phoneNumber: string | null;
        website: string | null;
        location: string | null;
        category: string | null;
        contactName: string | null;
        contactTitle: string | null;
        publicEmail: string | null;
        phoneDisplay: string | null;
        tagline: string | null;
        ownerId: string;
        settlementRule: string;
        autoPayout: boolean;
    })[]>;
    getDashboardStats(userId: string): Promise<{
        stats: {
            label: string;
            val: string;
            trend: string;
            isUp: boolean;
        }[];
        completion: {
            percentage: number;
            tasks: {
                label: string;
                completed: boolean;
            }[];
        };
        schedule: {
            time: string;
            title: string;
            status: string;
        }[];
    }>;
}
