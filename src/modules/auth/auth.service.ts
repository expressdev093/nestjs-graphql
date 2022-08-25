import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtSecret } from './constants';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validate(email: string, password: string): Promise<User> {
    const foundUser = await this.usersService.getUserByEmail(email);
    if (foundUser) {
      if (await bcrypt.compare(password, foundUser.password)) {
        const { password, ...result } = foundUser;
        return result;
      }
      return undefined;
    }

    return undefined;
  }

  login(user: User): { access_token: string } {
    const payload = {
      email: user.email,
      sub: user.id,
      role: user.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signup(user: User): Promise<User> {
    return this.usersService.create(user);
  }

  async verify(token: string): Promise<User> {
    const decoded = this.jwtService.verify(token, { secret: jwtSecret });

    const user = this.usersService.getUserByEmail(decoded.email);
    if (!user) {
      throw new Error('Unable to get the user from decoded token');
    }
    return user;
  }
}
