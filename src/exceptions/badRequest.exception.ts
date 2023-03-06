import { HttpException, HttpStatus } from '@nestjs/common';

export class BadRequestException extends HttpException {
  constructor() {
    super(
      'Something bad has sended or happened. Verify and try again',
      HttpStatus.BAD_REQUEST,
    );
  }
}
