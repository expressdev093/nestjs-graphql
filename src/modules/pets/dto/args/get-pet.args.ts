import { ArgsType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@ArgsType()
export class GetPetArgs {
  @Field()
  @IsNotEmpty()
  id: number;
}
