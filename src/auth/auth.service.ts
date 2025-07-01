import { ConflictException, Injectable } from '@nestjs/common';
import { UsersService } from '@/users/users.service';
import { RegisterDto } from './dto/register.dto';
@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService){}
  async register(registerDto:RegisterDto){
    try{
      const user = await this.userService.create(registerDto);
      return user;
    } catch(error){
      if(error.code === "23505"){
        throw new ConflictException('Este email já está em uso')
      }
      throw error

    }
  }
}
