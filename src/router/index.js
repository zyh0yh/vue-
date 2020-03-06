import Vue from 'vue'
import Router from 'vue-router'
// 将pos引入
import Pos from '@/components/pages/Pos'
import dianpu from '@/components/pages/dianpu'

Vue.use(Router)

export default new Router({
  linkExactActiveClass:'active',
  routes: [
      // 挂载 路由,
    {
      path: '/',
      name: 'Pos',
      component: Pos
    },
    {
      path: '/dianpu',
      name: 'dianpu',
      component: dianpu
    }
  ]
})
