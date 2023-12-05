import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { EventSchema } from './entities/event.entity';
import { JwtService } from '@nestjs/jwt';
import { JwtHelper } from 'src/auth/helpers';

@Module({
  controllers: [EventsController],
  providers: [EventsService, JwtHelper, JwtService],
  exports: [],
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      {
        name: 'events',
        schema: EventSchema,
      },
    ]),
  ],
})
export class EventsModule {}
