import { IsEmail, IsString, MaxLength } from "class-validator";

export class CreateUserDto {
  @IsString()
  @MaxLength(255)
  readonly username: string;

  @IsEmail()
  @IsString()
  @MaxLength(255)
  readonly email: string;
  
  @IsString()
  @MaxLength(50)
  readonly provider: string;
  
  @IsString()
  @MaxLength(255)
  readonly provider_id: string;
  
  @IsString()
  readonly refresh_token: string;
  
  @IsString()
  readonly access_token: string;
}