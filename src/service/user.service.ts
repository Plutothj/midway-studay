import { Inject, Provide } from '@midwayjs/core';
import { prisma } from '../prisma/prisma.service';
import { CreateUserDTO, LoginUserDTO } from '../dto/user.dto';
import { compare, hash } from 'bcryptjs';
import { ResponseService } from './response.service';

@Provide()
export class UserService {
  @Inject()
  responseService: ResponseService;

  async createUser(data: CreateUserDTO) {
    console.log(data);
    // 先判断是否存在对应的用户名和邮箱
    const existingUser = await prisma.users.findFirst({
      where: {
        OR: [{ username: data.username }, { email: data.email }],
      },
    });
    if (existingUser) {
      return this.responseService.fail('用户名或邮箱已存在');
    }

    const hashedPassword = await hash(data.password, 10);

    const user = await prisma.users.create({
      data: {
        username: data.username,
        password_hash: hashedPassword,
        email: data.email,
        // 其他字段按需添加
      },
    });
    return this.responseService.success(user);
  }

  async login(data: LoginUserDTO) {
    const user = await prisma.users.findFirst({
      where: { email: data.email },
    });
    console.log(user);

    // if (!user) {
    //   return this.responseService.fail('用户不存在');
    // }

    // const isPasswordValid = await compare(data.password, user.password_hash);

    // if (!isPasswordValid) {
    //   return this.responseService.fail('密码错误');
    // }

    return this.responseService.success(user);
  }
}
