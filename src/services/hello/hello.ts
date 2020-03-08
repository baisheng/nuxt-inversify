import HelloInterface from '~/services/hello/hello.interface'
import { injectable } from 'inversify'

@injectable()
class Hello implements HelloInterface {
  world (msg: string): void {
    console.log(`world: ${msg}`)
  }

  everyone (msg: string): void {
    console.log(`everyone: ${msg}`)
  }
}

export { Hello }
