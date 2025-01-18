import { Module } from '@nestjs/common';
import { CarRecordsService } from './car-records.service';
import { CarRecordsResolver } from './car-records.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarRecord } from './entities/car-record.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([CarRecord])
  ],
  providers: [CarRecordsService, CarRecordsResolver],
  exports:[CarRecordsService]
})
export class CarRecordsModule {}
