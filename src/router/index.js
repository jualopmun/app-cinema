import Vue from "vue"
import VueRouter from "vue-router"
import { MainView, ListMovies, ViewMovie } from "@/views"

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
      {
        path: '/movies/:id',
        component: ViewMovie,
        props: ({ params }) => ({
          id: Number(params.id)
        }),
    
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
