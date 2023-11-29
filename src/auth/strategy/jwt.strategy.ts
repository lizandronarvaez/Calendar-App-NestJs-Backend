import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../interfaces/JwtPayload.interface';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Auth } from '../entities/user.entity';
import { Model } from 'mongoose';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel('users')
    private authModel: Model<Auth>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET_KEY,
    });
  }

  async validate(payload: JwtPayload) {
    const { id } = payload;
    let isAuthenticate = true;
    const user = await this.authModel.findById({ _id: id });
    if (!user) {
      isAuthenticate = false;
      throw new UnauthorizedException('Token no válido');
    }
    return isAuthenticate;
  }
}
