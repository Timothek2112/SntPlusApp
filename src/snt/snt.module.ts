import { SntService } from './snt.service';
import { SntController } from './snt.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { SNT } from './model/snt.model';

@Module({
    imports: [SequelizeModule.forFeature([SNT])],
    controllers: [
        SntController,],
    providers: [
        SntService,],
})
export class SntModule { }
