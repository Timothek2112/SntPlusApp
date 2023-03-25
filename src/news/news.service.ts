/* eslint-disable prettier/prettier */
/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { NewsDto } from './dto/news.dto';
import { News } from './models/News.model';

@Injectable()
export class NewsService {
    constructor(
        @InjectModel(News) private newsRepository: typeof News,
    ) {}

    async createNews(dto: NewsDto){
        return await this.newsRepository.create(dto);
    }

    async getFirstNews(number: number, sntId: number){
        const news = await this.newsRepository.findAll({
             where: { SntId: sntId },
             order: [['id', 'DESC']]
             });
        const result = []
        for(let i = 0; i < number; i++){
            if(news[i] != null){
                result.push({
                    title: news[i].title,
                    full_text: news[i].full_text,
                    date: news[i].date,
                })
            }
        }        
        return result
    }

    async getAllNews(snt: number){
        return await this.newsRepository.findAll({ where: { SntId: snt }});
    }
 }
