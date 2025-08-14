import { IsEmail, IsOptional, IsString, IsUrl, Length } from 'class-validator';

export class SignUpDto {
  @IsString()
  @Length(2, 30)
  username: string;

  @IsString()
  @IsOptional()
  @Length(2, 200)
  about: string;

  @IsUrl()
  @IsOptional()
  avatar: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
