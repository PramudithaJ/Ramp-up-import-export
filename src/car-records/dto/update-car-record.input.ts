import { CreateCarRecordInput } from './create-car-record.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCarRecordInput extends PartialType(CreateCarRecordInput) {
  @Field(() => Int)
  id: number;
}
