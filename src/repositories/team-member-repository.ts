export abstract class TeamMemberRepository {
  abstract findAll();
  abstract findOne(id: string);
  abstract create(name: string, memberFunction: string);
  abstract update(id: string, CreateTeamMemberBody: object);
  abstract remove(id: string);
}
