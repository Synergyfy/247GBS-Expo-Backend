import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class SupportService {
    constructor(private prisma: PrismaService) { }

    private async getBoothForUser(userId: string) {
        const booth = await this.prisma.booth.findUnique({
            where: { ownerId: userId }
        });
        if (!booth) throw new NotFoundException('Business booth not found for this user');
        return booth;
    }

    /** Start a new live support chat session */
    async startChatSession(userId: string, subject: string) {
        try {
            const booth = await this.getBoothForUser(userId);

            const session = await this.prisma.supportChatSession.create({
                data: {
                    boothId: booth.id,
                    subject,
                    status: 'OPEN'
                },
                include: { messages: true }
            });

            return session;
        } catch (error) {
            throw new BadRequestException('Failed to start support chat: ' + error.message);
        }
    }

    /** List all support chat sessions for the business */
    async getChatSessions(userId: string) {
        try {
            const booth = await this.getBoothForUser(userId);

            return this.prisma.supportChatSession.findMany({
                where: { boothId: booth.id },
                include: {
                    messages: {
                        orderBy: { createdAt: 'desc' },
                        take: 1
                    }
                },
                orderBy: { updatedAt: 'desc' }
            });
        } catch (error) {
            throw new BadRequestException('Failed to fetch chat sessions: ' + error.message);
        }
    }

    /** Get a specific chat session with all messages */
    async getChatSession(userId: string, sessionId: string) {
        try {
            const booth = await this.getBoothForUser(userId);

            const session = await this.prisma.supportChatSession.findUnique({
                where: { id: sessionId },
                include: { messages: { orderBy: { createdAt: 'asc' } } }
            });

            if (!session) throw new NotFoundException('Support chat session not found');
            if (session.boothId !== booth.id) throw new ForbiddenException('Access denied');

            return session;
        } catch (error) {
            throw new BadRequestException('Failed to fetch chat session: ' + error.message);
        }
    }

    /** Send a message in a support chat session */
    async sendMessage(userId: string, sessionId: string, content: string) {
        try {
            const booth = await this.getBoothForUser(userId);

            const session = await this.prisma.supportChatSession.findUnique({
                where: { id: sessionId }
            });

            if (!session) throw new NotFoundException('Support chat session not found');
            if (session.boothId !== booth.id) throw new ForbiddenException('Access denied');
            if (session.status === 'CLOSED') throw new BadRequestException('This support session is closed');

            const message = await this.prisma.supportChatMessage.create({
                data: {
                    sessionId,
                    senderType: 'BUSINESS',
                    content
                }
            });

            // Bump session updatedAt
            await this.prisma.supportChatSession.update({
                where: { id: sessionId },
                data: { updatedAt: new Date() }
            });

            return message;
        } catch (error) {
            throw new BadRequestException('Failed to send message: ' + error.message);
        }
    }

    /** Close a support chat session */
    async closeChatSession(userId: string, sessionId: string) {
        try {
            const booth = await this.getBoothForUser(userId);

            const session = await this.prisma.supportChatSession.findUnique({
                where: { id: sessionId }
            });

            if (!session) throw new NotFoundException('Support chat session not found');
            if (session.boothId !== booth.id) throw new ForbiddenException('Access denied');

            return this.prisma.supportChatSession.update({
                where: { id: sessionId },
                data: { status: 'CLOSED' }
            });
        } catch (error) {
            throw new BadRequestException('Failed to close session: ' + error.message);
        }
    }
}
