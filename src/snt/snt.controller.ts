/*
https://docs.nestjs.com/controllers#controllers
*/
import { Controller, Get, Post, Param } from '@nestjs/common';
import { SntService } from './snt.service';
import { sntDto } from './dto/snt.dto';

@Controller('snt')
export class SntController {
    constructor(private sntService: SntService) {}

    @Get('/:id')
    async getSntById(@Param('id') id: number) {
        return await this.sntService.GetSntById(id);
    }
    
    @Post()
    async postSnt(dto: sntDto) {
        return await this.sntService.PostSnt(dto);
    }
}
