import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { Auth_Auto } from 'src/auth/decorators/auth.decorators';
import { Role } from 'src/auth/rol/rol.enum';
import { CreateEventDto, UpdateEventDto } from './dto';
import { EventsService } from './events.service';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Auth_Auto(Role.User)
  @Post()
  createEvent(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.create(createEventDto);
  }

  @Auth_Auto(Role.User)
  @Get()
  findAllEvents() {
    return this.eventsService.findAll();
  }

  @Auth_Auto(Role.User)
  @Get(':id')
  findOneEvent(@Param('id') id: string) {
    return this.eventsService.findOne(id);
  }

  @Auth_Auto(Role.User)
  @Patch(':id')
  updateEvent(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventsService.update(id, updateEventDto);
  }

  @Auth_Auto(Role.User)
  @Delete(':id')
  removeEvent(@Param('id') id: string) {
    return this.eventsService.remove(id);
  }
}
