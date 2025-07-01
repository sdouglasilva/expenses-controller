import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import {ExtractJwt, Strategy} from 'passport-jwt';
import { UserPayload } from "../interfaces/user-payload.interface";
import { UsersService } from "@/users/users.service";
import { ConfigService } from "@nestjs/config";
import { User} from "@/users/entities/user.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ){
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET')
    })
  }
  async validate(payload: UserPayload): Promise<User>{
    console.log('--- 1. JWT STRATEGY: validate() FOI ACIONADO ---');
    console.log('Payload do token:', payload);
    const user = await this.usersService.findById(payload.sub);
    console.log('--- 2. USUÁRIO ENCONTRADO PELA STRATEGY ---');
    console.log(user);
    if (!user){
      throw new UnauthorizedException('Token inválido')
    }
    return user;
  }
}