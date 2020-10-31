<template>
  <div :class="bgGrad()" class="d-flex center">
    <div class="home">
      <v-row class="center">
        <v-col :cols="$store.getters.mobile == 'xs' ? 8 : 4">
          <v-overflow-btn @change="changeSorting" class="sort-btn" :items="sortOptions" label="Sorting"></v-overflow-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="1">
          <div class="d-flex justify-center">
            <v-btn
              icon
              large
              :fab="$store.getters.mobile != 'xs'"
              color="indigo"
              outlined
              class="btn-page btn-page-left"
              @click="getDogPics('previous')"
              :disabled="$store.getters.currentPage == 0"
              ><v-icon>mdi-chevron-left</v-icon></v-btn
            >
          </div>
        </v-col>

        <v-col cols="10">
          <v-row class="d-flex justify-center" v-if="loaded">
            <DogCard class="h-ma-5" v-for="dog in displayDogs" :key="dog.id" v-bind="dog" v-on:clickedDog="goToDetailPage" />
          </v-row>
          <v-row class="d-flex justify-center" v-if="!loaded">
            <DogCardSkeleton class="h-ma-5" v-for="dog in 10" :key="dog.id" />
          </v-row>
        </v-col>

        <v-col cols="1">
          <div class="d-flex justify-center">
            <v-btn
              icon
              large
              :fab="$store.getters.mobile != 'xs'"
              color="indigo"
              outlined
              class="btn-page btn-page-right"
              @click="getDogPics('next')"
              :disabled="$store.getters.currentPage == 160"
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
import DogRes from "../remote/Dog";
import "@/assets/style.scss";
import { Dog } from "@/store/types";

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
  private displayDogs: Array<Dog> = [];
  private sortOptions: Array<string> = [
    "Default",
    "Name Descending",
    "Life Span Ascending",
    "Life Span Descending",
    "Weight Ascending",
    "Weight Descending",
    "Height Ascending",
    "Height Descending",
  ];

  mounted() {
    if (this.$store.getters.dogs.length == 0) this.getDogBreeds();
    else this.getDogPics();
    this.onResize();
    window.addEventListener("resize", this.onResize);
  }

  /**
   * getDogBreeds Get all dog breed information from API
   */
  public async getDogBreeds() {
    const dogBreeds = await DogRes.getDogBreeds();
    dogBreeds.data.forEach((element: any) => {
      // Toy breed does not have traits, it makes the website look baddd :(
      if (element.name.toLowerCase().includes("toy")) return;
      // A few dog breed don't have temperament info
      let dogTraits: Array<string> = [];
      if (element.temperament) dogTraits = element.temperament.split(", ");

      this.$store.commit("addDog", {
        name: element.name,
        bredFor: element.bred_for,
        height: element.height.metric + " cm",
        weight: element.weight.metric + " kg",
        id: element.id,
        lifeSpan: element.life_span,
        traits: dogTraits,
        countryCode: element.countryCode,
        bg: this.bgGrad(),
      });
    });

    this.getDogPics();
  }

  /**
   * getDogs Get 10 dog Pics based on dog breed id from API
   */
  public getDogPics(direction = "Huy"): void {
    this.scrollToTop();
    if (direction == "next") this.$store.commit("nextPage");
    else if (direction == "previous") this.$store.commit("previousPage");

    this.loaded = false;
    this.isGetDog = true;
    this.id = 0;

    // Get 10 dogs for each page
    for (let i = 0; i < 10; i++) {
      const index = this.$store.getters.currentPage + i;
      DogRes.getDogPicture(this.$store.getters.dogs[index].id).then((res) => {
        this.id++;

        const dogPic = res.data[0].url;
        const dog = res.data[0].breeds[0];

        // Put each dog information to vuex store
        this.$store.commit("addDogPic", {
          id: dog.id,
          dogPic: dogPic,
        });

        if (this.id == 10) {
          this.displayDogs = [...this.$store.getters.dogs.slice(this.$store.getters.currentPage, this.$store.getters.currentPage + 10)];
          this.loaded = true;
        }
      });
    }
  }

  /**
   * goToDetailPage Handle emitted event from DogCard component
   */
  public goToDetailPage() {
    this.$router.push("/detail");
  }

  /**
   * changeSorting Change sorting option in vuex
   */
  public changeSorting(e: string) {
    let sortOption = "";
    if (e === "Name Descending") sortOption = "nameDesc";
    else if (e === "Life Span Ascending") sortOption = "LifeSpanAsc";
    else if (e === "Life Span Descending") sortOption = "lifeSpanDesc";
    else if (e === "Weight Ascending") sortOption = "weightAsc";
    else if (e === "Weight Descending") sortOption = "weightDesc";
    else if (e === "Height Ascending") sortOption = "heightAsc";
    else if (e === "Height Descending") sortOption = "heightDesc";
    else sortOption = "default";

    this.$store.commit("updateSort", sortOption);
    this.$store.commit("resetPage");
    this.getDogPics();
  }

  /**
   * bgGrad Return random background css
   */
  public bgGrad(): string {
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
    } else if (window.innerWidth <= 900) {
      this.$store.commit("updateMobile", "md");
    } else if (window.innerWidth <= 1920) {
      this.$store.commit("updateMobile", "lg");
    }
  }

  /**
   * scrollToTop Scroll to Top
   */
  public scrollToTop() {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }
}
</script>

<style lang="scss" scoped>
.btn-page {
  top: 50vh;
  position: fixed;
}

.btn-page-left {
  left: 5%;
}

.btn-page-right {
  right: 5%;
}

.home {
  width: 90%;
}

.sort-btn {
  margin: 10px 0 -33px 0;
  cursor: pointer;
}

@media only screen and (max-width: 600px) {
}
</style>
