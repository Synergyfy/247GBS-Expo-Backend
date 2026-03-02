import { PrismaService } from '../../../prisma/prisma.service';
export declare class SupportService {
    private prisma;
    constructor(prisma: PrismaService);
    private getBoothForUser;
    startChatSession(userId: string, subject: string): Promise<{
        messages: {
            id: string;
            createdAt: Date;
            sessionId: string;
            content: string;
            senderType: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        boothId: string;
        status: string;
        subject: string;
    }>;
    getChatSessions(userId: string): Promise<({
        messages: {
            id: string;
            createdAt: Date;
            sessionId: string;
            content: string;
            senderType: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        boothId: string;
        status: string;
        subject: string;
    })[]>;
    getChatSession(userId: string, sessionId: string): Promise<{
        messages: {
            id: string;
            createdAt: Date;
            sessionId: string;
            content: string;
            senderType: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        boothId: string;
        status: string;
        subject: string;
    }>;
    sendMessage(userId: string, sessionId: string, content: string): Promise<{
        id: string;
        createdAt: Date;
        sessionId: string;
        content: string;
        senderType: string;
    }>;
    closeChatSession(userId: string, sessionId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        boothId: string;
        status: string;
        subject: string;
    }>;
}
