import { Provide } from '@midwayjs/core';
import { ResponseDTO } from '../dto/response.dto';

@Provide()
export class ResponseService {
  success<T>(
    data: T,
    message: string = 'success',
    code: number = 200
  ): ResponseDTO<T> {
    return { code, message, data };
  }

  fail(message: string, code: number = 500): ResponseDTO<null> {
    return { code, message, data: null };
  }

  unauthorized(): ResponseDTO<null> {
    return this.fail('未授权访问', 401);
  }

  forbidden(): ResponseDTO<null> {
    return this.fail('没有权限', 403);
  }

  notFound(message: string = '资源不存在'): ResponseDTO<null> {
    return this.fail(message, 404);
  }
}
