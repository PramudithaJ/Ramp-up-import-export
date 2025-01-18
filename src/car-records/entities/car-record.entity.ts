import { Directive, Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@ObjectType()
@Directive('@key(fields: "vin")')
@Entity('car-records')
export class CarRecord {


@Field()
@PrimaryGeneratedColumn('uuid')   
id : string

@Field()
@Column()
firstName : string

@Field()
@Column()
lastName : string

@Field()
@Column()
email : string

@Field()
@Column()
carMake : string

@Field()
@Column()
carModel : string

@Field()
@Column()
vin : string

@Field()
@Column(/*{type: 'date' }*/)
manufacturedDate : Date

@Field()
@Column()
ageOfVehicle : number


}