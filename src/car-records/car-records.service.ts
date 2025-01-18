import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateCarRecordInput } from './dto/create-car-record.input';
import { InjectRepository } from '@nestjs/typeorm';
import { CarRecord } from './entities/car-record.entity';
import { MoreThanOrEqual, Repository } from 'typeorm';

@Injectable()
export class CarRecordsService implements OnModuleInit{

  constructor(@InjectRepository(CarRecord) private readonly carRepository:Repository<CarRecord>){}
  onModuleInit() {
    // this.findByAge(10)
  }

  createCarRecord(createCarRecordInput: CreateCarRecordInput): Promise<CarRecord> {
    const newCarRecord = this.carRepository.create(createCarRecordInput)
    return this.carRepository.save(newCarRecord);
}

async findByAge(age: number): Promise<CarRecord[]> {
  console.log("find by age called");
  const carRecords = await this.carRepository.find({
    where: { ageOfVehicle: MoreThanOrEqual(age) },
  });
  // console.log("car records:", carRecords);
  return carRecords;
}
 
}
