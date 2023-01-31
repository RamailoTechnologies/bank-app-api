import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DB, NODE_ENV } from 'config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { BankModule } from './bank/bank.module';
import { AccountModule } from './account/account.module';
import { SmsBankingModule } from './sms-banking/sms-banking.module';
import { OffersModule } from './offers/offers.module';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/ .env.${process.env.NODE_ENV}`,
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      entities: [`${__dirname}/**/*.entity{.ts,.js}`],
      type: 'postgres',
      synchronize: NODE_ENV === 'development',
      host: DB.host,
      database: DB.database,
      username: DB.username,
      password: DB.password,
      port: +DB.port,
    }),
    BankModule,
    AccountModule,
    SmsBankingModule,
    OffersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
