import { NotFoundException as NotFound } from './notFounded.exception';
import { ForbiddenException as Forbidden } from './forbidden.exception';
import { BadRequestException as BadRequest } from './badRequest.exception';

export const NotFoundException = NotFound;
export const ForbiddenException = Forbidden;
export const BadRequestException = BadRequest;
