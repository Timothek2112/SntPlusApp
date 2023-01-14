/* eslint-disable prettier/prettier */
/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { NewsDto } from './dto/news.dto';
import { News } from './models/News.model';
import { resourceLimits } from 'worker_threads';

@Injectable()
export class NewsService {
    constructor(
        @InjectModel(News) private newsRepository: typeof News,
    ) {}

    async createNews(dto: NewsDto){
        return await this.newsRepository.create(dto);
    }

    async getFirstNews(number: number){
        const news = await this.newsRepository.findAll({order: ['id', 'DESC']})
        const result = []
        for(let i = 0; i < number; i++){
            result.push(news[i])
        }        
        return result
    }

    async getAllNews(){
        return await this.newsRepository.findAll();
    }
 }
