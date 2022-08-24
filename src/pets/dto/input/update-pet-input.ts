import { InputType, PartialType, Field, Int } from '@nestjs/graphql';
import { CreatePetInput } from './create-pet.input';

@InputType()
export class UpdatePetInput extends PartialType(CreatePetInput) {
  @Field(() => Int)
  id: number;
}
