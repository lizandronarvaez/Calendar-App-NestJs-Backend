import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Auth } from './entities/user.entity';
import { JwtHelper, comparePassword } from './helpers';
import { CreateAuthDto, LoginAuthDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('users')
    private authModel: Model<Auth>,
    private jwtHelper: JwtHelper,
  ) {}

  async user_create(createAuthDto: CreateAuthDto) {
    try {
      const user = await this.authModel.create(createAuthDto);
      const result = await user.save();

      const token = this.jwtHelper.generateTokenJwt({
        id: result._id,
        email: result.email,
        roles: result.roles,
      });
      return {
        user: {
          fullname: user.fullname,
          email: user.email,
          token,
        },
      };
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async user_login(loginAuthDto: LoginAuthDto) {
    const { email, password } = loginAuthDto;
    const user = await this.authModel.findOne({ email });

    if (!user) {
      throw new UnauthorizedException('Email no registrado o incorrecto');
    }
    const passwordIsValid = comparePassword(password, user.password);
    if (!passwordIsValid) {
      throw new UnauthorizedException('Contraseña incorrecta');
    }
    const token = this.jwtHelper.generateTokenJwt({
      id: user._id,
      email: user.email,
      roles: user.roles,
    });
    return {
      user: {
        id: user._id,
        email: user.email,
        fullname: user.fullname,
        token,
      },
    };
  }

  async user_reset(authorization: string) {
    const tokenIsValid = await this.jwtHelper.isValidToken(authorization);
    const { id, email } = tokenIsValid;

    try {
      const { _id, fullname, roles } = await this.authModel.findOne({ email });

      const renewToken = this.jwtHelper.generateTokenJwt({
        id,
        email,
        roles,
      });

      return {
        id: _id,
        fullname,
        token: renewToken,
      };
    } catch (error) {
      throw new NotFoundException('Hubo un error al generar el token');
    }
  }

  //manejador de erroes
  private handleExceptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException('Ya existe un usuario en la base de datos');
    }
    throw new InternalServerErrorException(
      'No se puede crear el Usuario - Check server logs',
    );
  }
}
