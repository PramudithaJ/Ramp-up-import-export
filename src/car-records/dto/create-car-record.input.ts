import { Field, InputType, Int} from "@nestjs/graphql";


@InputType()
export class CreateCarRecordInput {

@Field()
firstName : string

@Field()
lastName : string

@Field()
email : string

@Field()
carMake : string

@Field()
carModel : string

@Field()
vin : string

@Field()
manufacturedDate : Date

@Field(()=> Int)
ageOfVehicle : number

}