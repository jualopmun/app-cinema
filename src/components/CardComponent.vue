<template>
  <v-card
    :loading="loading"
    max-width="1000"
    class="ma-2"
  >
    <v-card-title
      v-if="title"
    >
      {{ title }}
    </v-card-title>
    <v-img
      v-if="image"
      height="250"
      :src="image"
    >
    </v-img>
      <v-card-text 
        v-if="$slots.cardText != null"
      >
        <slot name="cardText"></slot>
      </v-card-text>
  </v-card>
</template>
<script>
export default {
  props: {
    loading: Boolean,
    title: String,
    image: String,
  },
};
</script>
