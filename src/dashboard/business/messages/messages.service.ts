import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class MessagesService {
    constructor(private prisma: PrismaService) { }

    private async getBoothForUser(userId: string) {
        const booth = await this.prisma.booth.findUnique({
            where: { ownerId: userId }
        });
        if (!booth) throw new NotFoundException('Business booth not found for this user');
        return booth;
    }

    async getThreads(userId: string) {
        try {
            const booth = await this.getBoothForUser(userId);

            const threads = await this.prisma.messageThread.findMany({
                where: { boothId: booth.id },
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                            email: true
                        }
                    },
                    messages: {
                        orderBy: { createdAt: 'desc' },
                        take: 1
                    }
                },
                orderBy: { updatedAt: 'desc' }
            });

            return threads.map(thread => {
                const latestMessage = thread.messages[0];
                return {
                    id: thread.id,
                    user: thread.user,
                    latestMessage: latestMessage ? latestMessage.content : null,
                    updatedAt: latestMessage ? latestMessage.createdAt : thread.updatedAt,
                    unread: latestMessage && latestMessage.senderId !== userId && !latestMessage.read
                };
            });
        } catch (error) {
            throw new BadRequestException('Failed to fetch message threads: ' + error.message);
        }
    }

    async getMessages(userId: string, threadId: string) {
        try {
            const booth = await this.getBoothForUser(userId);

            const thread = await this.prisma.messageThread.findUnique({
                where: { id: threadId },
                include: {
                    user: { select: { id: true, name: true } },
                    messages: { orderBy: { createdAt: 'asc' } }
                }
            });

            if (!thread) throw new NotFoundException('Message thread not found');
            if (thread.boothId !== booth.id) throw new ForbiddenException('You do not have access to this thread');

            // Mark unread messages as read
            await this.prisma.message.updateMany({
                where: { threadId, senderId: thread.userId, read: false },
                data: { read: true }
            });

            return thread;
        } catch (error) {
            throw new BadRequestException('Failed to fetch messages: ' + error.message);
        }
    }

    async sendMessage(userId: string, targetUserId: string, content: string) {
        try {
            const booth = await this.getBoothForUser(userId);

            // Find or create the thread
            let thread = await this.prisma.messageThread.findUnique({
                where: { boothId_userId: { boothId: booth.id, userId: targetUserId } }
            });

            if (!thread) {
                thread = await this.prisma.messageThread.create({
                    data: {
                        boothId: booth.id,
                        userId: targetUserId
                    }
                });
            }

            // Create the message
            const message = await this.prisma.message.create({
                data: {
                    threadId: thread.id,
                    senderId: userId, // Business owner is the sender here
                    content
                }
            });

            // Update thread's updatedAt
            await this.prisma.messageThread.update({
                where: { id: thread.id },
                data: { updatedAt: new Date() }
            });

            return message;
        } catch (error) {
            throw new BadRequestException('Failed to send message: ' + error.message);
        }
    }
}
