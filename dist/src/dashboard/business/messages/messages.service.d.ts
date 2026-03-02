import { PrismaService } from '../../../prisma/prisma.service';
export declare class MessagesService {
    private prisma;
    constructor(prisma: PrismaService);
    private getBoothForUser;
    getThreads(userId: string): Promise<{
        id: string;
        user: {
            id: string;
            email: string;
            name: string | null;
        };
        latestMessage: string | null;
        updatedAt: Date;
        unread: boolean;
    }[]>;
    getMessages(userId: string, threadId: string): Promise<{
        user: {
            id: string;
            name: string | null;
        };
        messages: {
            id: string;
            createdAt: Date;
            threadId: string;
            senderId: string;
            content: string;
            read: boolean;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        boothId: string;
    }>;
    sendMessage(userId: string, targetUserId: string, content: string): Promise<{
        id: string;
        createdAt: Date;
        threadId: string;
        senderId: string;
        content: string;
        read: boolean;
    }>;
}
