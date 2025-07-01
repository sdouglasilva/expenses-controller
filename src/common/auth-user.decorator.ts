import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { User } from "@/users/entities/user.entities";


export const AuthUser = createParamDecorator(
  (data:unknown, ctx: ExecutionContext): User =>{
    const request = ctx.switchToHttp().getRequest();
    return request.User
  }
)