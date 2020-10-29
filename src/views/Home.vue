<template>
  <v-row no-gutters :class="bgGrad" class="pt-8 pb-8">
    <v-col cols="1">
      <div class="d-flex justify-center">
        <v-btn
          icon
          large
          fab
          color="indigo"
          outlined
          class="btn-page"
          @click="getDogPics(false) && isNext == false"
          :disabled="$store.getters.currentPage == 0"
          ><v-icon>mdi-chevron-left</v-icon></v-btn
        >
      </div>
    </v-col>

    <v-col cols="10">
      <v-row class="d-flex justify-center" v-if="loaded">
        <DogCard
          class="ma-5"
          v-for="dog in $store.getters.displayDogs"
          :key="dog.id"
          v-bind="dog"
        />
      </v-row>
      <v-row class="d-flex justify-center" v-if="!loaded">
        <DogCardSkeleton class="ma-5" v-for="dog in 10" :key="dog.id" />
      </v-row>
    </v-col>
    <v-col cols="1">
      <div class="d-flex justify-center">
        <v-btn
          icon
          large
          fab
          color="indigo"
          outlined
          class="btn-page"
          @click="getDogPics(true) && isNext == true"
          :disabled="$store.getters.currentPage == 261"
          ><v-icon>mdi-chevron-right</v-icon></v-btn
        >
      </div>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import DogCard from "@/components/DogCard.vue";
import DogCardSkeleton from "@/components/DogCardSkeleton.vue";
import Dog from "../remote/Dog";
import "@/assets/style.scss";

@Component({
  components: {
    DogCard,
    DogCardSkeleton,
  },
})
export default class Home extends Vue {
  private loaded = false;
  private id = 0;
  private error = 0;
  private isNext = true;
  private isGetDog = true;

  mounted() {
    if (this.$store.getters.dogs.length == 0) this.getDogBreeds();
    else this.getDogPics(false);
  }

  /**
   * getDogBreeds Get all dog breed information from API
   */
  public async getDogBreeds() {
    const dogBreeds = await Dog.getDogBreeds();
    dogBreeds.data.forEach((element: any) => {
      // A few dog breed does not have temperament info
      let dogChars: Array<string> = [];
      if (element.temperament) dogChars = element.temperament.split(", ");

      this.$store.commit("addDog", {
        name: element.name,
        bredFor: element.bred_for,
        height: element.height.metric + " cm",
        weight: element.weight.metric + " kg",
        id: element.id,
        lifeSpan: element.life_span,
        characteristics: dogChars,
        countryCode: element.countryCode,
      });
    });

    this.getDogPics(false);
  }

  /**
   * getDogs Get 10 dog Pics based on dog breed id from API
   */
  public async getDogPics(next: boolean): Promise<void> {
    if (next) this.$store.commit("nextPage");
    else this.$store.commit("previousPage");

    this.loaded = false;
    this.isGetDog = true;
    this.id = 0;

    // Get 10 dogs for each page
    // if (this.isGetDog) {
    for (let i = 0; i < 10; i++) {
      const index = this.$store.getters.currentPage + i;
      const dogInfo = await Dog.getDog(this.$store.getters.dogs[index].id);

      this.id++;

      const dogPic = dogInfo.data[0].url;
      const dog = dogInfo.data[0].breeds[0];

      // Put each dog information to vuex store
      this.$store.commit("addDogPic", {
        id: dog.id,
        dogPic: dogPic,
      });

      if (this.id == 10) {
        this.$store.commit("copyDisplayDogs");
        this.loaded = true;
      }
    }
    // }
  }

  // /**
  //  * getDog Get 1 dog from API
  //  */
  // public async getDog(dogId: number) {
  //   const dogInfo = await Dog.getDog(dogId);
  //   this.id++;

  //   const dogPic = dogInfo.data[0].url;
  //   const dog = dogInfo.data[0].breeds[0];

  //   // Put each dog information to vuex store
  //   this.$store.commit("addDogPic", {
  //     id: dog.id,
  //     dogPic: dogPic,
  //   });

  //   if (this.id == 10) this.loaded = true;
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
.btn-page {
  top: 50vh;
}

@media only screen and (max-width: 600px) {
  .navi-btn {
    bottom: 48px;
  }
}
</style>
