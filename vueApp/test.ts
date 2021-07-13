import { Container } from './src/loc/container'
import { Injectable } from './src/loc/inject';

@Injectable()
class AuthService {
  name = 'authService'
}
@Injectable()
class RouterService {
  name = 'routerService'
  constructor(private authService: AuthService){
    console.log(authService)
  }
}

const container = new Container()
const routerService = container.getProvider(RouterService)

console.log(routerService)