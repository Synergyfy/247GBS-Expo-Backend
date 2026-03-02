import { MessagesService } from './messages.service';
export declare class MessagesController {
    private readonly messagesService;
    constructor(messagesService: MessagesService);
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
    getThreadMessages(userId: string, threadId: string): Promise<{
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
    sendMessage(userId: string, body: {
        targetUserId: string;
        content: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        threadId: string;
        senderId: string;
        content: string;
        read: boolean;
    }>;
}
