import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { User } from '../users/entities/user.entity';
import { AuthService } from './auth.service';
import { LoginUserInput } from './dto/inputs/login-user.input';
import { RegisterUserInput } from './dto/inputs/register-user.input';
import { LoginResponse } from './dto/login-response';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Public } from './metadata/public.metadata';

@Public()
@Resolver(() => User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Mutation(() => LoginResponse)
  login(
    @Args('loginUserInput') loginUserInput: LoginUserInput,
    @Context() context,
  ) {
    return this.authService.login(context.user);
  }

  @Mutation(() => User)
  async register(
    @Args('registerUserInput') registerUserInput: RegisterUserInput,
  ) {
    const user = await this.authService.signup(registerUserInput as User);
    const { password, ...restUser } = user;
    return restUser;
  }
}
