<template>

  <v-app>
    <v-app-bar app color="primary" dark clipped-left>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title> {{$t("components.appBars.title")}}</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer app v-model="drawer" absolute clipped>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            {{$t("components.appBars.menu")}}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list nav>
        <v-list-item v-for="item in items" :key="item.title" link router-link :to="item.router">
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main> 
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "AppBars",

  props: {
    items: Array,
  },

  data: () => ({
    drawer: null,
  }),
}
</script>