import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { LoginUser } from 'src/auth/decorators/login-user.decorator';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post()
  async create(
    @LoginUser('userId') userId: string,
    @Body() createAppointmentDto: CreateAppointmentDto,
  ) {
    return  await this.appointmentsService.create(createAppointmentDto, userId);
  }

}
