<template>
  <div class="card">
    <div class="img d-flex center" @click="seeDetail">
      <img :src="dogPic" class="img-content" />
      <div class="card-title">
        <div class="breed-title">{{ truncate(name, 20, "...") }}</div>
      </div>
    </div>
    <div class="d-flex row center h-pa-5">
      <Chip
        v-for="char in characteristics"
        :key="char"
        :name="char"
        class="h-ma-8"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import DogDetail from "@/components/DogDetail.vue";
import Chip from "@/components/Chip.vue";
import "@/assets/style.scss";

@Component({
  components: {
    DogDetail,
    Chip,
  },
})
export default class DogCard extends Vue {
  @Prop({ required: true, type: String }) name!: string;
  @Prop({ required: false, default: "" }) bredFor!: string;
  @Prop({ required: true }) height!: string;
  @Prop({ required: true }) weight!: string;
  @Prop({ required: true }) id!: number;
  @Prop({ required: true }) lifeSpan!: string;
  @Prop({ required: false }) characteristics!: Array<string>;
  @Prop({ required: false, default: "" }) countryCode!: string;
  @Prop({ required: true }) dogPic!: string;
  @Prop({ required: true }) bg!: string;

  // mounted() {
  // }

  /**
   * truncate Truncate dog's name if it is too long
   */
  public truncate(text: string, length: number, suffix: string): string {
    if (text.length > length) {
      return text.substring(0, length) + suffix;
    } else {
      return text;
    }
  }

  /**
   * seeDetail Go to detail page of the clicked dog
   */
  public seeDetail() {
    this.$store.commit("addCurrentDog", {
      name: this.name,
      bredFor: this.bredFor,
      height: this.height,
      weight: this.weight,
      id: this.id,
      lifeSpan: this.lifeSpan,
      characteristics: this.characteristics,
      countryCode: this.countryCode,
      dogPic: this.dogPic,
      bg: this.bg
    });
    this.$emit('clickedDog');
  }
}
</script>

<style lang="scss" scoped>
.card {
  width: 300px;
  border-radius: 18px;
  background-color: #f3f3f3;
  overflow: hidden;
  transition: 0.25s;
}

.card:hover {
  box-shadow: 0 8px 12px 0 rgba(0, 0, 0, 0.473),
    0 6px 20px 0 rgba(0, 0, 0, 0.582);
  transition: 0.25s;
}

.img {
  cursor: pointer;
  position: relative;
  height: 250px;
  width: 300px;
}

.img-content {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-title {
  position: absolute;
  background: rgba(0, 0, 0, 0.5);
  color: #f1f1f1;
  height: 15%;
  bottom: 0px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.breed-title {
  vertical-align: middle;
  font-size: 1.3em;
  font-weight: bold;
}

.row {
  margin: 0px;
  flex-wrap: wrap;
  flex: 1 1 auto;
}

@media only screen and (max-width: 900px) {
  .breed-title {
    font-size: 1em;
  }

  .card {
    width: 200px;
  }

  .img {
    height: 170px;
    width: 200px;
  }

}
</style>
