import { Configuration, App } from '@midwayjs/core';
import * as koa from '@midwayjs/koa';
import * as validate from '@midwayjs/validate';
import * as info from '@midwayjs/info';
import { join } from 'path';
// import { DefaultErrorFilter } from './filter/default.filter';
// import { NotFoundFilter } from './filter/notfound.filter';

import { ReportMiddleware } from './middleware/report.middleware';
import { HttpErrorFilter } from './filter/http-error.filter';
import { prisma } from './prisma/prisma.service';
import { ValidationFilter } from './filter/validation.filter';

@Configuration({
  imports: [
    koa,
    validate,
    {
      component: info,
      enabledEnvironment: ['local'],
    },
  ],
  importConfigs: [join(__dirname, './config')],
})
export class MainConfiguration {
  @App('koa')
  app: koa.Application;

  async onReady() {
    // add middleware

    await prisma.$connect();
    this.app.useMiddleware([ReportMiddleware]);
    // add filter
    this.app.useFilter([HttpErrorFilter, ValidationFilter]);
  }

  async onStop() {
    await prisma.$disconnect();
  }
}
