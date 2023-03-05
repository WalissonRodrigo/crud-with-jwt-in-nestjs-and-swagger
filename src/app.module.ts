import { MembersModule } from './teamMembers/teamMembers.module';
import { TeamMembersController } from './teamMembers/teamMembers.controller';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaService } from './database/prisma.service';
import { TeamMemberRepository } from './repositories/team-member-repository';
import { PrismaTeamMemberRepository } from './repositories/prisma/prisma-team-member-repository';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [MembersModule, AuthModule, UsersModule],
  controllers: [TeamMembersController, AppController],
  providers: [
    PrismaService,
    {
      provide: TeamMemberRepository,
      useClass: PrismaTeamMemberRepository,
    },
  ],
})
export class AppModule {}
