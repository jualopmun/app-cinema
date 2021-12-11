<template>
  <AppBars
    :items="items"
  >
  </AppBars>
</template>

<script>

import { AppBars } from "@/components"

import i18n from "../i18n.js"

export default {
	name: "MainView",
	components: {AppBars},
	data: () => ({
		items: [
			{ title: i18n.t("app.itemsBars.movies"), icon: "mdi-arrow-right", router:"/movies" },
			{ title: i18n.t("app.itemsBars.actors"), icon: "mdi-arrow-right", router:"/actors" },
			{ title: i18n.t("app.itemsBars.companies"), icon: "mdi-arrow-right", router:"/companies" },

		]
	}),
}

</script>
