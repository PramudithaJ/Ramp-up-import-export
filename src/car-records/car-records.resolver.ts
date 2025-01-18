import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CarRecordsService } from './car-records.service';
import { CarRecord } from './entities/car-record.entity';
import { CreateCarRecordInput } from './dto/create-car-record.input';


@Resolver(() => CarRecord)
export class CarRecordsResolver {
  constructor(private readonly carRecordsService: CarRecordsService) {}
  
  @Query(() => String)
  helloWorld() {
    return 'Hello, world!';
  }


  @Query(()=> [CarRecord])
  findAllbyAge(@Args('age')age:number){
    return this.carRecordsService.findByAge(age)
  }


  @Mutation(() => CarRecord)
  createCarRecord(@Args('createCarRecordInput') createCarRecordInput: CreateCarRecordInput) {
    return this.carRecordsService.createCarRecord(createCarRecordInput);
  }

}
