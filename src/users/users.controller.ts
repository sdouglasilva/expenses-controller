import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthUser } from '@/common/auth-user.decorator';
import { User } from './entities/user.entities';
import { UsersService } from './users.service';
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService) {}
  
  @Get('Me')
  @UseGuards(AuthGuard('jwt'))
  getMe(@AuthUser()user: User){
    return user;
  }

}
