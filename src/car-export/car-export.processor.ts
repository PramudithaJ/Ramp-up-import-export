import { Processor, Process } from '@nestjs/bull';
import { Job, Queue } from 'bull';
import * as fs from 'fs';
import * as path from 'path';
import { CarExportService } from './car-export.service';
import { CarRecordsService } from 'src/car-records/car-records.service';
import { NotificationService } from 'src/notification/notification.service';

@Processor('export-queue')
export class ExportProcessor {
  constructor(
    private readonly carExportService: CarExportService,
    private readonly carRecordsService: CarRecordsService,
    private readonly notificationService: NotificationService
  ) {}

  @Process('export-queue')
  async handleExportCsvData(job: Job): Promise<string> {
    const { age } = job.data;
    console.log(`Processing exporting for ${age} old vehicles`);
    this.notificationService.sendMessage(
      'VehicleServiceReport',
      `Exporting vehicle report of vehicles ${age} years and older`,
    );
    const Cars = await this.carRecordsService.findByAge(age);
    // console.log("\ncars:", Cars);

    const csvData =  this.carExportService.generateCsv(Cars);
    // console.log("\ncsv data:", csvData);
    await this.delay(3000)
    if (!csvData || csvData.trim() === '') {
      throw new Error('CSV data is empty or invalid.');
    }

    const exportDir = path.join(__dirname, '..', 'exports');
    if (!fs.existsSync(exportDir)) {
      fs.mkdirSync(exportDir);
    }

    const fileName = `vehicles_${age}_years_and_older.csv`;
    const filePath = path.join(exportDir, fileName);

    try {
      fs.writeFileSync(filePath, csvData);
    } catch (error) {
      console.error('Error writing CSV file:', error);
      throw error;
    }

    console.log(`CSV file written successfully to ${filePath}`);
    return filePath;
  }

  private delay(ms: number): Promise<void> {
    console.log("delaying 3 seconds")
    return new Promise(resolve => setTimeout(resolve, ms));
    
}
}
