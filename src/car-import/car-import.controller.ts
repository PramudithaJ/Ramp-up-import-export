import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CarImportService } from './car-import.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as fs from 'fs';

@Controller('car-import')
export class CarImportController {

constructor(private readonly carImportService : CarImportService){}

@Post()
@UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
        destination: './Csvs'
    })
}))
async importData(@UploadedFile() file: Express.Multer.File){
    try {
        console.log('Calling addToQueue');
        await this.carImportService.addToQueue(file.path);
        console.log('addToQueue executed');
        
          
      } catch (error) {
        console.error('Error in addToQueue:', error);
      }
}



}
