import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

const message = 'El campo es obligatorio';
const isNotEmail = 'Formato email incorrecto';
const lengthPassword = 'Mínimo de 6 carácteres';

export class CreateAuthDto {
  @IsNotEmpty({ message })
  @Transform((fullname) => fullname.value.toLowerCase().trim())
  fullname: string;

  @IsEmail({}, { message: isNotEmail })
  @IsNotEmpty({ message })
  @Transform((email) => email.value.toLowerCase().trim())
  email: string;

  @IsString({ message })
  @MinLength(6, { message: lengthPassword })
  password: string;
}
