import { Vue, Component } from 'nuxt-property-decorator'
import { TYPES } from '~/configs/di/types'
import { HelloInterface } from '~/configs/di/interfaces'
// import { myContainer } from '~/configs/di/inversify.config'
import { Inject } from 'vue-inversify-decorator'
// const container = myContainer.get<HelloInterface>(TYPES.HelloInterface)
// container.world('Hello...')

@Component({
  components: {
    Logo: () => import('~/components/Logo.vue')
  },
  async asyncData ({ $axios }) {
    const data: any = await $axios.$get('api/test')
    return { text: data }
  }
})
class TopPage extends Vue {
  @Inject(TYPES.HelloInterface) private userInterface!: HelloInterface
  mounted (): void {
    this.userInterface.everyone('i think...')
    const container = this.$di.get<HelloInterface>(TYPES.HelloInterface)
    container.world('hi...')
  }
}
export default TopPage
