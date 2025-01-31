import { Module } from '@nestjs/common';
import { CarExportService } from './car-export.service';
import { CarExportController } from './car-export.controller';
import { BullModule } from '@nestjs/bull';
import { ExportProcessor } from './car-export.processor';
import { CarRecordsService } from 'src/car-records/car-records.service';
import { CarRecordsModule } from 'src/car-records/car-records.module';
import { NotificationModule } from 'src/notification/notification.module';

@Module({
  controllers: [CarExportController],
  providers: [CarExportService,ExportProcessor],
  imports: [BullModule.registerQueue({
    name:'export-queue'
  }),CarRecordsModule,NotificationModule],
  exports:[CarExportService]
})
export class CarExportModule {}
