import Vue from 'vue'
import VueRouter from 'vue-router'
import ViewerView from '../views/ViewerView.vue'
import store from '../store'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: ViewerView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
  name: 'viewer',
    path: '/viewer/:name',
    component: ViewerView,
    beforeEnter: (to, from, next) => {
      store.dispatch('setContentType', 'info')
      store.dispatch('loadCase', {
        type: 'puzzles',
        // typeId: to.params.id,
        id: to.params.name
      })
      store.dispatch('setPuzzleId', to.params.name)
      store.dispatch('loadSpecializations')
      store.dispatch('loadCaseResources')
      next()
    },
    beforeRouteUpdate(to, from, next) {
      ViewerView.OpenSeadragon({
        tileSources: `${to.params.name}.dzi`
      }).initialPage()
      ViewerView.OpenSeadragon.Viewer.forceRedraw()
      // location.reload()
      // ViewerView.OpenSeadragon
      // обрабатываем изменение параметров маршрута...
      // не забываем вызвать next()
      next()
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
