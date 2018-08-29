import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import TheQuestion from './components/TheQuestion.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [{
        path: '/:id',
        name: 'detailQuestion',
        component: TheQuestion
      }]
    }
  ]
})
