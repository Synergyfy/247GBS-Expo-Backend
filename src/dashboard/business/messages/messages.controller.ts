import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { JwtAuthGuard } from '../../../auth/jwt-auth.guard';
import { RolesGuard } from '../../../auth/roles.guard';
import { Roles } from '../../../auth/roles.decorator';
import { GetUser } from '../../../auth/get-user.decorator';

@Controller('dashboard/business/messages')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('BUSINESS_OWNER', 'VENDOR')
export class MessagesController {
    constructor(private readonly messagesService: MessagesService) { }

    @Get('threads')
    async getThreads(@GetUser('userId') userId: string) {
        return this.messagesService.getThreads(userId);
    }

    @Get('threads/:id')
    async getThreadMessages(@GetUser('userId') userId: string, @Param('id') threadId: string) {
        return this.messagesService.getMessages(userId, threadId);
    }

    @Post('send')
    async sendMessage(
        @GetUser('userId') userId: string,
        @Body() body: { targetUserId: string; content: string }
    ) {
        return this.messagesService.sendMessage(userId, body.targetUserId, body.content);
    }
}
