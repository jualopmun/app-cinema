<template>
  <div class="my-4 mx-md-5 mx-lg-10 mx-xl-10 pa-2 pt-md-0 px-md-4 mt-10 maxw-1750">
    <v-form
        ref="form"
        v-model="valid"
        lazy-validation
    >
      <v-text-field
        v-model="form.title"
        :counter="20"
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
        v-model="form.anyo"
        :label="$t('views.createMovie.form.anyo')"
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


export default {
  name: "CreateMovie",
  data: () => ({
    valid: true,
    form: {
      title: null,
      poster: null,
      genre: [],
      actors: [],
      anyo: null,
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
        v => (v && v.length <= 20) || i18n.t('views.createMovie.rules.titleRules.characters'),
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

  methods: {
    async send () {
      try {
        const { data } = await Axios.post('/movies', this.form);
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
    const { data } = await this.getAuthors();

    data.forEach((actor) => {
      const { id, first_name, last_name} = actor;
      const fullName = `${first_name} ${last_name}`;
      this.items.actorsItems.push({ id, actor: fullName });
    })
  }
}
</script>