import { Inject, Controller, Body, Post } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { UserService } from '../service/user.service';
import { CreateUserDTO } from '../dto/user.dto';
import { Validate } from '@midwayjs/validate';

@Controller('/users')
export class UsersController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  @Post('/register')
  @Validate({ errorStatus: 400 })
  async register(@Body() body: CreateUserDTO) {
    const user = await this.userService.createUser(body);
    return user;
  }
}
