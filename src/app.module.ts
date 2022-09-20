import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { GetPassModule } from './getPass/get-pass/get-pass.module';
import { UserRoles } from './getPass/get-pass/user_roles.model';
import { User } from './getPass/user.model';
import { Role } from './roles/roles/roles.model';
import { RolesModule } from './roles/roles/roles.module';

@Module({
  imports: [
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
      models: [User, Role, UserRoles],
      autoLoadModels: true,
      dialectOptions: {},
    }),
    GetPassModule,
    RolesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
