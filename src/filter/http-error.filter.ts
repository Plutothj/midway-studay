import { Catch, Context, MidwayHttpError } from '@midwayjs/core';

@Catch(MidwayHttpError)
export class HttpErrorFilter {
  async catch(err: MidwayHttpError, ctx: Context) {
    const errorResponse = {
      code: err.status,
      message: err.message || 'Internal Server Error',
      data: null,
    };

    // 可选：记录日志
    ctx.logger.error(`[GlobalException] ${err.message}`, err.stack);

    return errorResponse;
  }
}
