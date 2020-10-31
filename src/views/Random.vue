<template>
  <div class="random-container">
    <DogDetail :loaded="loaded" />

    <v-btn text :ripple="false" class="btn-surprise" @click="getRandomBreed">
      <v-icon x-large>mdi-cached</v-icon>
      Surprise me!
    </v-btn>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import DogDetail from "@/components/DogDetail.vue";
import DogRes from "../remote/Dog";

@Component({
  components: {
    DogDetail,
  },
})
export default class Home extends Vue {
  private loaded = true;

  mounted() {
    if (this.$store.getters.currentDog.id == 0) this.$router.push("/");
    this.getRandomBreed();
  }

  /**
   * getRandomBreed Get random breed
   */
  public getRandomBreed() {
    this.loaded = false;
    const random = this.$store.getters.dogs[Math.floor(Math.random() * this.$store.getters.dogs.length)];

    this.getBreedPic(random.id);
  }

  /**
   * getBreedPic get breed pic from id
   */
  public getBreedPic(id: number) {
    DogRes.getDogPicture(id).then((res) => {
      const dogPic = res.data[0].url;
      const dog = res.data[0].breeds[0];
      const index = this.$store.getters.dogs.findIndex((obj: { id: any }) => obj.id == id);

      // Put breed picture to displayDogs array
      this.$store.commit("addDogPic", {
        id: dog.id,
        dogPic: dogPic,
      });

      this.$store.commit("addCurrentDog", this.$store.getters.dogs[index]);
      this.loaded = true;
    });
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
    padding: 0 0 20px 0;
  }
}
</style>
