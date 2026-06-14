import { IsNotEmpty, IsUUID } from "class-validator";

export class CreateAppointmentDto {
  
  // @IsNotEmpty()
  // @IsUUID()
  // userId: string;

  @IsNotEmpty()
  appointmentDate: Date;

  @IsNotEmpty()
  startTime: string;

  @IsNotEmpty()
  endTime: string;

  status?: string;
}
