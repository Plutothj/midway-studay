import { Catch, Context } from '@midwayjs/core';
import { MidwayValidationError } from '@midwayjs/validate';

@Catch(MidwayValidationError) // 明确只捕获 Validate 错误
export class ValidationFilter {
  async catch(err: MidwayValidationError, ctx: Context) {
    return {
      code: 400,
      message: '参数校验失败',
      data: err.cause.message, // 返回具体的字段错误信息
    };
  }
}
