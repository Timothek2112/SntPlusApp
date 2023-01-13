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
    @Get('/all')
    async getAllNews(){
        return;
    }

    @Get('/:id')
    async getNewsById(@Param('id') id: number){
        return;
    }

    @Post()
    async createNews(@Body() dto: NewsDto){
        return this.newsService.createNews(dto);
    }

    @Get('/lastHash')
    async getLastNewsHash(){
        return;
    }

    @Get('/first/:number')
    async getFirstNews(@Param('number') number: number){
        return this.newsService.getFirstNews(number);   
    }
 }
