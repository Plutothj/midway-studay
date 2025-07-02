import { MidwayConfig } from '@midwayjs/core';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1751434695516_5642',
  koa: {
    port: 7001,
    globalPrefix: '/api',
  },
} as MidwayConfig;
