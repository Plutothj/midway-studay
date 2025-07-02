import { Aspect, IMethodAspect, JoinPoint } from '@midwayjs/core';
import { ResponseDTO } from '../dto/response.dto';
import { UsersController } from '../controller/users.controller';

@Aspect([UsersController])
export class ResponseAspect implements IMethodAspect {
  async afterReturn(joinPoint: JoinPoint, result: any) {
    if (this.isStandardResponse(result)) {
      return result;
    }

    return {
      code: 200,
      message: 'success',
      data: result,
    };
  }

  private isStandardResponse(res: any): res is ResponseDTO {
    return (
      res &&
      typeof res === 'object' &&
      'code' in res &&
      'message' in res &&
      'data' in res
    );
  }
}
