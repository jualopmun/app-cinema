<template>
  <div class="my-4 mx-md-5 mx-lg-10 mx-xl-10 pa-2 pt-md-0 px-md-4 mt-10 maxw-1750">
    <v-form
        ref="form"
        v-model="valid"
        lazy-validation
    >
      <v-text-field
        v-model="form.title"
        :counter="50"
        :rules="rules.titleRules"
        :label="$t('views.createMovie.form.title')"
        required
      ></v-text-field>

      <v-text-field
        v-model="form.poster"
        :rules="rules.posterRules"
        :label="$t('views.createMovie.form.poster')"
      ></v-text-field>

      <v-select
        v-model="form.genre"
        :items="items.genreItems"
        :label="$t('views.createMovie.form.genre')"
        chips
        multiple
      ></v-select>

      <v-select
        v-model="form.actors"
        :items="items.actorsItems"
        item-text="actor"
        item-value="id"
        :label="$t('views.createMovie.form.actors')"
        chips
        multiple
      ></v-select>

      <v-text-field
        v-model="form.year"
        :label="$t('views.createMovie.form.year')"
        type="number"
      ></v-text-field>

      <v-text-field
        v-model="form.duration"
        :label="$t('views.createMovie.form.duration')"
        type="number"
      ></v-text-field>

      <v-text-field
        v-model="form.imdbRating"
        :rules="rules.imdbRatingRules"
        :label="$t('views.createMovie.form.imdbRating')"
        type="number"
      ></v-text-field>

      <v-btn
        name="submit"
        :disabled="!valid"
        color="success"
        class="mr-4 my-2"
        :loading="loading"
        @click="send"
      >
      {{ $t('common.send') }}
      </v-btn>
    </v-form>
  </div>
</template>
<script>
import Axios from "axios"
import i18n from "../i18n.js"
import { mapGetters } from 'vuex';



export default {
  name: "CreateMovie",
  props: {
    id: Number,
  },
  data: () => ({
    valid: true,
    loading: false,
    form: {
      title: null,
      poster: null,
      genre: [],
      actors: [],
      year: null,
      duration: null,
      imdbRating: null,
    },
    items: {
      genreItems: ["Comedy", "Musical", "Romance","Action", "Animation", "Sci-Fi", "War"],
      actorsItems: [],
    },
    rules: {
      titleRules: [
        v => !!v || i18n.t('views.createMovie.rules.titleRules.required'),
        v => (v && v.length <= 50) || i18n.t('views.createMovie.rules.titleRules.characters'),
      ],
      posterRules: [
      // eslint-disable-next-line no-useless-escape
        v => /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm.test(v) || i18n.t('views.createMovie.rules.posterRules'),
      ],
      imdbRatingRules: [
        v => (v >= 1 && v <= 10) || i18n.t('views.createMovie.rules.imdbRatingRules'),
      ],  
    }
    
  }),

  computed: {
    ...mapGetters({
      movies: 'list',
    }),
    movie(){
      return this.movies.find((movie) => movie.id === this.id);
    }
  },

  methods: {
    async send () {
      try {
        this.loading = true;
        let response = null;
        if (this.form.id) {
          response = await Axios.patch(`/movies/${this.form.id}`, this.form);
        } else {
          response = await Axios.post('/movies', this.form);
        }

        const { data } = response;
        this.$router.push({ path: `/movies/${data.id}` })
      } catch(ex) {
        console.log(`Error in post movie: ${ex}`);
      }
      
      
    },
    async getAuthors() {
      try {
        return await Axios.get('/actors');
      } catch(ex) {
        console.log(`Error in get autors: ${ex}`);
      }
    },
  },

  async created() {
    if( Number.isInteger(this.id) ) {
      await this.$store.dispatch('getMovie', this.id);
      this.form = this.movie;
    }
    const { data } = await this.getAuthors();

    data.forEach((actor) => {
      const { id, first_name, last_name} = actor;
      const fullName = `${first_name} ${last_name}`;
      this.items.actorsItems.push({ id, actor: fullName });
    })
  }
}
</script>