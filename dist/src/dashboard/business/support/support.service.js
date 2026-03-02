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
exports.SupportService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
let SupportService = class SupportService {
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
    async startChatSession(userId, subject) {
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
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to start support chat: ' + error.message);
        }
    }
    async getChatSessions(userId) {
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
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to fetch chat sessions: ' + error.message);
        }
    }
    async getChatSession(userId, sessionId) {
        try {
            const booth = await this.getBoothForUser(userId);
            const session = await this.prisma.supportChatSession.findUnique({
                where: { id: sessionId },
                include: { messages: { orderBy: { createdAt: 'asc' } } }
            });
            if (!session)
                throw new common_1.NotFoundException('Support chat session not found');
            if (session.boothId !== booth.id)
                throw new common_1.ForbiddenException('Access denied');
            return session;
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to fetch chat session: ' + error.message);
        }
    }
    async sendMessage(userId, sessionId, content) {
        try {
            const booth = await this.getBoothForUser(userId);
            const session = await this.prisma.supportChatSession.findUnique({
                where: { id: sessionId }
            });
            if (!session)
                throw new common_1.NotFoundException('Support chat session not found');
            if (session.boothId !== booth.id)
                throw new common_1.ForbiddenException('Access denied');
            if (session.status === 'CLOSED')
                throw new common_1.BadRequestException('This support session is closed');
            const message = await this.prisma.supportChatMessage.create({
                data: {
                    sessionId,
                    senderType: 'BUSINESS',
                    content
                }
            });
            await this.prisma.supportChatSession.update({
                where: { id: sessionId },
                data: { updatedAt: new Date() }
            });
            return message;
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to send message: ' + error.message);
        }
    }
    async closeChatSession(userId, sessionId) {
        try {
            const booth = await this.getBoothForUser(userId);
            const session = await this.prisma.supportChatSession.findUnique({
                where: { id: sessionId }
            });
            if (!session)
                throw new common_1.NotFoundException('Support chat session not found');
            if (session.boothId !== booth.id)
                throw new common_1.ForbiddenException('Access denied');
            return this.prisma.supportChatSession.update({
                where: { id: sessionId },
                data: { status: 'CLOSED' }
            });
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to close session: ' + error.message);
        }
    }
};
exports.SupportService = SupportService;
exports.SupportService = SupportService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SupportService);
//# sourceMappingURL=support.service.js.map