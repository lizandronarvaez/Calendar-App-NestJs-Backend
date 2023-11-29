import { Transform, Type } from 'class-transformer';
import { IsNotEmpty, IsDate } from 'class-validator';

const message = 'El campo es obligatorio';
const dateNotValid = 'Formato fecha inválida';

export class UpdateEventDto {
  @IsNotEmpty({ message })
  @Transform((fullname) => fullname.value.toLowerCase().trim())
  client: string;

  @IsNotEmpty({ message })
  @Transform((fullname) => fullname.value.toLowerCase().trim())
  service: string;

  @IsNotEmpty({ message })
  @IsDate({ message: dateNotValid })
  @Type(() => Date)
  start: Date;

  @IsNotEmpty({ message })
  @IsDate({ message: dateNotValid })
  @Type(() => Date)
  end: Date;
}
