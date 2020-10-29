<template>
  <v-app>
    <v-app-bar dense app color="primary" dark>
      <h2 to="/"><v-icon>mdi-dog</v-icon> <span class="mr-2">Doggg</span></h2>

      <v-spacer></v-spacer>

      <v-btn to="/" text>
        <v-icon>mdi-home</v-icon>
        <span class="mr-2">Home</span>
      </v-btn>
      <v-btn to="/random" text>
        <v-icon>mdi-shuffle</v-icon>
        <span class="mr-2">Randomnizer</span>
      </v-btn>
    </v-app-bar>

    <router-view style="margin: 48px 0 123px 0" />

    <v-footer absolute padless>
      <v-card flat tile width="100%" class="red lighten-1 text-center">
        <v-card-text>
          <v-btn v-for="icon in icons" :key="icon" class="mx-4" icon>
            <v-icon size="24px">
              {{ icon }}
            </v-icon>
          </v-btn>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text class="white--text">
          {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>

  <!-- <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div> -->
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "App",

  components: {},

  data: () => ({
    icons: ["mdi-home", "mdi-email", "mdi-calendar", "mdi-delete"],
  }),
});
</script>
