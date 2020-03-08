import { inject, injectable } from 'inversify'
import UserInterface from '~/services/user/user.interface'
import HelloInterface from '~/services/hello/hello.interface'
import { TYPES } from '~/configs/di/types'
@injectable()
class User implements UserInterface {
  private _hello: HelloInterface

  public constructor (
    @inject(TYPES.HelloInterface) hello: HelloInterface
  ) {
    this._hello = hello
  }

  think (something: string) {
    this._hello.world(something)
  }
}

export { User }
