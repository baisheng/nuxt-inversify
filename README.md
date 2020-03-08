# nuxtjs 依赖注入
准备

安装 
yarn add inversify reflect-metadata vue-inversify-decorator

配置

# nuxt-express-ts

> Nuxt.ts project
> 这是一个 Nuxt + express + typescript 的工程模板，已经配置好一个 Nuxt ts 项目的基本环境要求
>
## 安装与构建

``` bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn run dev

# build for production and launch server
$ yarn run build
$ yarn start

# generate static project
$ yarn run generate
```

For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).
## nuxt-express-ts

## 配置讲解

## **在Nuxt.js v2.11.0 中支持TypeScript和Express.js。**

## 主要环境
- Nuxt.js v2.11.0
- @nuxt/typescript-runtime
- ts-node
- @nuxt/typescript-build
- inversify
- reflect-metadata
- vue-inversify-decorator

> 首先安装以上支持包

## nuxt.config.ts 配置
下面是部分配置

```typescript
import { Configuration } from '@nuxt/types'

const nuxtConfig: Configuration = {
  buildModules: ['@nuxt/typescript-build']
}
module.exports = nuxtConfig
```
然后添加 TypeScript 配置，在 nuxt.config.ts 的任意位置

```typescript
typescript: {
    typeCheck: true,
    ignoreNotFoundWarnings: true
},
```

配置 serverMiddleware

```typescript
serverMiddleware: [
    { path: '/api', handler: '~/server/index.ts' }
]
```

这样config的设定就完成了
最终的完整配置文件如下:

```typescript
import { Configuration } from '@nuxt/types'

const nuxtConfig: Configuration = {
  mode: 'universal',
  buildModules: ['@nuxt/typescript-build'],
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || ' ',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],
  typescript: {
    typeCheck: true,
    ignoreNotFoundWarnings: true
  },
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/eslint-module',
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  },
  serverMiddleware: [
    { path: '/api', handler: '~/server/index.ts' }
  ]
}
module.exports = nuxtConfig
```
## tsconfig.json 的配置
```json
"types": [
    "@types/node",
    "@nuxt/types",
    "@nuxtjs/axios"
]
```

不想使用axios的可以关掉axios。
这样tsconfig.json的配置就完成了。

tsconfig.json 的整体配置

```javascript
{
  "compilerOptions": {
    "target": "esnext",
    "module": "esnext",
    "moduleResolution": "node",
    "lib": [
      "esnext",
      "esnext.asynciterable",
      "dom"
    ],
    "esModuleInterop": true,
    "experimentalDecorators": true,
    "allowJs": true,
    "sourceMap": true,
    "strict": true,
    "noEmit": true,
    "baseUrl": ".",
    "paths": {
      "~/*": [
        "./*"
      ],
      "@/*": [
        "./*"
      ]
    },
    "types": [
      "@types/node",
      "@nuxt/types",
      "@nuxtjs/axios"
    ]
  },
  "exclude": [
    "node_modules"
  ]
}
```

## package.json 的配置
配置启动脚本

```javascript
"scripts": {
    "lint": "eslint --ext .ts,.js,.vue --ignore-path .gitignore .",
    "precommit": "yarn run lint",
    "dev": "nuxt-ts",
    "build": "nuxt-ts build",
    "start": "nuxt-ts start",
    "generate": "nuxt-ts generate"
},
```

## Express 端的配置

**server/index.ts**
```typescript
import express from 'express'
import bodyParser from 'body-parser'
import routes from './api'
const app = express()

app.use(bodyParser.json())
app.use(routes)

module.exports = app
```

Server 端的 api 
**server/api/index.ts**
```typescript
import { Router } from 'express'

import text from './text'

const router = Router()

router.use(text)

export default router
```

Vue文件的脚本
**pages/index.vue**
```typescript
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
@Component({
  components: {
    Logo: () => import('~/components/Logo.vue')
  },
  async asyncData({ $axios }) {
    const data: any = await $axios.$get('api/test')
    return { text: data }
  }
})
class TopPage extends Vue {
}
export default TopPage
</script>
```

以上使用的是vue-property-decorator，也可以使用 nuxt-property-decorator。

这样设定就完成了。

## 总结
Nuxt.js的TypeScript支持感觉还不稳定，随着版本升级也总会有一些细节变化。
给人的印象是事情多。

