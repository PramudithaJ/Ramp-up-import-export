import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BullModule } from '@nestjs/bull';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarExportModule } from './car-export/car-export.module';
import { CarImportModule } from './car-import/car-import.module';
import { CarRecordsModule } from './car-records/car-records.module';
import { CarRecord } from './car-records/entities/car-record.entity';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { CarRecordsService } from './car-records/car-records.service';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'Pramu123',
    database: 'postgres',
    entities: [CarRecord],
    synchronize: true,
  }), BullModule.forRoot({
    redis: {
      host: 'localhost',
      port: 6379,
    },
  }),
      GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
   CarExportModule, CarImportModule, CarRecordsModule, NotificationModule,],
  controllers: [AppController],
  providers: [AppService],
  
})
export class AppModule {}
