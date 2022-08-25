import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { Roles } from 'src/modules/auth/decorator/roles.decorator';
import { Role } from 'src/modules/auth/enums/role.enum';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/modules/auth/guards/roles.guard';
import { Public } from '../auth/metadata/public.metadata';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Roles(Role.Admin)
  @Get('user/admin')
  getProtected(@Req() request: Request) {
    return 'Admin api';
  }

  @Public()
  @Get('user/user')
  getPublic(@Req() request: Request) {
    return 'User api';
  }
}
