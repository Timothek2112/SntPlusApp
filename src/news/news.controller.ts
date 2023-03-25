/* eslint-disable prettier/prettier */
/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { NewsDto } from './dto/news.dto';
import { NewsService } from './news.service';

@Controller('news')
export class NewsController {
    constructor(private newsService: NewsService) {}
    @Get('/all/:snt')
    async getAllNews(@Param('snt') snt: number) {
        return this.newsService.getAllNews(snt);
    }

    @Post()
    async createNews(@Body() dto: NewsDto){
        return this.newsService.createNews(dto);
    }

    @Get('/first/:number/:sntId')
    async getFirstNews(@Param('number') number: number,
                        @Param('sntId') sntId: number){
        return this.newsService.getFirstNews(number, sntId);   
    }
 }
