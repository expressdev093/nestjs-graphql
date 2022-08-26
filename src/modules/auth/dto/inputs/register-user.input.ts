import { InputType, Int, Field } from '@nestjs/graphql';
import { IsAlpha, IsEmail, minLength } from 'class-validator';

@InputType()
export class RegisterUserInput {
  @Field()
  @IsAlpha()
  firstName: string;

  @Field()
  @IsAlpha()
  lastName: string;

  @Field()
  @IsEmail()
  email: string;

  @Field({ nullable: true })
  password?: string;

  @Field()
  role: string;
}
