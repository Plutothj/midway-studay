import { Rule, RuleType } from '@midwayjs/validate';

export class CreateUserDTO {
  @Rule(RuleType.string().required())
  username: string;

  @Rule(RuleType.string().required())
  email: string;

  @Rule(RuleType.string().required())
  password: string;

  @Rule(RuleType.string().optional())
  role?: string;
}
export class LoginUserDTO {
  @Rule(RuleType.string().email().required())
  email: string;

  @Rule(RuleType.string().required())
  password: string;
}
