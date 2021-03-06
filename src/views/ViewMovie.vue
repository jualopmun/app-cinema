<template>
 <div class="my-4 mx-md-5 mx-lg-10 mx-xl-10 pa-2 pt-md-0 px-md-4 mt-10 maxw-1750">
    <v-skeleton-loader
      v-if="loading"
      class="mx-auto"
      max-width="1000"
      type="card"
    >
    </v-skeleton-loader>
    <v-card 
      v-else
      max-width="1000"
    >
      <CardComponent
        v-if="success"
        :image="movie.poster"
        :title="movie.title"
      >
        <template v-slot:cardText>
        <v-row
          align="center"
          class="mx-0"
          justify="space-between"
        >
        <v-col
          md="10"
        >
          {{$t("views.viewMovie.puntuation")}}:
          {{ movie.imdbRating }}
        </v-col>
        <v-col
          md="16"
        >
          {{$t("views.viewMovie.duration")}}:
          {{ movie.duration }}
        </v-col>
        </v-row>

        <div class="my-2 text-subtitle-1">
          {{$t("views.viewMovie.actors")}}:
        </div>
        <v-divider></v-divider>
        <div
          v-for="(actor, index) in authors"
          :key="`actor-${index}`"
        > 
          {{ actor.first_name }} {{ actor.last_name }}
        </div>
        <div class="my-2 text-subtitle-1">
          {{$t("views.viewMovie.genre")}}
        </div>
        <v-divider></v-divider>
        <div
          v-for="(genre, index) in movie.genre"
          :key="`genres-${index}`"
        > 
          {{ genre }}
        </div>
        </template>
      </CardComponent>
      <v-speed-dial
        bottom
        right
        direction="top"
        transition="slide-y-reverse-transition"
        class="align-end"
        :style="{
            position: 'fixed',
            bottom: '70px',
            zIndex: '20',
          }"
      >
        <template v-slot:activator>
          <v-btn  
            color="primary"
            dark 
            fab
            class="ma-2"
            @click="$router.push({ path: `/newMovie/${movie.id}` })"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
           <v-btn  
            color="error"
            dark 
            fab
            class="ma-2"
            @click="deleteMovie(movie.id)"
          >
            <v-icon>mdi-trash-can-outline</v-icon>
          </v-btn>
        </template>
      </v-speed-dial>
    </v-card>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import Axios from "axios"
import { CardComponent } from "@/components"
import { STATUS as MOVIES } from '@/store/movie';

export default {
  name: "ViewMovie",
  components: { CardComponent },
  props: {
    id: Number,
  },

  data: () => ({
    authors: [],
    loading: true,
  }),
  computed: {
    ...mapGetters({
      movies: 'list',
    }),
    ...mapState({
      success: status => status.status === MOVIES.SUCCESS,
    }),
    movie(){
      return this.movies.find((movie) => movie.id === this.id);
    }
  },

  methods: {
    async getAuthor(id) {
      try {
        return await Axios.get(`/actors/${id}`);
      } catch(ex) {
        console.log(`Error in get author: ${ex}`);
      }
      
    },
    async deleteMovie(id) {
      try {
        await Axios.delete(`/movies/${id}`);
        this.$router.push({ path: '/movies' })
      } catch(ex) {
        console.log(`Error deleted movie: ${ex}`);
      }
    },
  },

  async created() {
    if(this.movies.length === 0) {
      await this.$store.dispatch('getMovie', this.id);
    }
    this.movie?.actors.forEach(async (actor) => {
      const { data } = await this.getAuthor(actor);
      this.authors.push(data);
    })
    this.loading = false;
  }
}
</script>