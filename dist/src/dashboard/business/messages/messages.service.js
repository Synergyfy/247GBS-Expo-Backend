"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
let MessagesService = class MessagesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getBoothForUser(userId) {
        const booth = await this.prisma.booth.findUnique({
            where: { ownerId: userId }
        });
        if (!booth)
            throw new common_1.NotFoundException('Business booth not found for this user');
        return booth;
    }
    async getThreads(userId) {
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
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to fetch message threads: ' + error.message);
        }
    }
    async getMessages(userId, threadId) {
        try {
            const booth = await this.getBoothForUser(userId);
            const thread = await this.prisma.messageThread.findUnique({
                where: { id: threadId },
                include: {
                    user: { select: { id: true, name: true } },
                    messages: { orderBy: { createdAt: 'asc' } }
                }
            });
            if (!thread)
                throw new common_1.NotFoundException('Message thread not found');
            if (thread.boothId !== booth.id)
                throw new common_1.ForbiddenException('You do not have access to this thread');
            await this.prisma.message.updateMany({
                where: { threadId, senderId: thread.userId, read: false },
                data: { read: true }
            });
            return thread;
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to fetch messages: ' + error.message);
        }
    }
    async sendMessage(userId, targetUserId, content) {
        try {
            const booth = await this.getBoothForUser(userId);
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
            const message = await this.prisma.message.create({
                data: {
                    threadId: thread.id,
                    senderId: userId,
                    content
                }
            });
            await this.prisma.messageThread.update({
                where: { id: thread.id },
                data: { updatedAt: new Date() }
            });
            return message;
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to send message: ' + error.message);
        }
    }
};
exports.MessagesService = MessagesService;
exports.MessagesService = MessagesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MessagesService);
//# sourceMappingURL=messages.service.js.map