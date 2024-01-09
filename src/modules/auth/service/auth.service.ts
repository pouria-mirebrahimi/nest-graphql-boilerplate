import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  async validateUser(payload) {
    return {
      id: 1,
      name: 'pouria',
      email: 'mirebrahimi@gmail.com',
      roles: ['ADMIN'],
    };
  }
}
