import { Controller, Post, Body, Get, Patch, UseGuards, Param } from '@nestjs/common';
import { BoothService } from './booth.service';
import { JwtAuthGuard } from '../../../auth/jwt-auth.guard';
import { GetUser } from '../../../auth/get-user.decorator';
import { CreateBoothDto } from './dto/create-booth.dto';
import { UpdateBoothDto } from './dto/update-booth.dto';

@Controller('business')
export class BoothController {
    constructor(private boothService: BoothService) { }

    @Post('booth/setup')
    @UseGuards(JwtAuthGuard)
    async setupBooth(@GetUser('userId') userId: string, @Body() data: CreateBoothDto) {
        return this.boothService.setupBooth(userId, data);
    }

    @Patch('booth/update')
    @UseGuards(JwtAuthGuard)
    async updateBooth(@GetUser('userId') userId: string, @Body() data: UpdateBoothDto) {
        return this.boothService.updateBooth(userId, data);
    }

    @Get('booth/me')
    @UseGuards(JwtAuthGuard)
    async getMyBooth(@GetUser('userId') userId: string) {
        return this.boothService.getMyBooth(userId);
    }

    @Get('booth/:id')
    async getBoothById(@Param('id') id: string) {
        return this.boothService.getBoothById(id);
    }

    @Get('booths')
    async getAllBooths() {
        return this.boothService.getAllBooths();
    }

    @Get('stats')
    @UseGuards(JwtAuthGuard)
    async getDashboardStats(@GetUser('userId') userId: string) {
        return this.boothService.getDashboardStats(userId);
    }
}
