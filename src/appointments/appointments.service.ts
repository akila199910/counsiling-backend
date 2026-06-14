import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from './entities/appointment.entity';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { AppointmentStatus } from './appoinment.enum';


@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentRepository: Repository<Appointment>,
  ) {}

  async create(createAppointmentDto: CreateAppointmentDto, userId: string | undefined) {

    const existingAppointment = await this.appointmentRepository.findOne({
      where: {
        appointmentDate: createAppointmentDto.appointmentDate,
        userId: userId,
      },
    });

    if(existingAppointment) {
      throw new ConflictException('An appointment already exists for the specified date and user.');
    }

    const appointment = this.appointmentRepository.create({
      ...createAppointmentDto,
      userId,
      status: AppointmentStatus.PENDING, // Set default status to PENDING
    });

    return await this.appointmentRepository.save(appointment);
  }
}
