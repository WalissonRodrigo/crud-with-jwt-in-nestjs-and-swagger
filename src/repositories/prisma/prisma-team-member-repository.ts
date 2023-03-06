import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { TeamMemberRepository } from '../team-member-repository';
import { BadRequestException, NotFoundException } from 'src/exceptions';
import { Debug } from 'src/logs/debug.log';

@Injectable()
export class PrismaTeamMemberRepository implements TeamMemberRepository {
  constructor(private prisma: PrismaService) {}
  async findAll() {
    const members = await this.prisma.teamMember.findMany();
    return members;
  }
  async findOne(id: string) {
    try {
      const members = await this.prisma.teamMember.findFirst({
        where: {
          id,
        },
      });
      if (!members.id) throw new NotFoundException();
      return members;
    } catch (error) {
      throw new NotFoundException();
    }
  }
  async create(name: string, memberFunction: string) {
    try {
      const members = await this.prisma.teamMember.create({
        data: {
          name,
          function: memberFunction,
        },
      });
      return members;
    } catch (error) {
      throw new BadRequestException();
    }
  }
  async update(id: string, CreateTeamMemberBody: object) {
    try {
      const member = await this.prisma.teamMember.update({
        where: {
          id,
        },
        data: { ...CreateTeamMemberBody },
      });
      Debug({
        type: 'Member',
        id,
        action: 'Updated',
        description: JSON.stringify(CreateTeamMemberBody),
      });
      return member;
    } catch (error) {
      throw new NotFoundException();
    }
  }
  async remove(id: string) {
    try {
      await this.prisma.teamMember.delete({
        where: {
          id,
        },
      });
      Debug({ type: 'Member', id, action: 'Removed' });
      return this.findAll();
    } catch (error) {
      throw new NotFoundException();
    }
  }
}
