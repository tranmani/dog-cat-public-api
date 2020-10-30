<template>
  <div class="d-flex center">
    <div class="card" :class="bgGrad">
      <v-row>
        <v-col
          :cols="$store.getters.mobile == 'xs' ? 12 : 6"
          class="img-wraper"
        >
          <div class="img-container center">
            <img :src="$store.getters.currentDog.dogPic" class="img-content" />
          </div>
        </v-col>

        <v-col :cols="$store.getters.mobile == 'xs' ? 12 : 6">
          <h2 class="d-flex center">{{ $store.getters.currentDog.name }}</h2>
          <span v-if="$store.getters.currentDog.countryCode">{{
            $store.getters.currentDog.countryCode
          }}</span>
          <v-row>
            <v-col cols="6">
              <v-row class="center"><h4>Weight</h4></v-row>
              <v-row class="center"
                ><p>{{ $store.getters.currentDog.weight }}</p></v-row
              >
            </v-col>

            <v-col cols="6">
              <v-row class="center"><h4>Height</h4></v-row>
              <v-row class="center"
                ><p>{{ $store.getters.currentDog.height }}</p></v-row
              >
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="6">
              <v-row class="center"><h4>Bred for</h4></v-row>
              <v-row class="center"
                ><p>{{ $store.getters.currentDog.bredFor }}</p></v-row
              >
            </v-col>

            <v-col cols="6">
              <v-row class="center"><h4>Life span</h4></v-row>
              <v-row class="center"
                ><p>{{ $store.getters.currentDog.lifeSpan }}</p></v-row
              >
            </v-col>
          </v-row>
          <v-col>
            <v-row class="center">
              <h4>Characteristics</h4>
            </v-row>

            <v-row class="center">
              <Chip
                v-for="char in $store.getters.currentDog.characteristics"
                :key="char"
                :name="char"
                :size="$store.getters.mobile == 'xs' ? 'chip-md' : 'chip-lg'"
                class="h-ma-8"
              /> </v-row
          ></v-col>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Chip from "@/components/Chip.vue";
import "@/assets/style.scss";

@Component({
  components: {
    Chip,
  },
})
export default class DogDetail extends Vue {
  // mounted() {
  // }

  /**
   * bgGrad Return random background css
   */
  get bgGrad(): string {
    const random = Math.floor(Math.random() * 8) + 1;
    switch (random) {
      case 1:
        return "bg-grad-1";
      case 2:
        return "bg-grad-2";
      case 3:
        return "bg-grad-3";
      case 4:
        return "bg-grad-4";
      case 5:
        return "bg-grad-5";
      case 6:
        return "bg-grad-6";
      case 7:
        return "bg-grad-7";
      case 8:
        return "bg-grad-8";
    }
    return "bg-grad-1";
  }
}
</script>

<style lang="scss" scoped>
.img-container {
  position: relative;
  height: 100%;
  width: 100%;
}

.img-content {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.img-wraper {
  padding: 0;
}

.card {
  overflow: hidden;
  margin: 30px 0;
  width: 70%;
  border-radius: 18px;
}

h4 {
  font-weight: bold;
  text-transform: capitalize;
}

p {
  font-size: 1.1em;
}

@media only screen and (max-width: 1000px) {
  .card {
    width: 85%;
  }
}

@media only screen and (max-width: 600px) {
  .card {
    width: 90%;
  }
}
</style>
