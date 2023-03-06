/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export class LoginUser {
  @ApiProperty({
    example: 'letscode',
    description: 'Username for authentication',
  })
  @IsNotEmpty({
    message: 'Username is required',
  })
  @Length(4, 100)
  username: string;

  @ApiProperty({
    example: 'lets@123',
    description: 'Password for authentication',
  })
  @IsNotEmpty({
    message: 'Password is required',
  })
  password: string;
}
