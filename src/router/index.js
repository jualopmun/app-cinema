import Vue from "vue"
import VueRouter from "vue-router"
import { MainView, ListMovies } from "@/views"

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    component: MainView,
    children: [
      {
        path: '/movies',
        component: ListMovies,
      },
	
    ]
  },
	
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
})

export default router
