import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { TeamMemberRepository } from '../team-member-repository';

@Injectable()
export class PrismaTeamMemberRepository implements TeamMemberRepository {
  constructor(private prisma: PrismaService) {}
  async get() {
    const members = await this.prisma.teamMember.findMany();
    return members;
  }

  async create(name: string, memberFunction: string) {
    const members = await this.prisma.teamMember.create({
      data: {
        name,
        function: memberFunction,
      },
    });
    return members;
  }
}
