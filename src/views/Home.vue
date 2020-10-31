<template>
  <div :class="bgGrad()" class="d-flex center">
    <div class="home">
      <v-row class="center">
        <v-col :cols="mobile == 'xs' ? 10 : 4">
          <v-overflow-btn
            @change="changeSorting"
            class="sort-btn"
            :items="isDog ? sortOptions : sortOptions.slice(0, 6)"
            label="Sorting"
          ></v-overflow-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="1">
          <div class="d-flex justify-center">
            <v-btn
              icon
              large
              :fab="mobile != 'xs'"
              color="indigo"
              outlined
              class="btn-page btn-page-left"
              @click="getBreedPics('previous')"
              :disabled="currentPage == 0"
              ><v-icon>mdi-chevron-left</v-icon></v-btn
            >
          </div>
        </v-col>

        <v-col cols="10">
          <v-row class="d-flex justify-center" v-if="loaded">
            <BreedCard class="h-ma-5" v-for="dog in displayBreeds" :key="dog.id" v-bind="dog" v-on:clickedDog="goToDetailPage" />
          </v-row>
          <v-row class="d-flex justify-center" v-if="!loaded">
            <BreedCardSkeleton class="h-ma-5" v-for="dog in 10" :key="dog.id" />
          </v-row>
        </v-col>

        <v-col cols="1">
          <div class="d-flex justify-center">
            <v-btn
              icon
              large
              :fab="mobile != 'xs'"
              color="indigo"
              outlined
              class="btn-page btn-page-right"
              @click="getBreedPics('next')"
              :disabled="currentPage == 160"
              ><v-icon>mdi-chevron-right</v-icon></v-btn
            >
          </div>
        </v-col></v-row
      >
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import BreedCard from "@/components/BreedCard.vue";
import BreedCardSkeleton from "@/components/BreedCardSkeleton.vue";
import DogRes from "../remote/Dog";
import CatRes from "../remote/Cat";
import "@/assets/style.scss";
import { Breed } from "@/store/types";
import { Getter, Mutation } from "vuex-class";

@Component({
  components: {
    BreedCard,
    BreedCardSkeleton,
  },
})
export default class Home extends Vue {
  @Getter("breeds") breeds!: Array<Breed>;
  @Getter("currentPage") currentPage!: number;
  @Getter("mobile") mobile!: string;
  @Getter("isDog") isDog!: boolean;

  @Mutation("updateMobile") updateMobile!: any;
  @Mutation("updateSort") updateSort!: any;
  @Mutation("resetPage") resetPage!: any;
  @Mutation("nextPage") nextPage!: any;
  @Mutation("previousPage") previousPage!: any;
  @Mutation("addBreed") addBreed!: any;
  @Mutation("addBreedPic") addBreedPic!: any;
  @Mutation("emptyBreeds") emptyBreeds!: any;

  private loaded = false;
  private id = 0;
  private error = 0;
  private displayBreeds: Array<Breed> = [];
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

  @Watch("isDog")
  isDogChanged() {
    this.emptyBreeds();
    this.getBreeds();
  }

  mounted() {
    if (this.breeds.length == 0) {
      this.getBreeds();
    } else {
      if (!this.breeds[0].wiki && !this.isDog) this.getBreeds();
      else if (this.breeds[0].wiki && this.isDog) this.getBreeds();
      else this.getBreedPics();
    }
    this.onResize();
    window.addEventListener("resize", this.onResize);
  }

  /**
   * getBreeds Get all breed information
   */
  public async getBreeds() {
    this.emptyBreeds();
    this.loaded = false;
    let breeds: any;
    if (this.isDog) {
      breeds = await DogRes.getDogBreeds();
      this.getDogBreeds(breeds);
    } else {
      breeds = await CatRes.getCatBreeds();
      this.getCatBreeds(breeds);
    }

    this.getBreedPics();
  }

  /**
   * getBreedPics Get breed pics
   */
  public getBreedPics(direction = "Huy"): void {
    this.scrollToTop();
    if (direction == "next") this.nextPage();
    else if (direction == "previous") this.previousPage();

    this.loaded = false;
    this.id = 0;

    // Get 10 breeds for each page
    for (let i = 0; i < 10; i++) {
      const breedId = this.currentPage + i;
      if (this.isDog) this.getDogPics(breedId);
      else this.getCatPics(breedId);
    }
  }

  /**
   * getDogBreeds Get all dog breed information from API
   */
  public getDogBreeds(breeds: any) {
    breeds.data.forEach((dog: any) => {
      // Toy breed does not have traits, it makes the website look baddd :(
      if (dog.name.toLowerCase().includes("toy")) return;
      // A few dog breed don't have temperament info
      let dogTraits: Array<string> = [];
      if (dog.temperament) dogTraits = dog.temperament.split(", ");

      this.addBreed({
        name: dog.name,
        bredFor: dog.bred_for,
        height: dog.height.metric + " cm",
        weight: dog.weight.metric + " kg",
        id: dog.id,
        lifeSpan: dog.life_span,
        traits: dogTraits,
        countryCode: dog.countryCode,
        bg: this.bgGrad(),
      });
    });
  }

  /**
   * getDogPics Get 10 dog Pics based on dog breed id from API
   */
  public getDogPics(index: number) {
    DogRes.getDogPicture(this.breeds[index].id).then((res) => {
      this.id++;

      const pic = res.data[0].url;
      const dog = res.data[0].breeds[0];

      // Put each dog information to vuex store
      this.addBreedPic({
        id: dog.id,
        pic: pic,
      });

      if (this.id == 10) {
        this.displayBreeds = [...this.breeds.slice(this.currentPage, this.currentPage + 10)];
        this.loaded = true;
      }
    });
  }

  /**
   * getCatBreeds Get all cat breed information from API
   */
  public getCatBreeds(breeds: any) {
    breeds.data.forEach((cat: any) => {
      // A few cat breed don't have temperament info
      let catTraits: Array<string> = [];
      if (cat.temperament) catTraits = cat.temperament.split(", ");

      this.addBreed({
        name: cat.name,
        weight: cat.weight.metric + " kg",
        id: cat.id,
        origin: cat.origin,
        description: cat.description,
        wiki: cat.wikipedia_url,
        lifeSpan: cat.life_span,
        traits: catTraits,
        bg: this.bgGrad(),
      });
    });
  }

  /**
   * getCatPics Get 10 cat Pics based on cat breed id from API
   */
  public getCatPics(index: any) {
    CatRes.getCatPicture(this.breeds[index].id).then((res) => {
      this.id++;

      const pic = res.data[0].url;
      const dog = res.data[0].breeds[0];

      // Put each dog information to vuex store
      this.addBreedPic({
        id: dog.id,
        pic: pic,
      });

      if (this.id == 10) {
        this.displayBreeds = [...this.breeds.slice(this.currentPage, this.currentPage + 10)];
        this.loaded = true;
      }
    });
  }

  /**
   * goToDetailPage Handle emitted event from BreedCard component
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

    this.updateSort(sortOption);
    this.resetPage();
    this.getBreedPics();
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
      this.updateMobile("xs");
    } else if (window.innerWidth <= 900) {
      this.updateMobile("md");
    } else if (window.innerWidth <= 1920) {
      this.updateMobile("lg");
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
