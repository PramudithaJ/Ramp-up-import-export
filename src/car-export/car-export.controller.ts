import { Controller, Get, Param,Res } from '@nestjs/common';
import { CarExportService } from './car-export.service';
import path from 'path';
import { Response } from 'express';
import { delay } from 'rxjs';

@Controller('car-export')
export class CarExportController {
  constructor(private readonly carExportService: CarExportService) {}

  @Get('/:age')
  async exportCsvByAge(@Param('age') age: number , @Res() res: Response) {
    console.log("called from controller")
    
    const filepath = await this.carExportService.addToQueue(age);
    res.download(filepath.toString() , (err) => {
      if (err) {
        console.error('Error while sending the file:', err);
        res.status(500).send('Failed to download the file');
      }
    });
    
  }

}



