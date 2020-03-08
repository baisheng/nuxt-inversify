import 'reflect-metadata'
import { Container } from 'inversify'
import { TYPES } from './types'
import {
  HelloInterface
} from '~/configs/di/interfaces'
import { Hello } from '~/services/hello'
import UserInterface from '~/services/user/user.interface'
import { User } from '~/services/user/user'
const myContainer = new Container()
myContainer.bind<HelloInterface>(TYPES.HelloInterface).to(Hello)
myContainer.bind<UserInterface>(TYPES.UserInterface).to(User)
export { myContainer }
