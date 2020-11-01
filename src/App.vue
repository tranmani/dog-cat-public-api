<template>
  <v-app>
    <v-app-bar dense app color="primary" dark :class="mobile == 'xs' ? 'd-flex center' : ''">
      <h2 v-if="isDog"><v-icon @click="changeIsDog">mdi-dog</v-icon> <span class="mr-2">Doggg</span></h2>
      <h2 v-if="!isDog"><v-icon @click="changeIsDog">mdi-cat</v-icon> <span class="mr-2">Cattt</span></h2>

      <v-spacer></v-spacer>

      <v-btn v-if="mobile != 'xs'" to="/" text>
        <v-icon>mdi-home</v-icon>
        <span class="mr-2">Home</span>
      </v-btn>
      <v-btn v-if="mobile != 'xs'" @click="changeIsDog" text>
        <v-icon>mdi-paw</v-icon>
        <span>Category</span>
      </v-btn>
      <v-btn v-if="mobile != 'xs'" to="/random" text>
        <v-icon>mdi-shuffle</v-icon>
        <span class="mr-2">Randomnizer</span>
      </v-btn>
    </v-app-bar>

    <transition name="fade">
      <router-view :style="mobile == 'xs' ? 'margin: 48px 0 202px 0' : 'margin: 48px 0 130px 0'" />
    </transition>

    <v-footer absolute padless :class="mobile == 'xs' ? 'footer-mobile' : ''">
      <div class="footer">
        <div>
          <v-row class="d-flex center">
            <v-col cols="2"><router-link to="/">Home</router-link></v-col>
            <v-col cols="2">
              <router-link to="/random" v-if="mobile != 'xs'">Randomnizer</router-link>
              <router-link to="/random" v-if="mobile == 'xs'">Random</router-link>
            </v-col>
          </v-row>
          <v-row class="d-flex center">
            <v-col cols="2"><a @click="changeToDog">Dog</a></v-col>
            <v-col cols="2"><a @click="changeToCat">Cat</a></v-col>
          </v-row>
        </div>

        <v-divider></v-divider>

        <v-card-text class="white--text">
          ❤️ <strong><a href="https://tranmani.com/?ref=doggg" target="_blank">tranmani</a></strong>
        </v-card-text>
      </div>

      <v-tabs v-if="mobile == 'xs'" background-color="primary" class="tab" centered icons-and-text>
        <v-tabs-slider></v-tabs-slider>

        <v-tab to="/">
          Home
          <v-icon>mdi-home</v-icon>
        </v-tab>

        <v-tab @click="changeIsDog" to="huy">
          <v-icon>mdi-paw</v-icon>
        </v-tab>

        <v-tab to="/random">
          Random
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
    ...mapMutations(["updateIsDog", "updateToDog", "updateToCat"]),
    changeIsDog() {
      this.updateIsDog();
      if (this.$route.name != "home") this.$router.push("/");
    },
    changeToDog() {
      if (!this.isDog) {
        if (this.$route.name != "home") this.$router.push("/");
      }
      this.updateToDog();
    },
    changeToCat() {
      if (this.isDog) {
        if (this.$route.name != "home") this.$router.push("/");
      }
      this.updateToCat();
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

.footer {
  background-color: #8c9eff;
  width: 100%;
  text-align: center;
}

a {
  text-decoration: none;
}
</style>
