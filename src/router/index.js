import Vue from "vue"
import VueRouter from "vue-router"
import { MainView } from "@/views"

Vue.use(VueRouter)

const routes = [
	{
		path: "/",
		name: "MainView",
		component: MainView,
		/*children: [
			{
				
			}
		]*/
	},
	
]

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes
})

export default router
