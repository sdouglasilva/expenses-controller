import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '@/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategies';
@Module({
  imports: [
    forwardRef(()=> UsersModule),
    PassportModule,
    JwtModule.registerAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory:(configService:ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions:{
          expiresIn:process.env.JWT_EXPIRES_IN
        },
      }),
    }),
  ], 
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy]
  })
export class AuthModule {}
