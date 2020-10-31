<template>
  <div class="random-container">
    <BreedDetail :loaded="loaded" />

    <v-btn text :ripple="false" class="btn-surprise" @click="getRandomBreed">
      <v-icon x-large>mdi-cached</v-icon>
      Surprise me!
    </v-btn>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BreedDetail from "@/components/BreedDetail.vue";
import DogRes from "../remote/Dog";
import CatRes from "../remote/Cat";
import { Getter, Mutation } from "vuex-class";
import { Breed } from "@/store/types";

@Component({
  components: {
    BreedDetail,
  },
})
export default class Home extends Vue {
  @Getter("breeds") breeds!: Array<Breed>;
  @Getter("currentBreed") currentBreed!: Breed;
  @Getter("isDog") isDog!: boolean;

  @Mutation("addCurrentBreed") addCurrentBreed!: any;
  @Mutation("addBreedPic") addBreedPic!: any;

  private loaded = true;

  mounted() {
    if (this.currentBreed.id == 0) this.$router.push("/");
    this.getRandomBreed();
  }

  /**
   * getRandomBreed Get random breed
   */
  public getRandomBreed() {
    this.loaded = false;
    const random = this.breeds[Math.floor(Math.random() * this.breeds.length)];

    this.getBreedPic(random.id);
  }

  /**
   * getBreedPic get breed pic from id
   */
  public getBreedPic(id: number) {
    if (this.isDog) {
      DogRes.getDogPicture(id).then((res) => {
        const breedPic = res.data[0].url;
        const breed = res.data[0].breeds[0];
        const index = this.breeds.findIndex((obj: { id: any }) => obj.id == id);

        // Put breed picture to displayDogs array
        this.addBreedPic({
          id: breed.id,
          pic: breedPic,
        });

        this.addCurrentBreed(this.breeds[index]);
        this.loaded = true;
      });
    } else {
      CatRes.getCatPicture(id).then((res) => {
        const breedPic = res.data[0].url;
        const breed = res.data[0].breeds[0];
        const index = this.breeds.findIndex((obj: { id: any }) => obj.id == id);

        // Put breed picture to displayDogs array
        this.addBreedPic({
          id: breed.id,
          pic: breedPic,
        });

        this.addCurrentBreed(this.breeds[index]);
        this.loaded = true;
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.random-container {
  text-align: center;
  padding: 10px 0 30px 0;
}

.btn-surprise {
  color: gray;
  font-size: 2em;
  padding: 19px;
}

@media only screen and (max-width: 600px) {
  .random-container {
    padding: 0 0 30px 0;
  }
}
</style>
