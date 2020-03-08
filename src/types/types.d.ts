import Vue, { ComponentOptions } from 'vue'
// 指定要增加类型的文件
// Vue的构造函数类型是 `types/Vue.d.ts`
import { Container } from 'inversify'

declare module 'vue/types/vue' {
  interface Vue {
    $di: Container,
    // $container: Container,
  }
}
