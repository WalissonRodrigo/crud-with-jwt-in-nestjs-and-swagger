/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Body,
  Controller,
  Delete,
  Get,
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

@ApiBearerAuth('jwt')
@ApiTags('Team Members')
@UseGuards(JwtAuthGuard)
@Controller('members')
export class TeamMembersController {
  constructor(private teamMemberRepository: TeamMemberRepository) {}

  @Get()
  @ApiOperation({ summary: 'Get all members team' })
  @ApiResponse({
    status: 200,
    description: 'Array with all objects TeamMember',
    type: [CreateTeamMemberBody],
  })
  async findAll() {
    const members = await this.teamMemberRepository.findAll();
    return members;
  }

  @Post()
  @ApiResponse({
    status: 200,
    description: 'Object Team Member created is returned',
    type: CreateTeamMemberBody,
  })
  @ApiBadRequestResponse({
    description: 'Something bad has sended or happened. Verify and try again',
  })
  async create(@Body() body: CreateTeamMemberBody) {
    const { name, function: memberFunction } = body;
    const member = await this.teamMemberRepository.create(name, memberFunction);
    return {
      member,
    };
  }

  @Get(':uuid')
  @ApiResponse({
    status: 200,
    description: 'Object Team Member is returned',
    type: CreateTeamMemberBody,
  })
  @ApiNotFoundResponse({ description: 'Not Found' })
  async findOne(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    const members = await this.teamMemberRepository.findOne(uuid);
    return members;
  }

  @Put(':uuid')
  @ApiResponse({
    status: 200,
    description: 'Object Team Member is returned',
    type: CreateTeamMemberBody,
  })
  @ApiBadRequestResponse({
    description: 'Something bad has sended or happened. Verify and try again',
  })
  @ApiNotFoundResponse({ description: 'Not Found' })
  async update(
    @Param('uuid', new ParseUUIDPipe()) uuid: string,
    @Body() body: CreateTeamMemberBody,
  ) {
    const { name, function: memberFunction } = body;
    const updated = await this.teamMemberRepository.update(uuid, {
      name,
      function: memberFunction,
    });
    return updated;
  }

  @Delete(':uuid')
  @ApiResponse({
    status: 200,
    description: 'List with all team members is returned',
    type: [CreateTeamMemberBody],
  })
  @ApiNotFoundResponse({ description: 'Not Found' })
  async remove(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    const deleted = await this.teamMemberRepository.remove(uuid);
    return deleted;
  }
}
