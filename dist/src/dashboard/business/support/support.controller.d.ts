import { SupportService } from './support.service';
export declare class SupportController {
    private readonly supportService;
    constructor(supportService: SupportService);
    startChat(userId: string, body: {
        subject: string;
    }): Promise<{
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
    getChats(userId: string): Promise<({
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
    getChat(userId: string, id: string): Promise<{
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
    sendMessage(userId: string, id: string, body: {
        content: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        sessionId: string;
        content: string;
        senderType: string;
    }>;
    closeChat(userId: string, id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        boothId: string;
        status: string;
        subject: string;
    }>;
}
