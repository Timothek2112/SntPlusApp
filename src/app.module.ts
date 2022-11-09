import { PokazaniaModule } from './pokazania/pokazania.module';
import { PokazaniaController } from './pokazania/pokazania.controller';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { GetPassModule } from './getPass/get-pass.module';
import { UserRoles } from './getPass/user_roles.model';
import { User } from './getPass/user.model';
import { Role } from './roles/roles/roles.model';
import { RolesModule } from './roles/roles/roles.module';
import { AuthModule } from './auth/auth.module';
import { Pokazania } from './pokazania/pokazania.model';
import { PokazaniaUser } from './pokazania/Pokazania_User.model';


@Module({
  imports: [
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
      models: [User, Role, UserRoles, Pokazania, PokazaniaUser],
      autoLoadModels: true,
      dialectOptions: {},
    }),
    GetPassModule,
    RolesModule,
    AuthModule,
  ],
  controllers: [
    PokazaniaController,],
  providers: [],
})
export class AppModule { }
