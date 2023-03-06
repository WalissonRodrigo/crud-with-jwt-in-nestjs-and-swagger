/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateTeamMemberBody } from '../dtos/create-team-member-body';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TeamMemberRepository } from '../repositories/team-member-repository';

class TeamMember extends CreateTeamMemberBody {}

@ApiBearerAuth('jwt')
@ApiTags('Team Members')
@UseGuards(JwtAuthGuard)
@Controller('members')
export class TeamMembersController {
  constructor(private teamMemberRepository: TeamMemberRepository) {}

  @Get()
  @ApiOperation({ summary: 'Get all Team Members' })
  @ApiResponse({
    status: 200,
    description: 'Array with all objects TeamMember',
    type: [TeamMember],
  })
  async findAll() {
    const members = await this.teamMemberRepository.findAll();
    return members;
  }

  @Post()
  @HttpCode(200)
  @ApiOperation({ summary: 'Create a new Team Member' })
  @ApiResponse({
    status: 200,
    description: 'Object Team Member created is returned',
    type: TeamMember,
  })
  @ApiBadRequestResponse({
    description: 'Something bad has sended or happened. Verify and try again',
  })
  async create(@Body() body: TeamMember) {
    const { name, function: memberFunction } = body;
    const member = await this.teamMemberRepository.create(name, memberFunction);
    return member;
  }

  @Get(':uuid')
  @ApiOperation({ summary: 'Get Team Member using your id unique' })
  @ApiResponse({
    status: 200,
    description: 'Object Team Member is returned',
    type: TeamMember,
  })
  @ApiNotFoundResponse({ description: 'Not Found' })
  async findOne(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    const members = await this.teamMemberRepository.findOne(uuid);
    return members;
  }

  @Put(':uuid')
  @ApiOperation({ summary: 'Update fields in Team Member register' })
  @ApiResponse({
    status: 200,
    description: 'Object Team Member is returned',
    type: TeamMember,
  })
  @ApiBadRequestResponse({
    description: 'Something bad has sended or happened. Verify and try again',
  })
  @ApiNotFoundResponse({ description: 'Not Found' })
  async update(
    @Param('uuid', new ParseUUIDPipe()) uuid: string,
    @Body() body: TeamMember,
  ) {
    const { name, function: memberFunction } = body;
    const updated = await this.teamMemberRepository.update(uuid, {
      name,
      function: memberFunction,
    });
    return updated;
  }

  @Delete(':uuid')
  @ApiOperation({ summary: 'Delete permanently record of Team Member' })
  @ApiResponse({
    status: 200,
    description: 'List with all team members is returned',
    type: [TeamMember],
  })
  @ApiNotFoundResponse({ description: 'Not Found' })
  async remove(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    const deleted = await this.teamMemberRepository.remove(uuid);
    return deleted;
  }
}
