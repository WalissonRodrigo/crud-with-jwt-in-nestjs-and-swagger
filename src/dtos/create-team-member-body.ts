/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export class CreateTeamMemberBody {
  @ApiProperty({
    example: '5909aaee-5d40-46d4-bf4a-e38314a77827',
    description: 'This field is unique string using UUID pattern.',
  })
  id: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'The complete name of member of team',
  })
  @IsNotEmpty({
    message: 'The team member name should not be empty',
  })
  @Length(5, 100)
  name: string;

  @ApiProperty({
    example: 'Tecnical enginee of team',
    description: 'The role within the team that is performed',
  })
  @IsNotEmpty({
    message: 'The team member function should not be empty',
  })
  function: string;
}
