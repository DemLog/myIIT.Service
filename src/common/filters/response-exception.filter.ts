import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class ResponseExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status =
      exception.response?.statusCode || exception.status || exception.code || 500;
    const message = exception.message || 'Internal Server Error';
    const errorResponse: IResponseError = {
      response_code: status,
      data: {},
      error: { message },
    };
    response.status(status).json(errorResponse);
  }
}