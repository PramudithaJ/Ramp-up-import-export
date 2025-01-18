import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';


@Injectable()
export class CarImportService {
    constructor(@InjectQueue('import-queue') private readonly importQueue: Queue ){}
    async addToQueue(filepath : string): Promise<void> {
        console.log("adding to queue")
        await this.importQueue.add('import-queue',{filepath})
        console.log("adding to queue")
    }

}