import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '@/users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService} from '@nestjs/jwt';
import { UserPayload } from './interfaces/user-payload.interface';
import { access } from 'fs';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService){}

  async register(registerDto:RegisterDto){
    try{
      const user = await this.usersService.create(registerDto);
      return user;
    } catch(error){
      if(error.code === "23505"){
        throw new ConflictException('Este email já está em uso')
      }
      throw error

    }
  }
  async login(loginDto:LoginDto): Promise<{ accessToken: string }>{
    const {email, password} = loginDto

    const user = await this.usersService.findByEmail(email);
    if(!user){
      throw new UnauthorizedException('Credenciais inválidas')
    }
    const isPasswordMatching = await bcrypt.compare(password,user.password);
    if(!isPasswordMatching){
      throw new UnauthorizedException('Credenciais inválidas');
    }
    const payload: UserPayload = {sub: user.id, email: user.email}
    const accessToken = this.jwtService.sign(payload);
    
    return {accessToken}
  }
}
