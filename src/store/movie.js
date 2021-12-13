
import Axios from "axios"



export const STATUS = {
  LOADING: "movies.status.loading",
  SUCCESS: "movies.status.success",
  ERROR: "movies.status.error",
}

const getDefaultState = () => {
  return {
    movies: [],
    status: "",
    error: null,
    total: null,
  }
}

const initialState = getDefaultState();

const mutations = {
  loading(state) {
    state.status = STATUS.LOADING
  },
  success(state, list ) {
    state.status = STATUS.SUCCESS
    state.movies = list
  },
  error(state, error) {
    state.status = STATUS.ERROR
    state.error = error
  },
}

const actions = {
  async getMovies({ commit }) {
    commit('loading');
    try {
      const { data }  = await Axios.get('/movies');
      commit('success', data );
    } catch (ex) {
      console.error('exception occurred retrieving movies', ex);
      commit('error', ex);
    }
  },
  async getMovie({ commit }, id) {
    commit('loading');
    try {
      const { data }  = await Axios.get(`/movies/${id}`);
      commit('success', [data] );
    } catch (ex) {
      console.error('exception occurred retrieving movies', ex);
      commit('error', ex);
    }
  },
}

const getters = {
  list: (state) => state.movies || [],
};
  

export const movie = {
  namespaced: true,
  state: initialState,
  mutations,
  actions,
  getters,
};
  
  
    
  
  
  