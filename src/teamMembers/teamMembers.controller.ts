/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateTeamMemberBody } from '../dtos/create-team-member-body';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TeamMemberRepository } from '../repositories/team-member-repository';

@Controller()
export class TeamMembersController {
  constructor(private teamMemberRepository: TeamMemberRepository) {}
  @UseGuards(JwtAuthGuard)
  @Get('members')
  async getMembers() {
    const members = await this.teamMemberRepository.get();
    return members;
  }

  @Post('member')
  async createMember(@Body() body: CreateTeamMemberBody) {
    const { name, function: memberFunction } = body;
    const member = await this.teamMemberRepository.create(name, memberFunction);
    return {
      member,
    };
  }
}
