<template>
  <v-app>
    <v-app-bar dense app color="primary" dark :class="mobile == 'xs' ? 'd-flex center' : ''">
      <h2 v-if="isDog"><v-icon>mdi-dog</v-icon> <span class="mr-2">Doggg</span></h2>
      <h2 v-if="!isDog"><v-icon>mdi-cat</v-icon> <span class="mr-2">Cattt</span></h2>

      <v-spacer></v-spacer>

      <v-btn v-if="mobile != 'xs'" to="/" text>
        <v-icon>mdi-home</v-icon>
        <span class="mr-2">Home</span>
      </v-btn>
      <v-btn v-if="mobile != 'xs'" @click="changeIsDog" text>
        <v-icon>mdi-heart</v-icon>
        <span>Category</span>
      </v-btn>
      <v-btn v-if="mobile != 'xs'" to="/random" text>
        <v-icon>mdi-shuffle</v-icon>
        <span class="mr-2">Randomnizer</span>
      </v-btn>
    </v-app-bar>

    <router-view :style="mobile == 'xs' ? 'margin: 48px 0 195px 0' : 'margin: 48px 0 123px 0'" />

    <v-footer absolute padless :class="mobile == 'xs' ? 'footer-mobile' : 'footer'">
      <v-card flat tile width="100%" class="lighten-1 text-center" color="accent">
        <v-card-text>
          <v-btn v-for="icon in icons" :key="icon" class="mx-4" icon>
            <v-icon size="24px">
              {{ icon }}
            </v-icon>
          </v-btn>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text class="white--text"> {{ new Date().getFullYear() }} — <strong>Vuetify</strong> </v-card-text>
      </v-card>

      <v-tabs v-if="mobile == 'xs'" background-color="primary" class="tab" centered icons-and-text>
        <v-tabs-slider></v-tabs-slider>

        <v-tab to="/">
          Home
          <v-icon>mdi-home</v-icon>
        </v-tab>

        <v-tab to="/random">
          Randomnizer
          <v-icon>mdi-shuffle</v-icon>
        </v-tab>
      </v-tabs>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters, mapMutations } from "vuex";

export default Vue.extend({
  name: "App",
  computed: {
    ...mapGetters(["mobile", "isDog"]),
  },
  data: () => ({
    icons: ["mdi-home", "mdi-email", "mdi-calendar", "mdi-delete"],
    tab: null,
    items: ["Dog", "Cat"],
  }),
  methods: {
    ...mapMutations(["updateIsDog"]),
    changeIsDog() {
      this.updateIsDog();
      this.$router.push("/");
    },
  },
});
</script>

<style lang="scss" scoped>
.tab {
  position: fixed;
  bottom: 0;
  z-index: 5;
}

.footer-mobile {
  padding-bottom: 72px;
}
</style>
