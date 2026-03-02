import { SettingsService } from './settings.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { AssignStaffDto } from '../operations/dto/assign-staff.dto';
export declare class SettingsController {
    private readonly settingsService;
    constructor(settingsService: SettingsService);
    getProfile(userId: string): Promise<{
        user: {
            id: string;
            email: string;
            name: string | null;
            role: import("@prisma/client").$Enums.Role;
        } | null;
        booth: {
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
        };
    }>;
    updateProfile(userId: string, data: UpdateProfileDto): Promise<{
        user: {
            id: string;
            email: string;
            name: string | null;
            role: import("@prisma/client").$Enums.Role;
        } | null;
        booth: {
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
        };
    }>;
    getTeam(userId: string): Promise<({
        scanners: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            type: string;
            boothId: string;
            status: string;
            eventId: string;
            deviceId: string;
            battery: string | null;
            assignedStaff: string | null;
            lastSeen: Date;
            staffId: string | null;
        }[];
    } & {
        id: string;
        name: string;
        role: string;
        createdAt: Date;
        updatedAt: Date;
        boothId: string;
        status: string;
        eventId: string;
        zone: string;
    })[]>;
    addTeamMember(userId: string, data: AssignStaffDto): Promise<{
        id: string;
        name: string;
        role: string;
        createdAt: Date;
        updatedAt: Date;
        boothId: string;
        status: string;
        eventId: string;
        zone: string;
    }>;
    removeTeamMember(userId: string, id: string): Promise<{
        id: string;
        name: string;
        role: string;
        createdAt: Date;
        updatedAt: Date;
        boothId: string;
        status: string;
        eventId: string;
        zone: string;
    }>;
    getIntegrations(userId: string): Promise<{
        category: string;
        integrations: {
            name: string;
            status: string;
            type: string;
        }[];
    }[]>;
    getAuditLogs(userId: string): Promise<{
        id: string;
        type: string;
        title: string;
        detail: string;
        timestamp: Date;
        status: string;
    }[]>;
}
