import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { LoginUser } from './dtos/login-user';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  @ApiTags('Login')
  @ApiOperation({ summary: 'Authenticate with usernam and password' })
  @ApiResponse({
    status: 200,
    description:
      'Object with Bearer token to authentication in APIs in this server.',
  })
  @ApiParam({
    name: 'password',
    required: true,
    example: 'lets@123',
    schema: { anyOf: [{ type: 'string' }] },
  })
  @ApiParam({
    name: 'username',
    required: true,
    example: 'letscode',
    schema: { anyOf: [{ type: 'string' }] },
  })
  @ApiBody({ type: LoginUser })
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
