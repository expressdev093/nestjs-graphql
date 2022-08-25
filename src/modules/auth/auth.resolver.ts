import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginUserInput } from './dto/inputs/login-user.input';
import { LoginResponse } from './dto/login-response';
import { GqlLocalAuthGuard } from './guards/gql-local-auth.guard';
import { Public } from './metadata/public.metadata';

@Public()
@Resolver(() => LoginResponse)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(GqlLocalAuthGuard)
  @Mutation(() => LoginResponse)
  login(
    @Args('loginUserInput') loginUserInput: LoginUserInput,
    @Context() context,
  ) {
    return this.authService.login(context.user);
  }
}
