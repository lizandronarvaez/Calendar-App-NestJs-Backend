import { UseGuards, applyDecorators } from '@nestjs/common';
import { Role } from '../rol/rol.enum';
import { Roles } from './roles.decorators';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';

export const Auth_Auto = (...rol: Role[]) => {
  return applyDecorators(
    // Decorador que verifica el rol de el usuario
    Roles(...rol),
    // Decorador para proteger las rutas que verifica si existe el token
    UseGuards(JwtAuthGuard),
  );
};
