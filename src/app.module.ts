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

@Module({
  imports: [
    SheduleModule,
    AppealModule,
    NewsModule,
    PokazaniaModule,
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    ScheduleModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: String(process.env.POSTGRES_PASSWORD),
      database: process.env.POSTGRES_DB,
      models: [
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
  controllers: [
    SheduleController, PokazaniaController],
  providers: [],
})
export class AppModule { }
