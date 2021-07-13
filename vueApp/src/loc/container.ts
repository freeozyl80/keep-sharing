// container.ts
import { ContainerInterface, Token, INJECTED, Type } from "./interface";

export class Container implements ContainerInterface {
  private _providers = new Map();

  private getInstanceFromClass<T>(provider: Type<T>): T {
    const target = provider;
    if (target[INJECTED]) {
      const injects = target[INJECTED]!.map(childToken => this.getProvider(childToken));
      return new target(...injects);
    } else {
      if (target.length) {
        throw new Error(
          `Injection error.${target.name} has dependancy injection but,but no @Injectable() decorate it`
        );
      }
      return new target();
    }
  }


  addProvider(token: Token<any>, provider: any) {
    this._providers.set(token, provider);
  }
  getProvider<T>(token: Token<T>): T {
    if (this._providers.has(token)) {
      return this._providers.get(token);
    } else {
      try {
        const instance = this.getInstanceFromClass(token as Type<any>);
        this.addProvider(token, instance);
        return instance;
      } catch(e) {
        console.error(e)
        throw new Error(`${token} is a normal string that cannot be instantiated`);
      }
    }
  }
}
