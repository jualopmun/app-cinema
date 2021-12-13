<template>
 <div class="my-4 mx-md-5 mx-lg-10 mx-xl-10 pa-2 pt-md-0 px-md-4 mt-10 maxw-1750">
    <CardComponent
      v-for="(movie, index) in movies"
      :key="`movie-${index}`"
      :title="movie.title"
      :image="movie.poster"
      :url="`movies/${movie.id}`"
    >
      <template v-slot:cardText>
        <v-row
          align="center"
          class="mx-0"
        >
          <v-chip
            v-for="(genre, index) in movie.genre"
            :key="`genre-${index}`"
            class="ma-2"
          >
            <v-icon left>
              mdi-label
            </v-icon>
            {{ genre }}
          </v-chip>
        </v-row>
      </template>
    </CardComponent>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

import { CardComponent } from "@/components"
import { STATUS as MOVIES } from '@/store/movie';


export default {
  name: "ListMovies",
  components: { CardComponent },
  computed: {
    ...mapGetters({
      movies: 'list',
    }),
    ...mapState({
      success: status => status.status === MOVIES.SUCCESS,
    }),
  },
  created() {
    this.$store.dispatch('getMovies');
  }
}
</script>