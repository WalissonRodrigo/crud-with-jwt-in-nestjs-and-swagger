import { PrismaService } from 'src/database/prisma.service';
import { TeamMembersController } from './teamMembers.controller';
import { Module } from '@nestjs/common';
import { TeamMemberRepository } from 'src/repositories/team-member-repository';
import { PrismaTeamMemberRepository } from 'src/repositories/prisma/prisma-team-member-repository';

@Module({
  controllers: [TeamMembersController],
  providers: [
    PrismaService,
    {
      provide: TeamMemberRepository,
      useClass: PrismaTeamMemberRepository,
    },
  ],
  exports: [MembersModule],
})
export class MembersModule {}
/*
    https://docs.nestjs.com/modules
*/
