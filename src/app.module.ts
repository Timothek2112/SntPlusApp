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
@Module({
  imports: [
    NewsModule,
    PokazaniaModule,
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: String(process.env.POSTGRES_PASSWORD),
      database: process.env.POSTGRES_DB,
      models: [Users, Role, UserRoles, Pokazania, Debts, Payment, Uchastki],
      autoLoadModels: true,
      dialectOptions: {},
    }),
    GetPassModule,
    RolesModule,
    AuthModule,
  ],
  controllers: [PokazaniaController],
  providers: [],
})
export class AppModule { }
