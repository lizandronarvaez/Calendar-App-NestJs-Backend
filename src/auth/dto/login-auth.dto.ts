import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

const message = 'El campo es obligatorio';
const isNotEmail = 'Formato email incorrecto';

export class LoginAuthDto {
  @IsEmail({}, { message: isNotEmail })
  @IsNotEmpty({ message })
  @Transform((email) => email.value.toLowerCase().trim())
  email: string;

  @IsString({ message })
  @IsNotEmpty({ message })
  password: string;
}
