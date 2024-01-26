import { createRouter, createWebHistory } from 'vue-router'
import MainView from '../views/MainView.vue'
import TeamSave from '../views/TeamSaveView.vue'
import TeamView from '../views/TeamView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MainView
    },
    {
      path: '/team',
      name: 'team',
      component: TeamSave

    },{
      path: '/teams/:teamNumber',
      name: 'teamsid',
      component: TeamView
    },{
      path: '/teams/',
      name: 'teams',
      component: TeamView
    },
  ]
})

export default router
