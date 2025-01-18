import { Processor, Process } from '@nestjs/bull';
import { Job, Queue } from 'bull';
import * as fs from 'fs';
import * as path from 'path';
import { CarExportService } from './car-export.service';
import { CarRecordsService } from 'src/car-records/car-records.service';

@Processor('export-queue')
export class ExportProcessor {

  constructor( private readonly carExportService:CarExportService, private readonly carRecordsService:CarRecordsService
  ) {}



  @Process('export-queue')
  async handleExportCsvData(job: Job): Promise<string> {
    const { age } = job.data;
    console.log(`Processing exporting for ${age} old vehicles`);
    
    const Cars = await this.carRecordsService.findByAge(age);
    // console.log("\ncars:", Cars);
  
    const csvData = this.carExportService.generateCsv(Cars);
    // console.log("\ncsv data:", csvData);
  
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
}


