<template>
  <div class="d-flex center">
    <div class="card" :class="$store.getters.currentDog.bg">
      <v-row>
        <v-col :cols="$store.getters.mobile == 'xs' ? 12 : 6" class="img-wraper">
          <div class="img-container center">
            <img v-if="loaded" :src="$store.getters.currentDog.dogPic" class="img-content" />
            <v-progress-circular v-if="!loaded" :size="70" :width="7" color="purple" indeterminate></v-progress-circular>
          </div>
        </v-col>

        <v-col :cols="$store.getters.mobile == 'xs' ? 12 : 6" class="breed-detail">
          <h2 class="d-flex center">{{ $store.getters.currentDog.name }}</h2>
          <span v-if="$store.getters.currentDog.countryCode">{{ $store.getters.currentDog.countryCode }}</span>
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
            <v-col cols="6" v-if="$store.getters.currentDog.bredFor">
              <v-row class="center"><h4>Bred for</h4></v-row>
              <v-row class="center"
                ><p>{{ $store.getters.currentDog.bredFor }}</p></v-row
              >
            </v-col>

            <v-col :cols="$store.getters.currentDog.bredFor ? 6 : 12">
              <v-row class="center"><h4>Life span</h4></v-row>
              <v-row class="center"
                ><p>{{ $store.getters.currentDog.lifeSpan }}</p></v-row
              >
            </v-col>
          </v-row>
          <v-col v-if="$store.getters.currentDog.traits.length != 0">
            <v-row class="center">
              <h4>Traits</h4>
            </v-row>

            <v-row class="center">
              <Chip
                v-for="trait in $store.getters.currentDog.traits"
                :key="trait"
                :name="trait"
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
  @Prop({ required: false, type: Boolean }) loaded!: boolean;

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

.breed-detail {
  padding: 30px;
}

.card {
  overflow: hidden;
  margin: 30px 0;
  width: 70%;
  border-radius: 18px;
}

h4 {
  font-weight: bold;
  text-transform: uppercase;
}

h2 {
  padding: 0 0 20px 0;
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
