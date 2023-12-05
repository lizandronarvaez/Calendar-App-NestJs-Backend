import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { ROLES_KEY } from '../decorators/roles.decorators';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {
    super();
  }

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.getAllAndOverride(ROLES_KEY, [
      context.getHandler(),
      context.getClass,
    ]);
    // Accede a la informacion de el usuario
    const { rawHeaders } = context.switchToHttp().getRequest();
    const token = rawHeaders[1].split(' ')[1];
    const user = this.jwtService.verify(token, {
      secret: process.env.SECRET_KEY,
    });
    // Si no hay roles o si role incluye user
    if (!roles) return true;
    if (roles.some((rol: string) => user.roles.includes(rol))) return true;

    throw new UnauthorizedException(
      'No autorizado, hable con el administrador',
    );
  }
}
