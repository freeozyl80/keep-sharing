import 'reflect-metadata';
type Constructor<T = any> = new (...args: any[]) => T;

const Injectable = (): ClassDecorator => target => { 
  console.log(target)
};

class AuthService {
  token = 'LDAPTOKEN';
}

@Injectable()
class RouterService {
  constructor(public readonly authService: AuthService) {}

  testMethod() {
    console.log(this.authService.token);
  }
}

const Factory = <T>(target: Constructor<T>): T => {
  // 获取所有注入的服务
  const providers = Reflect.getMetadata('design:paramtypes', target); // [AuthService]
  const args = providers.map((provider: Constructor) => new provider());
  return new target(...args);
};

Factory(RouterService).testMethod();