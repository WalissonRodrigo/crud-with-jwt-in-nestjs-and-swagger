/* eslint-disable prettier/prettier */
import { IsNotEmpty, Length } from 'class-validator';

export class CreateTeamMemberBody {
  @IsNotEmpty({
    message: 'The team member name should not be empty',
  })
  @Length(5, 100)
  name: string;

  @IsNotEmpty({
    message: 'The team member function should not be empty',
  })
  function: string;
}
