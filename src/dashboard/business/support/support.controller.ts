import { Controller, Get, Post, Patch, Param, Body, UseGuards } from '@nestjs/common';
import { SupportService } from './support.service';
import { JwtAuthGuard } from '../../../auth/jwt-auth.guard';
import { RolesGuard } from '../../../auth/roles.guard';
import { Roles } from '../../../auth/roles.decorator';
import { GetUser } from '../../../auth/get-user.decorator';

@Controller('dashboard/business/support')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('BUSINESS_OWNER', 'VENDOR')
export class SupportController {
    constructor(private readonly supportService: SupportService) { }

    /** POST /dashboard/business/support/chat — Start a new support chat session */
    @Post('chat')
    async startChat(
        @GetUser('userId') userId: string,
        @Body() body: { subject: string }
    ) {
        return this.supportService.startChatSession(userId, body.subject);
    }

    /** GET /dashboard/business/support/chat — List all chat sessions */
    @Get('chat')
    async getChats(@GetUser('userId') userId: string) {
        return this.supportService.getChatSessions(userId);
    }

    /** GET /dashboard/business/support/chat/:id — Get one session + messages */
    @Get('chat/:id')
    async getChat(
        @GetUser('userId') userId: string,
        @Param('id') id: string
    ) {
        return this.supportService.getChatSession(userId, id);
    }

    /** POST /dashboard/business/support/chat/:id/messages — Send a message */
    @Post('chat/:id/messages')
    async sendMessage(
        @GetUser('userId') userId: string,
        @Param('id') id: string,
        @Body() body: { content: string }
    ) {
        return this.supportService.sendMessage(userId, id, body.content);
    }

    /** PATCH /dashboard/business/support/chat/:id/close — Close a session */
    @Patch('chat/:id/close')
    async closeChat(
        @GetUser('userId') userId: string,
        @Param('id') id: string
    ) {
        return this.supportService.closeChatSession(userId, id);
    }
}
