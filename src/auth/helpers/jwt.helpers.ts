import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../interfaces/JwtPayload.interface';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class JwtHelper {
  constructor(private jwtservice: JwtService) {}

  generateTokenJwt(payload: JwtPayload) {
    const token = this.jwtservice.sign(payload);
    return token;
  }

  isValidToken(authorization: string) {
    if (!authorization) {
      throw new UnauthorizedException('No existe token');
    }
    const token = authorization.split(' ')[1];
    try {
      const tokenIsValid = this.jwtservice.verify(token, {
        secret: process.env.SECRET_KEY,
      });

      return tokenIsValid;
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException('El token no es válido');
    }
  }
}
