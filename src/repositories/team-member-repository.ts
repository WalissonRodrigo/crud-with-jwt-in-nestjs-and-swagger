export abstract class TeamMemberRepository {
  abstract get();
  abstract create(name: string, memberFunction: string);
}
