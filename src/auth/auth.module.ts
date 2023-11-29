import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthSchema } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtHelper } from './helpers/jwt.helpers';
import { JwtStrategy } from './strategy/jwt.strategy';
import { EventSchema } from 'src/events/entities/event.entity';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtHelper, JwtStrategy],
  exports: [PassportModule, JwtStrategy, JwtModule],
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      {
        name: 'users',
        schema: AuthSchema,
      },
      {
        name: 'events',
        schema: EventSchema,
      },
    ]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [],
      inject: [],
      useFactory: () => {
        return {
          secret: process.env.SECRET_KEY,
          signOptions: {
            expiresIn: '2h',
          },
        };
      },
    }),
  ],
})
export class AuthModule {}
