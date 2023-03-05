import { Injectable } from '@nestjs/common';

interface User {
  userId: number;
  username: string;
  password: string;
}

@Injectable()
export class UsersService {
  private readonly users = [
    { userId: 1, username: 'walisson.rodrigo', password: '@password' },
    { userId: 2, username: 'user', password: 'login@user' },
    { userId: 3, username: 'letscode', password: 'lets@123' },
  ];
  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
