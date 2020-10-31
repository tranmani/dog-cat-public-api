<template>
  <div class="detail-container">
    <DogDetail :loaded="true" />

    <h2>Related</h2>

    <v-row class="d-flex justify-center" v-if="loaded">
      <DogCard class="h-ma-5" v-for="dog in displayDogs" :key="dog.id" v-bind="dog" v-on:clickedDog="getRelevantBreed" />
    </v-row>

    <v-row class="d-flex justify-center" v-if="!loaded">
      <DogCardSkeleton class="h-ma-5" v-for="dog in 3" :key="dog.id" />
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import DogDetail from "@/components/DogDetail.vue";
import DogCardSkeleton from "@/components/DogCardSkeleton.vue";
import DogCard from "@/components/DogCard.vue";
import DogRes from "../remote/Dog";
import "@/assets/style.scss";
import { Dog } from "@/store/types";

@Component({
  components: {
    DogDetail,
    DogCard,
    DogCardSkeleton,
  },
})
export default class Home extends Vue {
  private relevantDogs!: Dog[];
  private loaded = false;
  private id = 0;
  private displayDogs: Array<Dog> = [];

  mounted() {
    if (this.$store.getters.currentDog.id == 0) this.$router.push("/");
    this.getRelevantBreed();
  }

  /**
   * getRelevantBreed Get relevant breed by first word of their name,
   * if not found then fill in random breed
   */
  public getRelevantBreed() {
    this.displayDogs = [];
    this.id = 0;
    this.loaded = false;
    let relevantBreed = 0;

    DogRes.getDogBreedByName(this.$store.getters.currentDog.name).then((res) => {
      for (let i = 0; i < res.data.length; i++) {
        // Ignore breed id if it is already displaying
        if (res.data[i].id == this.$store.getters.currentDog.id) continue;
        // Stop if displayDogs array length is already = 3
        if (this.displayDogs.length == 3) break;

        // Search for breed id in dogs vuex store and copy it to displayDogs array
        const index = this.$store.getters.dogs.findIndex((obj: { id: any }) => obj.id == res.data[i].id);
        // Filter out breed which is not in breed database
        if (index == -1) continue;

        relevantBreed++;
        // Copy relevant breed to displayDogs array
        this.displayDogs.push(this.$store.getters.dogs[index]);
      }

      // Copy random breed to displayDogs array
      for (let i = 0; i < 3 - relevantBreed; i++) {
        const random = Math.floor(Math.random() * this.$store.getters.dogs.length) + 1;
        this.displayDogs.push(this.$store.getters.dogs[random]);
      }

      // Get picture from API for each breed
      this.displayDogs.forEach((element: { id: number }) => {
        this.getBreedPic(element.id);
      });
    });
  }

  /**
   * getBreedPic get breed pic from id
   */
  public getBreedPic(id: number) {
    DogRes.getDogPicture(id).then((res) => {
      const dogPic = res.data[0].url;
      const dog = res.data[0].breeds[0];

      // Put each breed picture to displayDogs array
      const index = this.displayDogs.findIndex((obj) => obj.id == dog.id);
      this.displayDogs[index].dogPic = dogPic;

      this.id++;
      if (this.id == this.displayDogs.length) {
        this.loaded = true;
      }
    });
  }
}
</script>

<style lang="scss" scoped>
.detail-container {
  text-align: center;
  padding: 10px 0 30px 0;
}

@media only screen and (max-width: 600px) {
  .detail-container {
    padding: 0 0 15px 0;
  }
}
</style>
