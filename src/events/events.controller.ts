import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  //! TODO: Todas las rutas deberan esta protegidas
  @UseGuards(AuthGuard('jwt'))
  @Post()
  createEvent(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.create(createEventDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAllEvents() {
    return this.eventsService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOneEvent(@Param('id') id: string) {
    return this.eventsService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  updateEvent(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventsService.update(id, updateEventDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  removeEvent(@Param('id') id: string) {
    console.log(id);
    return this.eventsService.remove(id);
  }
}
