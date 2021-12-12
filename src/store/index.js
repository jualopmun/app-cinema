import Vue from "vue"
import Vuex from "vuex"
import { movie } from './movie'

Vue.use(Vuex)

export const store = new Vuex.Store(movie)
