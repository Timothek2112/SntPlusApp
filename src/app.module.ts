import { LoggerModule } from './logger/logger.module';
import { SntModule } from './snt/snt.module';
import { SheduleModule } from './shedule/shedule.module';
import { SheduleController } from './shedule/shedule.controller';
import { AppealModule } from './appeal/appeal.module';
import { NewsModule } from './news/news.module';
import { PokazaniaModule } from './pokazania/pokazania.module';
import { PokazaniaController } from './pokazania/pokazania.controller';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { GetPassModule } from './getPass/get-pass.module';
import { UserRoles } from './getPass/models/user_roles.model';
import { Users } from './getPass/models/user.model';
import { Role } from './roles/roles/models/roles.model';
import { RolesModule } from './roles/roles/roles.module';
import { AuthModule } from './auth/auth.module';
import { Pokazania } from './pokazania/models/pokazania.model';
import { Debts } from './pokazania/models/debts.model';
import { Payment } from './pokazania/models/payments.model';
import { Uchastki } from './getPass/models/uchastki.model';
import { appeal } from './appeal/models/appeal.model';
import { News } from './news/models/News.model';
import { answer } from './appeal/models/answer.model';
import { ScheduleModule } from '@nestjs/schedule';
import { SNT } from './snt/model/snt.model';
import { Rates } from './pokazania/models/rates.model';

@Module({
  imports: [
    LoggerModule,
    SntModule,
    SheduleModule,
    AppealModule,
    NewsModule,
    PokazaniaModule,
    SntModule,
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    ScheduleModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.MYSQL_HOST,
      port: Number(process.env.MYSQL_PORT),
      username: process.env.MYSQL_USER,
      password: String(process.env.MYSQL_PASSWORD),
      database: process.env.MYSQL_DB,
      models: [
        Rates,
        SNT,
        Users,
        Role,
        UserRoles,
        Pokazania,
        Debts,
        Payment,
        Uchastki,
        News,
        appeal,
        answer,
      ],
      autoLoadModels: true,
      dialectOptions: {},
    }),
    GetPassModule,
    RolesModule,
    AuthModule,
  ],
  controllers: [SheduleController, PokazaniaController],
  providers: [],
})
export class AppModule {}
