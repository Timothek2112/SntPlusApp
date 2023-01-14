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
<<<<<<< HEAD
        return;
=======
        return this.newsService.getAllNews();
>>>>>>> 31ec98622898e8164c4e6ee159e10ce6ec4289f6
    }

    @Post()
    async createNews(@Body() dto: NewsDto){
        return this.newsService.createNews(dto);
    }

    @Get('/first/:number')
    async getFirstNews(@Param('number') number: number){
        return this.newsService.getFirstNews(number);   
    }
 }
