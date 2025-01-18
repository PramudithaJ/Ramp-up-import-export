import { Process, Processor } from "@nestjs/bull";
import { Job } from "bull";
import * as fs from 'fs';
import * as csv from 'csv-parser';
import { CarRecordsService } from "src/car-records/car-records.service";


@Processor('import-queue')
export class ImportProcessor {
  constructor(private readonly carsRecordService: CarRecordsService) {}

  @Process('import-queue')
  async handleImportJob(job: Job): Promise<void> {
    console.log('Processing job:', job.id);
    const { filepath } = job.data;
    try {
      const records = await this.parseFile(filepath);
      console.log('Parsing records');

      for (const record of records) {
        const ageOfVehicle = this.calculateAgeofVehicle(record.manufacturedDate);
        await this.carsRecordService.createCarRecord({
          ...record,
          ageOfVehicle,
        });
      }
    } catch (error) {
      console.error('Error processing job:', error);
    } finally {
      fs.unlink(filepath, (err) => {

        if (err) {
          console.error(err)
          return err
        }
      }
    )
    console.log("file deleted after recording to database")
    }

  }

  private async parseFile(filepath: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const records: any[] = [];
      fs.createReadStream(filepath)
        .pipe(csv())
        .on('data', (data) => records.push(data))
        .on('end', () => resolve(records))
        .on('error', (error) => {
          console.error('Error reading CSV file:', error);
          reject(error);
        });
    });
  }

  private calculateAgeofVehicle(manuDate: string | Date): number {
    const currentYear = new Date().getFullYear();
    const manuYear = new Date(manuDate).getFullYear();

    if (isNaN(manuYear)) {
      throw new Error(`Invalid manufactured date: ${manuDate}`);
    }

    return currentYear - manuYear;
  }
}
