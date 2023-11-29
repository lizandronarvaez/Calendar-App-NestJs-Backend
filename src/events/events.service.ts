import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Event } from './entities/event.entity';
import mongoose, { Model } from 'mongoose';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel('events')
    private eventsModel: Model<Event>,
  ) {}

  async create(createEventDto: CreateEventDto) {
    try {
      const events = await this.eventsModel.create(createEventDto);
      const res = await events.save();
      return res;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async findAll() {
    try {
      const events = await this.eventsModel.find();
      return events;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async findOne(id: string) {
    const _id = new mongoose.Types.ObjectId(id);
    const event = await this.eventsModel.findById({ _id });
    if (!event) throw new NotFoundException('Cita no encontrada');
    return event;
  }

  async update(id: string, updateEventDto: UpdateEventDto) {
    const _id = new mongoose.Types.ObjectId(id);

    const eventOld = await this.findOne(id);
    if (!eventOld) {
      throw new NotFoundException('Cita no encontrada');
    }

    const newEvent = await this.eventsModel.findByIdAndUpdate(
      _id,
      updateEventDto,
      { new: true },
    );

    return newEvent;
  }

  async remove(id: string) {
    const event = await this.findOne(id);
    if (!event) throw new NotFoundException('Cita no encontrada');
    await this.eventsModel.findByIdAndDelete(event._id);
    return 'Cita eliminada';
  }

  private handleExceptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException('Ya existe una cita');
    }
    throw new InternalServerErrorException('Check server logs');
  }
}
