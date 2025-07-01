import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import {ExtractJwt, Strategy} from 'passport-jwt';
import { UserPayload } from "../interfaces/user-payload.interface";
import { UsersService } from "@/users/users.service";
import { ConfigService } from "@nestjs/config";
import { User} from "@/users/entities/user.entities";

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
    const user = await this.usersService.findById(payload.sub);
    if (!user){
      throw new UnauthorizedException('Token inválido')
    }
    return user;
  }
}