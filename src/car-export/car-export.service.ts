import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { createObjectCsvStringifier } from 'csv-writer';
import { CarRecord } from 'src/car-records/entities/car-record.entity';


@Injectable()
export class CarExportService {
    constructor(@InjectQueue('export-queue') private readonly importQueue: Queue ){}
    async addToQueue(age :number): Promise<string> {
        try {
            console.log('Adding to export queue');
            const job = await this.importQueue.add('export-queue', { age });
            console.log('Added to export queue');
            
            
            const result = await job.finished();
            // console.log(result)
            if (!result) {
                throw new Error('Job completed but no file path returned');
            }
    
            return result;
        } catch (error) {
            console.error('Error while processing export job:', error);
            throw error;
        }
    }
    
    
generateCsv(cars: CarRecord[]): string {
    console.log("started generating CSV")
    const csvStringifier = createObjectCsvStringifier({
        header: [
        { id: 'id', title: 'ID' },
        { id: 'firstName', title: 'First Name' },
        { id: 'lastName', title: 'Last Name' },
        {id: 'email', title: 'Email'},
        { id: 'carMake', title: 'Make' },
        { id: 'carModel', title: 'Model' },
        { id: 'vin', title: 'VIN' },
        { id: 'manufacturedDate', title: 'Manufactured Date' },
        { id: 'ageOfVehicle', title: 'Age of Vehicle' },
        ],
    });    

    return csvStringifier.stringifyRecords(cars);

}

}
