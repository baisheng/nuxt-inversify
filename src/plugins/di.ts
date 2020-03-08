import { myContainer } from '~/configs/di/inversify.config'

export default ({}, inject) => {
  inject('di', myContainer)
}
