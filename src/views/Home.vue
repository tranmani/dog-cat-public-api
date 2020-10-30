<template>
  <div :class="bgGrad" class="d-flex center">
    <div class="home">
      <v-row>
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
        </v-col></v-row
      >
    </div>
  </div>
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
    this.onResize();
    window.addEventListener("resize", this.onResize);
  }

  /**
   * getDogBreeds Get all dog breed information from API
   */
  public async getDogBreeds() {
    const dogBreeds = await Dog.getDogBreeds();
    dogBreeds.data.forEach((element: any) => {
      // A few dog breed don't have temperament info
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
  public getDogPics(next: boolean): void {
    if (next) this.$store.commit("nextPage");
    else this.$store.commit("previousPage");

    this.loaded = false;
    this.isGetDog = true;
    this.id = 0;

    // Get 10 dogs for each page
    for (let i = 0; i < 10; i++) {
      const index = this.$store.getters.currentPage + i;
      Dog.getDog(this.$store.getters.dogs[index].id).then((res) => {
        this.id++;

        const dogPic = res.data[0].url;
        const dog = res.data[0].breeds[0];

        // Put each dog information to vuex store
        this.$store.commit("addDogPic", {
          id: dog.id,
          dogPic: dogPic,
        });

        if (this.id == 10) {
          this.$store.commit("copyDisplayDogs");
          this.loaded = true;
        }
      });
    }
  }

  /**
   * bgGrad Return random background css
   */
  public get bgGrad(): string {
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

  /**
   * onResize Resize method, get called when window width change
   */
  public onResize() {
    if (window.innerWidth <= 650) {
      this.$store.commit("updateMobile", "xs");
    } else if (window.innerWidth <= 1000) {
      this.$store.commit("updateMobile", "md");
    }
  }
}
</script>

<style lang="scss" scoped>
.btn-page {
  top: 50vh;
  position: fixed;
}

.home {
  width: 90%;
}

@media only screen and (max-width: 600px) {
  .navi-btn {
    bottom: 48px;
  }
}
</style>
