<template>
  <div class="detail-container">
    <BreedDetail :loaded="true" />

    <h2>Related</h2>

    <transition name="fade">
      <v-row class="d-flex justify-center" v-if="loaded">
        <BreedCard class="h-ma-5" v-for="breed in displayBreeds" :key="breed.id" v-bind="breed" v-on:clickedDog="getRelevantBreed" />
      </v-row>
    </transition>

    <v-row class="d-flex justify-center" v-if="!loaded">
      <BreedCardSkeleton class="h-ma-5" v-for="breed in 3" :key="breed.id" />
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BreedDetail from "@/components/BreedDetail.vue";
import BreedCardSkeleton from "@/components/BreedCardSkeleton.vue";
import BreedCard from "@/components/BreedCard.vue";
import DogRes from "../remote/Dog";
import CatRes from "../remote/Cat";
import "@/assets/style.scss";
import { Breed } from "@/store/types";
import { Getter } from "vuex-class";

@Component({
  components: {
    BreedDetail,
    BreedCard,
    BreedCardSkeleton,
  },
})
export default class Home extends Vue {
  @Getter("breeds") breeds!: Array<Breed>;
  @Getter("currentBreed") currentBreed!: Breed;
  @Getter("isDog") isDog!: boolean;

  private relevantDogs!: Breed[];
  private loaded = false;
  private id = 0;
  private displayBreeds: Array<Breed> = [];

  mounted() {
    if (this.currentBreed.id == 0) this.$router.push("/");
    this.getRelevantBreed();
  }

  /**
   * getRelevantBreed Get relevant breed by first word of their name,
   * if not found then fill in random breed
   */
  public async getRelevantBreed() {
    this.displayBreeds = [];
    this.id = 0;
    this.loaded = false;
    let relevantBreed = 0;
    let relevantBreeds: any;

    if (this.isDog) relevantBreeds = await DogRes.getDogBreedByName(this.currentBreed.name);
    else relevantBreeds = await CatRes.getCatBreedByName(this.currentBreed.name);

    // First result is always the current displaing breed
    if (relevantBreeds.data.length != 1) {
      // If API return more than 1 result
      for (let i = 0; i < relevantBreeds.data.length; i++) {
        // Ignore breed id if it is already displaying
        if (relevantBreeds.data[i].id == this.currentBreed.id) continue;

        // Stop if displayBreeds array length is already = 3
        if (this.displayBreeds.length == 3) break;

        // Search for breed id in breeds vuex store and copy it to displayBreeds array
        const index = this.breeds.findIndex((obj: { id: any }) => obj.id == relevantBreeds.data[i].id);
        // Filter out breed which is not in breed database
        if (index == -1) continue;

        relevantBreed++;
        // Copy relevant breed to displayBreeds array
        this.displayBreeds.push(this.breeds[index]);
      }
    }

    // Copy random breed to displayBreeds array
    for (let i = 0; i < 3 - relevantBreed; i++) {
      let random = this.breeds[Math.floor(Math.random() * this.breeds.length)];

      // If random breed is duplicated then roll a new one
      for (let j = 0; j < this.displayBreeds.length; j++) {
        if (random.id == this.displayBreeds[j].id) {
          random = this.breeds[Math.floor(Math.random() * this.breeds.length)];
        }
      }
      // Add randomly rolled breed to displayBreeds array
      this.displayBreeds.push(random);
    }

    // Get picture from API for each breed
    this.displayBreeds.forEach((element: { id: number }) => {
      this.getBreedPic(element.id);
    });
  }

  /**
   * getBreedPic get breed pic from id
   */
  public getBreedPic(id: number) {
    if (this.isDog) {
      DogRes.getDogPicture(id).then((res) => {
        const breedPic = res.data[0].url;
        const breed = res.data[0].breeds[0];

        // Put each breed picture to displayBreeds array
        const index = this.displayBreeds.findIndex((obj) => obj.id == breed.id);
        this.displayBreeds[index].pic = breedPic;

        this.id++;
        if (this.id == this.displayBreeds.length) {
          this.loaded = true;
        }
      });
    } else {
      CatRes.getCatPicture(id).then((res) => {
        const breedPic = res.data[0].url;
        const breed = res.data[0].breeds[0];

        // Put each breed picture to displayBreeds array
        const index = this.displayBreeds.findIndex((obj) => obj.id == breed.id);
        this.displayBreeds[index].pic = breedPic;

        this.id++;
        if (this.id == this.displayBreeds.length) {
          this.loaded = true;
        }
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.detail-container {
  text-align: center;
  padding: 10px 0 30px 0;
}

h2 {
  padding-bottom: 10px;
}

@media only screen and (max-width: 600px) {
  .detail-container {
    padding: 0 0 15px 0;
  }
}
</style>
